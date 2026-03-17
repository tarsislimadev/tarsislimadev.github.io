---
layout: post
title: "Essential PowerShell Commands and Tips"
date: 2026-03-17 17:00:00 -0300
categories: windows automation powershell tips
---

PowerShell is a powerful task automation and configuration management framework from Microsoft, consisting of a command-line shell and the associated scripting language. Whether you're a system administrator or a developer, mastering PowerShell can significantly boost your productivity.

I recently explored the [SS64 PowerShell Index](https://ss64.com/ps/), which provides a comprehensive A-Z reference of commands. Here are some of the most essential commands and tips categorized for quick reference.

### 1. Navigation and File Management
The foundation of any shell is moving around and managing files. PowerShell uses a Verb-Noun syntax (e.g., `Get-ChildItem`).

*   **`Get-ChildItem` (ls/dir):** Lists files and folders. Use `-Recurse` to see everything in subfolders.
*   **`Set-Location` (cd):** Changes the current directory.
*   **`New-Item`:** Creates new files or directories. `New-Item -Path ".\logs" -ItemType Directory`.
*   **`Copy-Item` / `Move-Item`:** Copy or move files with ease. 
*   **`Test-Path`:** Checks if a file or folder exists. Great for scripts!

```powershell
# List all files larger than 100MB recursively
Get-ChildItem -Path . -Recurse | Where-Object { $_.Length -gt 100MB }

# Create a new directory and a file inside it
New-Item -Path ".\Scripts" -ItemType Directory
New-Item -Path ".\Scripts\Init.ps1" -ItemType File
```

### 2. Working with Data and Objects
Unlike traditional shells that pass text, PowerShell passes **objects**. This is its superpower.

*   **`Select-Object`:** Pick specific properties of an object. `Get-Process | Select-Object Name, CPU`.
*   **`Where-Object` (?):** Filter results. `Get-Service | Where-Object Status -eq "Running"`.
*   **`Sort-Object`:** Sort items. `ls | Sort-Object Length -Descending`.
*   **`ForEach-Object` (%):** Perform an action on each item in a collection.
*   **`Measure-Object`:** Calculate properties like average, sum, or count.

```powershell
# Get top 5 processes by CPU usage
Get-Process | Sort-Object CPU -Descending | Select-Object -First 5

# Find all stopped services that should be running
Get-Service | Where-Object { $_.Status -eq 'Stopped' -and $_.StartType -eq 'Automatic' }
```

### 3. Import, Export, and Conversion
PowerShell makes it trivial to work with structured data formats.

*   **`Export-Csv` / `Import-Csv`:** Perfect for reports or bulkhead data handling.
*   **`ConvertTo-Json` / `ConvertFrom-Json`:** Essential for working with modern APIs.
*   **`ConvertTo-Html`:** Generate quick status reports that look great in a browser.

```powershell
# Export running processes to a CSV file
Get-Process | Export-Csv -Path ".\Processes.csv" -NoTypeInformation

# Convert a command output to JSON
Get-Service | Select-Object -First 3 | ConvertTo-Json
```

### 4. System and Process Management
Control your machine directly from the shell.

*   **`Get-Process` / `Stop-Process`:** Manage running applications.
*   **`Get-Service` / `Start-Service` / `Restart-Service`:** Command Windows services.
*   **`Restart-Computer` / `Stop-Computer`:** Manage machine power states.

```powershell
# Stop all instances of Notepad safely
Stop-Process -Name "notepad" -ErrorAction SilentlyContinue

# Restart the Print Spooler service
Restart-Service -Name "Spooler" -Force
```

### 5. Networking Tools
Modern PowerShell is great for network troubleshooting and automation.

*   **`Test-NetConnection` (tnc):** The ultimate ping/telnet replacement. `tnc google.com -Port 443`.
*   **`Invoke-WebRequest` (iwr):** Fetch web content.
*   **`Invoke-RestMethod` (irm):** The go-to command for calling REST APIs and getting objects back automatically.
*   **`Resolve-DnsName`:** Better than `nslookup` for DNS queries.

```powershell
# Check connectivity to a specific port
Test-NetConnection -ComputerName "google.com" -Port 443

# Get your public IP address
(Invoke-RestMethod -Uri "https://api.ipify.org?format=json").ip
```

### 6. The "Holy Trinity" of Learning
If you forget everything else, remember these three:

1.  **`Get-Help`:** Read the manual for any command. `Get-Help Get-ChildItem -Examples`.
2.  **`Get-Command`:** Find a command when you only know part of the name. `Get-Command *Network*`.
3.  **`Get-Member` (gm):** See what you can actually DO with an object. `Get-Date | Get-Member`.

```powershell
# Search for all commands related to certificates
Get-Command *Certificate*

# Explore the properties of a file object
Get-Item ".\Processes.csv" | Get-Member
```

---

For a full list of commands, definitely check out [SS64's PowerShell Reference](https://ss64.com/ps/). It's an invaluable resource for anyone looking to dive deeper into Windows automation.
