[CmdletBinding()]
param(
    [string]$Region,
    [string]$Profile,

    [ValidateNotNullOrEmpty()]
    [string]$CourseTag = 'aws-solutions-architect',

    [string]$ModuleTag
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

$modulePath = Join-Path $PSScriptRoot 'CourseAwsContext.psm1'
Import-Module $modulePath -Force -ErrorAction Stop

$context = Get-CourseAwsContext -Region $Region -Profile $Profile

Write-Host 'Read-only AWS course cleanup verification'
Write-Host "Profile: $($context.Profile)"
Write-Host "Account: $($context.AccountId)"
Write-Host "Region:  $($context.Region)"
Write-Host "Course:  $CourseTag"
if (-not [string]::IsNullOrWhiteSpace($ModuleTag)) {
    Write-Host "Module:  $ModuleTag"
}
Write-Host 'No resources will be changed or deleted.'

$resources = Get-CourseTaggedResource `
    -Region $context.Region `
    -Profile $Profile `
    -CourseTag $CourseTag `
    -ModuleTag $ModuleTag

$stackArguments = @(
    'cloudformation',
    'describe-stacks',
    '--region',
    $context.Region,
    '--output',
    'json'
)
if (-not [string]::IsNullOrWhiteSpace($Profile)) {
    $stackArguments += @('--profile', $Profile)
}

$stackJson = Invoke-CourseAwsCli -Arguments $stackArguments
try {
    $stackResponse = $stackJson | ConvertFrom-Json -ErrorAction Stop
}
catch {
    throw "CloudFormation stack response was not valid JSON. $($_.Exception.Message)"
}

$matchingStacks = foreach ($stack in @($stackResponse.Stacks)) {
    $stackTags = @{}
    foreach ($tag in @($stack.Tags)) {
        $stackTags[[string]$tag.Key] = [string]$tag.Value
    }

    $courseMatches = $stackTags['Course'] -eq $CourseTag
    $moduleMatches = [string]::IsNullOrWhiteSpace($ModuleTag) -or
        $stackTags['Module'] -eq $ModuleTag

    if ($courseMatches -and $moduleMatches) {
        [pscustomobject]@{
            StackName   = [string]$stack.StackName
            StackStatus = [string]$stack.StackStatus
            Module      = $stackTags['Module']
        }
    }
}

$resources = @($resources)
$matchingStacks = @($matchingStacks)

if ($resources.Count -gt 0) {
    Write-Warning "The tagging API returned $($resources.Count) matching resource(s)."
    $resources |
        Select-Object ResourceARN |
        Sort-Object ResourceARN |
        Format-Table -AutoSize |
        Out-Host
}

if ($matchingStacks.Count -gt 0) {
    Write-Warning "CloudFormation returned $($matchingStacks.Count) matching active stack(s)."
    $matchingStacks |
        Sort-Object StackName |
        Format-Table -AutoSize |
        Out-Host
}

if ($resources.Count -gt 0 -or $matchingStacks.Count -gt 0) {
    throw 'Cleanup verification did not pass. Review the exact resources above; this script will not delete them.'
}

Write-Host 'Cleanup verification: PASS - no matching tagged resources or active stacks were returned.'
Write-Host 'Also check service consoles and billing or usage views because tag inventory is not exhaustive.'
