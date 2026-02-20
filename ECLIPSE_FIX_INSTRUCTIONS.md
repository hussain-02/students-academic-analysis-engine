# Fix Eclipse Maven Dependencies Issue

## The Problem
Eclipse is showing: "The method run(Class<SaaeApplication>, String[]) is undefined for the type SpringApplication"

This means Eclipse hasn't properly downloaded the Spring Boot dependencies from Maven.

## The Solution

### Method 1: Force Update Maven Dependencies in Eclipse

1. **In Eclipse, right-click on the project** (`hussain s6`)
2. Select **Maven** → **Update Project...**
3. In the dialog:
   - ✅ Check **"Force Update of Snapshots/Releases"**
   - Click **OK**
4. Wait for Eclipse to download all dependencies (check bottom-right progress bar)
5. **Clean the project:**
   - Go to **Project** → **Clean...**
   - Select your project and click **Clean**

### Method 2: Reimport the Project

1. **Right-click on the project** → **Close Project**
2. **File** → **Import...**
3. Select **Maven** → **Existing Maven Projects**
4. Browse to: `C:\Users\kamal\OneDrive\Desktop\hussain s6`
5. Click **Finish**
6. Wait for dependencies to download

### Method 3: Clean from Command Line (Fastest)

1. Open **Command Prompt**
2. Navigate to your project:
   ```cmd
   cd "C:\Users\kamal\OneDrive\Desktop\hussain s6"
   ```
3. Run:
   ```cmd
   mvn clean compile
   ```
4. In Eclipse: **Right-click project** → **Refresh** (F5)

## After Fixing

Once Eclipse shows no errors:

1. **Right-click** `SaaeApplication.java`
2. **Run As** → **Java Application**
3. Wait for console to show: `Started SaaeApplication in X.XXX seconds`
4. Open browser to: **http://localhost:8080/**
5. Login with:
   - Username: `admin`
   - Password: `admin123`

## Still Having Issues?

Make sure you have internet connection - Maven needs to download Spring Boot JARs from the internet.
