Set-StrictMode -Version Latest

$script:AwsCommandPath = $null

function Get-CourseAwsCommand {
    [CmdletBinding()]
    param()

    if (-not [string]::IsNullOrWhiteSpace($script:AwsCommandPath)) {
        return $script:AwsCommandPath
    }

    $command = Get-Command -Name 'aws' -CommandType Application -ErrorAction SilentlyContinue |
        Select-Object -First 1

    if ($null -eq $command) {
        throw 'AWS CLI was not found. Install AWS CLI v2 and ensure aws.exe is on PATH.'
    }

    $script:AwsCommandPath = $command.Source
    return $script:AwsCommandPath
}

function Invoke-CourseAwsCli {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory = $true)]
        [ValidateNotNullOrEmpty()]
        [string[]]$Arguments,

        [switch]$SkipNoCliPager
    )

    $awsPath = Get-CourseAwsCommand
    $effectiveArguments = @($Arguments)
    if (-not $SkipNoCliPager) {
        $effectiveArguments += '--no-cli-pager'
    }

    $previousPreference = $ErrorActionPreference
    try {
        $ErrorActionPreference = 'Continue'
        $rawOutput = @(& $awsPath @effectiveArguments 2>&1)
        $exitCode = $LASTEXITCODE
    }
    finally {
        $ErrorActionPreference = $previousPreference
    }

    $textOutput = ($rawOutput | ForEach-Object { $_.ToString() }) -join
        [Environment]::NewLine

    if ($exitCode -ne 0) {
        if ([string]::IsNullOrWhiteSpace($textOutput)) {
            $textOutput = 'No diagnostic output was returned.'
        }

        $displayCommand = 'aws ' + ($Arguments -join ' ')
        throw "AWS CLI command failed with exit code $exitCode.`nCommand: $displayCommand`n$textOutput"
    }

    return $textOutput.Trim()
}

function Get-CourseAwsRegion {
    [CmdletBinding()]
    param(
        [string]$Region,
        [string]$Profile
    )

    $resolvedRegion = $Region
    if ([string]::IsNullOrWhiteSpace($resolvedRegion)) {
        $resolvedRegion = $env:AWS_REGION
    }
    if ([string]::IsNullOrWhiteSpace($resolvedRegion)) {
        $resolvedRegion = $env:AWS_DEFAULT_REGION
    }
    if ([string]::IsNullOrWhiteSpace($resolvedRegion)) {
        $arguments = @('configure', 'get', 'region')
        if (-not [string]::IsNullOrWhiteSpace($Profile)) {
            $arguments += @('--profile', $Profile)
        }
        try {
            $resolvedRegion = Invoke-CourseAwsCli -Arguments $arguments
        }
        catch {
            throw "AWS Region could not be resolved from AWS CLI configuration. Pass -Region or configure AWS_REGION, AWS_DEFAULT_REGION, or a profile Region. $($_.Exception.Message)"
        }
    }

    if ([string]::IsNullOrWhiteSpace($resolvedRegion)) {
        throw 'AWS Region could not be resolved. Pass -Region or configure AWS_REGION, AWS_DEFAULT_REGION, or an AWS CLI profile Region.'
    }

    $resolvedRegion = $resolvedRegion.Trim()
    if ($resolvedRegion -notmatch '^[a-z]{2}(-[a-z0-9]+)+-[0-9]+$') {
        throw "Resolved AWS Region '$resolvedRegion' is not a valid Region name."
    }

    return $resolvedRegion
}

function Get-CourseAwsContext {
    [CmdletBinding()]
    param(
        [string]$Region,
        [string]$Profile
    )

    $awsPath = Get-CourseAwsCommand
    $resolvedRegion = Get-CourseAwsRegion -Region $Region -Profile $Profile
    $arguments = @(
        'sts',
        'get-caller-identity',
        '--output',
        'json',
        '--region',
        $resolvedRegion
    )
    if (-not [string]::IsNullOrWhiteSpace($Profile)) {
        $arguments += @('--profile', $Profile)
    }

    try {
        $identityJson = Invoke-CourseAwsCli -Arguments $arguments
    }
    catch {
        throw "AWS identity could not be resolved with sts get-caller-identity. $($_.Exception.Message)"
    }
    try {
        $identity = $identityJson | ConvertFrom-Json -ErrorAction Stop
    }
    catch {
        throw "AWS identity response was not valid JSON. $($_.Exception.Message)"
    }

    $accountId = ''
    $principalArn = ''
    $userId = ''
    if ($null -ne $identity.PSObject.Properties['Account']) {
        $accountId = [string]$identity.Account
    }
    if ($null -ne $identity.PSObject.Properties['Arn']) {
        $principalArn = [string]$identity.Arn
    }
    if ($null -ne $identity.PSObject.Properties['UserId']) {
        $userId = [string]$identity.UserId
    }

    if ([string]::IsNullOrWhiteSpace($accountId) -or
        [string]::IsNullOrWhiteSpace($principalArn) -or
        [string]::IsNullOrWhiteSpace($userId)) {
        throw 'AWS identity could not be resolved from sts get-caller-identity.'
    }

    $profileLabel = $Profile
    if ([string]::IsNullOrWhiteSpace($profileLabel)) {
        $profileLabel = $env:AWS_PROFILE
    }
    if ([string]::IsNullOrWhiteSpace($profileLabel)) {
        $profileLabel = '(default credential chain)'
    }

    return [pscustomobject]@{
        AwsCliPath  = $awsPath
        Profile     = $profileLabel
        AccountId   = $accountId
        PrincipalArn = $principalArn
        UserId      = $userId
        Region      = $resolvedRegion
    }
}

function Get-CourseTaggedResource {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory = $true)]
        [ValidateNotNullOrEmpty()]
        [string]$Region,

        [string]$Profile,

        [Parameter(Mandatory = $true)]
        [ValidateNotNullOrEmpty()]
        [string]$CourseTag,

        [string]$ModuleTag
    )

    if ($CourseTag.Contains(',') -or
        (-not [string]::IsNullOrWhiteSpace($ModuleTag) -and $ModuleTag.Contains(','))) {
        throw 'CourseTag and ModuleTag cannot contain commas when used as AWS CLI tag filters.'
    }

    $tagFilters = @("Key=Course,Values=$CourseTag")
    if (-not [string]::IsNullOrWhiteSpace($ModuleTag)) {
        $tagFilters += "Key=Module,Values=$ModuleTag"
    }

    $arguments = @(
        'resourcegroupstaggingapi',
        'get-resources',
        '--region',
        $Region,
        '--tag-filters'
    )
    $arguments += $tagFilters
    $arguments += @('--output', 'json')
    if (-not [string]::IsNullOrWhiteSpace($Profile)) {
        $arguments += @('--profile', $Profile)
    }

    $json = Invoke-CourseAwsCli -Arguments $arguments
    try {
        $response = $json | ConvertFrom-Json -ErrorAction Stop
    }
    catch {
        throw "Resource inventory response was not valid JSON. $($_.Exception.Message)"
    }

    return @($response.ResourceTagMappingList)
}

Export-ModuleMember -Function @(
    'Get-CourseAwsCommand',
    'Invoke-CourseAwsCli',
    'Get-CourseAwsRegion',
    'Get-CourseAwsContext',
    'Get-CourseTaggedResource'
)
