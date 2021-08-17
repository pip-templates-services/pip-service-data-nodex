#!/usr/bin/env pwsh

Set-StrictMode -Version latest
$ErrorActionPreference = "Stop"

$component = Get-Content -Path "component.json" | ConvertFrom-Json
$image="$($component.registry)/$($component.name):$($component.version)-$($component.build)-rc"
$latestImage="$($component.registry)/$($component.name):latest"

# Build docker image
docker build -f docker/Dockerfile -t $image -t $latestImage .

# Set environment variables
$env:IMAGE = $image

try {
    # Workaround to remove dangling images
    docker-compose -f ./docker/docker-compose.yml down

    docker-compose -f ./docker/docker-compose.yml up -d

    Start-Sleep -Seconds 10
    Invoke-WebRequest -Uri http://localhost:8080/heartbeat
    Invoke-WebRequest -Uri http://localhost:8080/v1/entities/get_entities -Method Post

    Write-Host "The container was successfully built."

    # Save the result to avoid overwriting it with the "down" command below
    $exitCode = $LastExitCode 
} finally {
    docker-compose -f ./docker/docker-compose.yml down
}

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

# Return the exit code of the "docker-compose.yml up" command
exit $exitCode 
