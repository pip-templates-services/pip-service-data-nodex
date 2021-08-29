#!/usr/bin/env pwsh

# Pack archive for lambda
try {
    
    npm i

    if (Test-Path "tmp") {
        Remove-Item -Recurse -Force -Path "tmp"
    }

    # Create tmp and copy dependency files and sources
    New-Item -ItemType Directory -Force -Path "tmp"
    New-Item -ItemType Directory -Force -Path "tmp/config"
    Copy-Item ./config/config.yml ./tmp/config/config.yml
    Copy-Item -Recurse ./node_modules ./tmp/node_modules
    Copy-Item -Recurse ./obj/src ./tmp/src
    Copy-Item ./package.json ./tmp/package.json
    Copy-Item ./bin/lambda.js ./tmp/index.js

    # Create dist folder
    if (Test-Path "dist") {
        Remove-Item -Recurse -Force -Path "dist"
    }
    New-Item -ItemType Directory -Force -Path "dist"

    $component = Get-Content -Path "component.json" | ConvertFrom-Json

    $compress = @{
        Path             = "./tmp/*"
        CompressionLevel = "Optimal" #"NoCompression"
        DestinationPath  = "./dist/$($component.name)-lambda-v$($component.version).zip"
    }
    # Archiving
    Compress-Archive @compress

    Remove-Item -Recurse -Force -Path "tmp"
    
    Write-Host "The archive was successfully created."
}
finally {
    if (Test-Path "tmp") {
        Remove-Item -Recurse -Force -Path "tmp"
    }
}