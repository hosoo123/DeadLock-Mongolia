$ErrorActionPreference = 'Stop'

$projectRoot = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
$dataDirectory = Join-Path $projectRoot 'public\data'
$heroDirectory = Join-Path $projectRoot 'public\heroes'
New-Item -ItemType Directory -Path $dataDirectory -Force | Out-Null
New-Item -ItemType Directory -Path $heroDirectory -Force | Out-Null

$heroes = Invoke-RestMethod -Uri 'https://api.deadlock-api.com/v1/assets/heroes?language=english' -TimeoutSec 60
$items = Invoke-RestMethod -Uri 'https://api.deadlock-api.com/v1/assets/items/by-type/upgrade?language=english' -TimeoutSec 60

$heroSnapshot = @()
foreach ($hero in $heroes) {
  if ($hero.disabled -eq $true -or $hero.in_development -eq $true -or $hero.player_selectable -eq $false) { continue }
  $imageUrl = $hero.images.icon_hero_card_webp
  if (-not $imageUrl) { $imageUrl = $hero.images.icon_hero_card }
  $extension = if ($imageUrl -match '\.webp(?:\?|$)') { '.webp' } else { '.png' }
  $fileName = "$($hero.name)$extension"
  $destination = Join-Path $heroDirectory $fileName
  if (-not (Test-Path -LiteralPath $destination) -or (Get-Item -LiteralPath $destination).Length -eq 0) {
    Invoke-WebRequest -Uri $imageUrl -OutFile $destination -TimeoutSec 60
  }
  $escapedName = [Uri]::EscapeDataString($hero.name)
  $heroSnapshot += [ordered]@{
    id = $hero.id
    name = $hero.name
    player_selectable = $true
    disabled = $false
    in_development = $false
    images = @{ icon_hero_card = "/heroes/$escapedName$extension" }
  }
}

$itemSnapshot = @()
foreach ($item in $items) {
  $propertyKeys = @()
  foreach ($section in @($item.tooltip_sections)) {
    foreach ($attributes in @($section.section_attributes)) {
      $propertyKeys += @($attributes.properties)
      $propertyKeys += @($attributes.elevated_properties)
      $propertyKeys += @($attributes.important_properties)
    }
  }
  $propertyKeys = @($propertyKeys | Where-Object { $_ } | Sort-Object -Unique)
  $properties = [ordered]@{}
  foreach ($key in $propertyKeys) {
    $property = $item.properties.$key
    if (-not $property) { continue }
    $properties[$key] = [ordered]@{
      value = $property.value
      label = $property.label
      postvalue_label = $property.postvalue_label
      prefix = $property.prefix
      postfix = $property.postfix
      css_class = $property.css_class
      tooltip_section = $property.tooltip_section
    }
  }
  $itemSnapshot += [ordered]@{
    id = $item.id
    name = $item.name
    item_slot_type = $item.item_slot_type
    item_tier = $item.item_tier
    cost = $item.cost
    activation = $item.activation
    is_active_item = $item.is_active_item
    properties = $properties
    tooltip_sections = $item.tooltip_sections
  }
}

$heroSnapshot | ConvertTo-Json -Depth 8 -Compress | Set-Content -LiteralPath (Join-Path $dataDirectory 'deadlock-heroes.json') -Encoding utf8NoBOM
$itemSnapshot | ConvertTo-Json -Depth 12 -Compress | Set-Content -LiteralPath (Join-Path $dataDirectory 'deadlock-items.json') -Encoding utf8NoBOM

Write-Output "Saved $($heroSnapshot.Count) heroes and $($itemSnapshot.Count) items to local public assets."
