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
$resources = Get-CourseTaggedResource `
    -Region $context.Region `
    -Profile $Profile `
    -CourseTag $CourseTag `
    -ModuleTag $ModuleTag

Write-Host 'Read-only AWS course resource inventory'
Write-Host "Profile: $($context.Profile)"
Write-Host "Account: $($context.AccountId)"
Write-Host "Region:  $($context.Region)"
Write-Host "Course:  $CourseTag"
if (-not [string]::IsNullOrWhiteSpace($ModuleTag)) {
    Write-Host "Module:  $ModuleTag"
}
Write-Host 'Do not copy account IDs or full ARNs into course evidence.'

$items = foreach ($resource in $resources) {
    $arn = [string]$resource.ResourceARN
    $arnParts = $arn.Split(':', 6)
    $service = 'unknown'
    $resourceRegion = ''
    $resourceKind = 'resource'
    if ($arnParts.Count -eq 6) {
        $service = $arnParts[2]
        $resourceRegion = $arnParts[3]
        $resourceIdentifier = $arnParts[5]
        if ($resourceIdentifier.Contains('/')) {
            $resourceKind = $resourceIdentifier.Split('/')[0]
        }
        elseif ($resourceIdentifier.Contains(':')) {
            $resourceKind = $resourceIdentifier.Split(':')[0]
        }
    }

    $tags = @{}
    foreach ($tag in @($resource.Tags)) {
        $tags[[string]$tag.Key] = [string]$tag.Value
    }

    [pscustomobject]@{
        Service       = $service
        ResourceType  = $resourceKind
        ResourceRegion = $resourceRegion
        Module        = $tags['Module']
        Owner         = $tags['Owner']
        ExpiresAt     = $tags['ExpiresAt']
        CostLabel     = $tags['CostLabel']
        ResourceArn   = $arn
    }
}

$items = @($items | Sort-Object Service, ResourceType, ResourceArn)
if ($items.Count -eq 0) {
    Write-Host 'No matching tagged resources were returned.'
}
else {
    Write-Host "Matching tagged resources: $($items.Count)"
    $items
}

Write-Host 'Inventory is tag-scoped and may not include every billable resource.'
