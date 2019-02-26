<#
    .Synopsis
      Publishes a Firefox Addon to the Add on store. 
    .LINK
       https://addons-server.readthedocs.io/en/latest/topics/api/signing.html
    #>
param(
$JWTIssuer = "SECRET KEY",
$JWTSecret = "SECRET SECRET",
$guid = "d7a6f344-723c-4d87-a1f5-f4bac1f1f701",
$version = "1.8.1",
$zipPath = ""
)


$randomJTI = $(Get-Random -Minimum 0.0000001 -Maximum 0.1000000)
$JWT = NEw-Object PSObject
$JWT | Add-Member -type NoteProperty -Name "iss" -Value "$JWTIssuer"
$JWT | Add-Member -type NoteProperty -Name "jti" -Value "$randomJTI"
$JWT | Add-Member -type NoteProperty -Name "iat" -Value $([int][double]::Parse((Get-Date -UFormat %s)))
$JWT | Add-Member -type NoteProperty -Name "exp" -Value $([int][double]::Parse((Get-Date -UFormat %s)))
$JWTJson = $JWT | ConvertTo-Json
$hmacsha = New-Object System.Security.Cryptography.HMACSHA256

$hmacsha.key = [Text.Encoding]::ASCII.GetBytes("$JWTSecret")
$signature = $hmacsha.ComputeHash([Text.Encoding]::ASCII.GetBytes($JWTJson))
$signatureBase64 = [Convert]::ToBase64String($signature)
$Headers = @{
    Authorization = "JWT $signatureBase64"
}
Invoke-WebRequest -Uri "https://addons.mozilla.org/api/v4/addons/$guid/versions/$version/" -Method Put -Infile $zipPath -Headers $Headers