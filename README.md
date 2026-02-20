# SAAE - Students Academic Analysis Engine

A web-based application for analyzing student academic performance using Spring Boot and MySQL.

## Prerequisites
- Java 17 or higher
- Maven
- MySQL Server running on port 3306

## Setup & Run

1.  **Database Configuration**
    - Ensure your MySQL server is running.
    - Open `src/main/resources/application.properties` and update the username/password if needed (default: root/root).
    - The application will automatically create the database `saae_db` if it doesn't exist.

2.  **Build and Run**
    Using Maven wrapper (if available) or installed Maven:
    ```bash
    mvn clean install
    mvn spring-boot:run
    ```

3.  **Access Application**
    - Open your browser and go to: `http://localhost:8080`

## default Login Credentials

| Role    | Username | Password   |
|---------|----------|------------|
| Admin   | admin    | admin123   |
| Faculty | faculty  | faculty123 |
| Student | student  | student123 |

## Features
- **Authentication**: Secure login.
- **Dashboard**: Interactive dashboard with glassmorphism UI.
- **Student Management**: View and add student details.
- **Subject Management**: Manage subjects and credits.
- **Analysis**: View academic performance summaries.

## Tech Stack
- **Frontend**: HTML5, CSS3 (Glassmorphism), JavaScript (Vanilla)
- **Backend**: Java Spring Boot
- **Database**: MySQL
