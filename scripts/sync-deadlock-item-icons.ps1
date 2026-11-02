param(
  [string]$OutputDirectory = (Join-Path $PSScriptRoot '..\public\items')
)

$ErrorActionPreference = 'Stop'
$api = 'https://deadlock.wiki/api.php'
$categoryUri = "${api}?action=query&list=categorymembers&cmtitle=Category%3AItem_icons&cmtype=file&cmlimit=max&format=json&formatversion=2"
$category = Invoke-RestMethod -Uri $categoryUri -TimeoutSec 45
$uncategorizedItemIcons = @(
  'Arctic Blast', 'Armor Piercing Rounds', 'Ballistic Enchantment',
  'Blood Tribute', 'Capacitor', 'Cheat Death', 'Counterspell',
  'Crushing Fists', 'Cultist Sacrifice', 'Disarming Hex', 'Express Shot',
  'Focus Lens', 'Fury Trance', 'Golden Goose Egg', 'Guardian Ward',
  'Headhunter', 'Healing Tempo', 'Indomitable', 'Juggernaut',
  'Lightning Scroll', 'Mercurial Magnum', 'Mystic Regeneration',
  'Opening Rounds', 'Plated Armor', 'Radiant Regeneration', 'Rebuttal',
  'Recharging Rush', 'Scourge', 'Spellbreaker', 'Spellslinger',
  'Spirit Burn', 'Spirit Lifesteal', 'Spirit Sap', 'Spirit Shielding',
  'Split Shot', 'Stalker', 'Transcendent Cooldown', 'Trophy Collector',
  'Vortex Web', 'Weakening Headshot', 'Weapon Shielding',
  'Weighted Shots', 'Witchmail'
)
$titles = @(
  $category.query.categorymembers.title
  $uncategorizedItemIcons | ForEach-Object { "File:$_.png" }
) | Sort-Object -Unique

New-Item -ItemType Directory -Path $OutputDirectory -Force | Out-Null

$downloaded = 0
$skipped = 0
$failed = 0
for ($offset = 0; $offset -lt $titles.Count; $offset += 40) {
  $last = [Math]::Min($offset + 39, $titles.Count - 1)
  $batch = $titles[$offset..$last]
  $joinedTitles = [Uri]::EscapeDataString(($batch -join '|'))
  $infoUri = "${api}?action=query&prop=imageinfo&iiprop=url&titles=$joinedTitles&format=json&formatversion=2"
  $info = $null
  for ($apiAttempt = 1; $apiAttempt -le 4 -and -not $info; $apiAttempt++) {
    try {
      $info = Invoke-RestMethod -Uri $infoUri -TimeoutSec 45
    } catch {
      if ($apiAttempt -eq 4) { throw }
      Start-Sleep -Seconds (2 * $apiAttempt)
    }
  }

  foreach ($page in $info.query.pages) {
    if (-not $page.imageinfo -or -not $page.imageinfo[0].url) { continue }
    $fileName = ($page.title -replace '^File:', '')
    $destination = Join-Path $OutputDirectory $fileName
    if ((Test-Path -LiteralPath $destination) -and (Get-Item -LiteralPath $destination).Length -gt 0) {
      $skipped++
      continue
    }
    if (Test-Path -LiteralPath $destination) {
      Remove-Item -LiteralPath $destination -Force
    }
    $saved = $false
    for ($attempt = 1; $attempt -le 3 -and -not $saved; $attempt++) {
      try {
        Invoke-WebRequest -Uri $page.imageinfo[0].url -OutFile $destination -TimeoutSec 60
        $saved = $true
      } catch {
        if (Test-Path -LiteralPath $destination) {
          Remove-Item -LiteralPath $destination -Force
        }
        if ($attempt -eq 3) {
          Write-Warning "Failed to download $fileName after 3 attempts"
          $failed++
          break
        }
        Start-Sleep -Seconds $attempt
      }
    }
    if ($saved) { $downloaded++ }
    Start-Sleep -Milliseconds 80
  }
}

# The wiki disambiguates this filename, while the in-game item does not.
$bulletLifestealSource = Join-Path $OutputDirectory 'Bullet Lifesteal (item).png'
if (Test-Path -LiteralPath $bulletLifestealSource) {
  Copy-Item -LiteralPath $bulletLifestealSource -Destination (Join-Path $OutputDirectory 'Bullet Lifesteal.png') -Force
}

Write-Output "Downloaded $downloaded item icons; skipped $skipped existing files; failed $failed; output: $OutputDirectory"
