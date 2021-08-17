#!/usr/bin/env pwsh

if (Test-Path "dist") {
    try {
        aws --version
    }
    catch {
        Write-Output "To deploy your lambda you need to install and configure aws cli"
        exit 1
    }
    
    $component = Get-Content -Path "component.json" | ConvertFrom-Json
    $functionName = "$($component.registry)/$($component.name):$($component.version)-function"

    Set-Location ./dist

    $createdFunctions = (aws lambda list-functions | ConvertFrom-Json).Functions

    # Exist function flag 
    $isExist = $false

    # Check for exist
    for ($i = 0; $i -lt $createdFunctions.Count; $i++) {
        if ($createdFunctions[$i].FunctionName -eq $functionName) {
            $isExist = $true
        }
    }

    if ($isExist) {
        aws lambda update-function-code --function-name $functionName --zip-file "fileb://$($component.name)-lambda-v$($component.version).zip"
    }
    else {
        # aws lambda create-function --runtime nodejs14.x --function-name $functionName --zip-file "fileb://$($component.name)-lambda-v$($component.version).zip"
        Write-Output "Lambda function is does not exist"
    }
    
}
else {
    Write-Output "To deploy your lambda first pack application with pack_lambda.ps1"
}
