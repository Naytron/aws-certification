[CmdletBinding()]
param(
    [string]$Region,
    [string]$Profile
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

$modulePath = Join-Path $PSScriptRoot 'CourseAwsContext.psm1'
Import-Module $modulePath -Force -ErrorAction Stop

$context = Get-CourseAwsContext -Region $Region -Profile $Profile
$cliVersion = Invoke-CourseAwsCli -Arguments @('--version') -SkipNoCliPager

Write-Host 'AWS course preflight: PASS'
Write-Host "AWS CLI:   $cliVersion"
Write-Host "Profile:   $($context.Profile)"
Write-Host "Account:   $($context.AccountId)"
Write-Host "Principal: $($context.PrincipalArn)"
Write-Host "Region:    $($context.Region)"
Write-Host 'Do not copy the account ID or principal ARN into course evidence.'

[pscustomobject]@{
    Status       = 'PASS'
    AwsCli       = $cliVersion
    Profile      = $context.Profile
    AccountId    = $context.AccountId
    PrincipalArn = $context.PrincipalArn
    Region       = $context.Region
}
