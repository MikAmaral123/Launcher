<#
.SYNOPSIS
  Zippe un build Unity de My Universe et publie une Release GitHub que le launcher detectera.

.DESCRIPTION
  Prerequis :
    - GitHub CLI installe et connecte :  winget install GitHub.cli  puis  gh auth login
    - Un build Windows de My Universe deja genere depuis Unity.

.PARAMETER BuildDir
  Dossier du build Unity (celui qui contient "My Universe.exe" + le dossier *_Data).

.PARAMETER Version
  Numero de version = tag de la release. Ex : 0.1.0

.PARAMETER Repo
  Repo GitHub du JEU au format owner/repo. Ex : BasaltGame/my-universe

.PARAMETER Notes
  (Optionnel) Notes de version en Markdown. Sinon un texte par defaut est utilise.

.EXAMPLE
  ./publish-game-release.ps1 -BuildDir "D:\Builds\MyUniverse" -Version 0.1.0 -Repo BasaltGame/my-universe
#>

param(
  [Parameter(Mandatory = $true)][string]$BuildDir,
  [Parameter(Mandatory = $true)][string]$Version,
  [Parameter(Mandatory = $true)][string]$Repo,
  [string]$Notes = ""
)

$ErrorActionPreference = "Stop"

if (-not (Test-Path $BuildDir)) { throw "BuildDir introuvable : $BuildDir" }
if (-not (Get-Command gh -ErrorAction SilentlyContinue)) {
  throw "GitHub CLI (gh) introuvable. Installe-le : winget install GitHub.cli, puis 'gh auth login'."
}

$tag = "v$Version"
$zipName = "MyUniverse-Windows-$Version.zip"
$zipPath = Join-Path $env:TEMP $zipName

Write-Host "==> Compression du build : $BuildDir" -ForegroundColor Cyan
if (Test-Path $zipPath) { Remove-Item $zipPath -Force }
# On zippe le CONTENU du dossier (pas le dossier parent) pour que l'exe soit a la racine du zip.
Compress-Archive -Path (Join-Path $BuildDir '*') -DestinationPath $zipPath -CompressionLevel Optimal

$sizeMb = [math]::Round((Get-Item $zipPath).Length / 1MB, 1)
Write-Host "    -> $zipName  ($sizeMb Mo)" -ForegroundColor Green
if ($sizeMb -ge 2000) {
  Write-Warning "L'archive depasse ~2 Go : GitHub Releases limite chaque fichier a 2 Go. Il faudra decouper le build."
}

if ([string]::IsNullOrWhiteSpace($Notes)) {
  $Notes = "## My Universe $Version`n`n- Nouvelle version de My Universe.`n- Voir le jeu pour les details."
}
$notesFile = Join-Path $env:TEMP "notes-$Version.md"
$Notes | Out-File -FilePath $notesFile -Encoding utf8

Write-Host "==> Creation de la release $tag sur $Repo" -ForegroundColor Cyan
gh release create $tag $zipPath `
  --repo $Repo `
  --title "My Universe $Version" `
  --notes-file $notesFile

Write-Host "`n✔ Release publiee. Le launcher proposera la mise a jour au prochain lancement." -ForegroundColor Green
Remove-Item $zipPath -Force
Remove-Item $notesFile -Force
