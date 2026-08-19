[CmdletBinding()]
param(
    [string]$RootPath,
    [switch]$Strict
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

if ([string]::IsNullOrWhiteSpace($RootPath)) {
    $RootPath = Split-Path -Parent $PSScriptRoot
}

if (-not (Test-Path -LiteralPath $RootPath -PathType Container)) {
    throw "Course root does not exist: $RootPath"
}

$resolvedRoot = (Resolve-Path -LiteralPath $RootPath -ErrorAction Stop).Path
$issues = [System.Collections.Generic.List[object]]::new()

function Add-CourseIssue {
    param(
        [Parameter(Mandatory = $true)]
        [ValidateSet('Error', 'Warning')]
        [string]$Severity,

        [Parameter(Mandatory = $true)]
        [string]$Check,

        [Parameter(Mandatory = $true)]
        [string]$Path,

        [Parameter(Mandatory = $true)]
        [string]$Message
    )

    $issues.Add([pscustomobject]@{
        Severity = $Severity
        Check    = $Check
        Path     = $Path
        Message  = $Message
    })
}

function Test-RequiredCourseFile {
    param(
        [Parameter(Mandatory = $true)]
        [string]$RelativePath
    )

    $fullPath = Join-Path $resolvedRoot $RelativePath
    if (-not (Test-Path -LiteralPath $fullPath -PathType Leaf)) {
        Add-CourseIssue -Severity Error -Check 'Required file' -Path $RelativePath `
            -Message 'File is missing.'
    }
}

$requiredFiles = @(
    'README.md',
    'course-map.md',
    'templates\architecture-scenario-template.md',
    'templates\error-log-template.md',
    'templates\lab-evidence-template.md',
    'templates\lab-template.md',
    'templates\module-template.md',
    'templates\progress-scorecard.md'
)
foreach ($requiredFile in $requiredFiles) {
    Test-RequiredCourseFile -RelativePath $requiredFile
}

$canonicalCourseTag = 'aws-solutions-architect'
$tagContracts = @(
    @{
        RelativePath = 'account\security-baseline.md'
        RequiredText = "| ``Course`` | ``$canonicalCourseTag``"
    },
    @{
        RelativePath = 'scripts\Get-CourseResourceInventory.ps1'
        RequiredText = "[string]`$CourseTag = '$canonicalCourseTag'"
    },
    @{
        RelativePath = 'scripts\Test-CourseCleanup.ps1'
        RequiredText = "[string]`$CourseTag = '$canonicalCourseTag'"
    },
    @{
        RelativePath = 'infrastructure\s3-secure-baseline.yaml'
        RequiredText = "Default: $canonicalCourseTag"
    },
    @{
        RelativePath = 'infrastructure\vpc-network-baseline.yaml'
        RequiredText = "Default: $canonicalCourseTag"
    }
)
foreach ($contract in $tagContracts) {
    $contractPath = Join-Path $resolvedRoot $contract.RelativePath
    if (-not (Test-Path -LiteralPath $contractPath -PathType Leaf)) {
        Add-CourseIssue -Severity Error -Check 'Course tag contract' `
            -Path $contract.RelativePath -Message 'Contract file is missing.'
        continue
    }

    $contractContent = [System.IO.File]::ReadAllText($contractPath)
    if (-not $contractContent.Contains($contract.RequiredText)) {
        Add-CourseIssue -Severity Error -Check 'Course tag contract' `
            -Path $contract.RelativePath `
            -Message "Expected canonical Course tag value: $canonicalCourseTag"
    }
}

$recommendedDirectories = @(
    'account',
    'modules',
    'capstones',
    'assessments',
    'infrastructure',
    'scripts'
)
foreach ($relativeDirectory in $recommendedDirectories) {
    $fullDirectory = Join-Path $resolvedRoot $relativeDirectory
    if (-not (Test-Path -LiteralPath $fullDirectory -PathType Container)) {
        Add-CourseIssue -Severity Warning -Check 'Course area' -Path $relativeDirectory `
            -Message 'Recommended course directory is missing.'
    }
}

$markdownFiles = @(
    Get-ChildItem -LiteralPath $resolvedRoot -Filter '*.md' -File -Recurse -ErrorAction Stop
)
$linkPattern = [regex]'\[[^\]]+\]\((?<target>[^)]+)\)'
foreach ($markdownFile in $markdownFiles) {
    $content = [System.IO.File]::ReadAllText($markdownFile.FullName)
    $relativeFile = $markdownFile.FullName.Substring($resolvedRoot.Length).TrimStart('\', '/')

    if ($content -match '[^\x00-\x7F]') {
        Add-CourseIssue -Severity Error -Check 'ASCII content' -Path $relativeFile `
            -Message 'Markdown contains one or more non-ASCII characters.'
    }

    foreach ($match in $linkPattern.Matches($content)) {
        $target = $match.Groups['target'].Value.Trim()
        if ($target.StartsWith('<') -and $target.Contains('>')) {
            $target = $target.Substring(1, $target.IndexOf('>') - 1)
        }
        else {
            $target = ($target -split '[ \t]', 2)[0]
        }

        if ($target -match '^(https?|mailto):' -or $target.StartsWith('#')) {
            continue
        }

        $targetPath = ($target -split '#', 2)[0]
        if ([string]::IsNullOrWhiteSpace($targetPath)) {
            continue
        }

        $targetPath = [Uri]::UnescapeDataString($targetPath)
        if ($targetPath.StartsWith('/')) {
            $candidatePath = Join-Path $resolvedRoot $targetPath.TrimStart('/')
        }
        else {
            $candidatePath = Join-Path $markdownFile.DirectoryName $targetPath
        }

        if (-not (Test-Path -LiteralPath $candidatePath)) {
            Add-CourseIssue -Severity Warning -Check 'Markdown link' -Path $relativeFile `
                -Message "Relative target does not exist: $targetPath"
        }
    }
}

$moduleFileSet = @(
    'README.md',
    'must-know.md',
    'guided-lab.md',
    'challenge-lab.md',
    'architecture-scenario.md',
    'validation.md',
    'cleanup.md',
    'quiz.md',
    'answers.md'
)
$moduleMarkers = @(
    'must-know.md',
    'guided-lab.md',
    'challenge-lab.md',
    'architecture-scenario.md'
)
$learningRoots = @('modules', 'capstones')
foreach ($learningRoot in $learningRoots) {
    $fullLearningRoot = Join-Path $resolvedRoot $learningRoot
    if (-not (Test-Path -LiteralPath $fullLearningRoot -PathType Container)) {
        continue
    }

    $directories = @(
        Get-Item -LiteralPath $fullLearningRoot
        Get-ChildItem -LiteralPath $fullLearningRoot -Directory -Recurse -ErrorAction Stop
    )
    foreach ($directory in $directories) {
        $isLearningUnit = $false
        foreach ($marker in $moduleMarkers) {
            if (Test-Path -LiteralPath (Join-Path $directory.FullName $marker) -PathType Leaf) {
                $isLearningUnit = $true
                break
            }
        }

        if (-not $isLearningUnit) {
            continue
        }

        foreach ($expectedFile in $moduleFileSet) {
            $expectedPath = Join-Path $directory.FullName $expectedFile
            if (-not (Test-Path -LiteralPath $expectedPath -PathType Leaf)) {
                $relativeDirectory = $directory.FullName.Substring($resolvedRoot.Length).
                    TrimStart('\', '/')
                Add-CourseIssue -Severity Error -Check 'Learning unit' `
                    -Path (Join-Path $relativeDirectory $expectedFile) `
                    -Message 'Expected learning-unit file is missing.'
            }
        }
    }
}

$labFiles = @(
    Get-ChildItem -LiteralPath $resolvedRoot -File -Recurse -ErrorAction Stop |
        Where-Object { $_.Name -in @('guided-lab.md', 'challenge-lab.md') }
)
foreach ($labFile in $labFiles) {
    $labContent = [System.IO.File]::ReadAllText($labFile.FullName)
    $relativeLab = $labFile.FullName.Substring($resolvedRoot.Length).TrimStart('\', '/')
    foreach ($section in @('## Lab profile', '## Preflight', '## Validate', '## Cleanup')) {
        if (-not $labContent.Contains($section)) {
            Add-CourseIssue -Severity Warning -Check 'Lab convention' -Path $relativeLab `
                -Message "Expected section is missing: $section"
        }
    }

    if ($labContent -notmatch
        'FREE-PLAN SAFE|USES CREDITS|OPTIONAL PAID/SANDBOX|DESIGN-ONLY') {
        Add-CourseIssue -Severity Warning -Check 'Lab cost label' -Path $relativeLab `
            -Message 'No recognized course cost label was found.'
    }

    foreach ($requiredTag in @('Course', 'Module', 'Owner', 'ExpiresAt')) {
        if (-not $labContent.Contains($requiredTag)) {
            Add-CourseIssue -Severity Warning -Check 'Lab tags' -Path $relativeLab `
                -Message "Required tag guidance is missing: $requiredTag"
        }
    }
}

$errors = @($issues | Where-Object Severity -eq 'Error')
$warnings = @($issues | Where-Object Severity -eq 'Warning')

Write-Host "Course structure root: $resolvedRoot"
if ($issues.Count -gt 0) {
    $issues |
        Sort-Object Severity, Check, Path |
        Format-Table Severity, Check, Path, Message -AutoSize -Wrap |
        Out-Host
}

Write-Host "Validation summary: $($errors.Count) error(s), $($warnings.Count) warning(s)."
if ($errors.Count -gt 0 -or ($Strict -and $warnings.Count -gt 0)) {
    throw 'Course structure validation failed.'
}

if ($warnings.Count -gt 0) {
    Write-Warning 'Course structure validation passed with warnings. Use -Strict to treat warnings as failures.'
}
else {
    Write-Host 'Course structure validation: PASS'
}
