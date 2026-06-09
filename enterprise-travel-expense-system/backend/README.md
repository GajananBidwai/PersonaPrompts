# Travel & Expense Management System - Backend

This is the backend service for the Enterprise Employee Travel & Expense Management System.

## Technology Stack
- Java 17+
- Spring Boot 3.2.0
- Spring Data JPA
- MySQL
- Maven

## Getting Started

### Prerequisites
- Java JDK 17 or higher
- Maven 3.6+
- MySQL 8.0+

### Installation
1. Clone the repository
2. Configure MySQL database (update `src/main/resources/application.properties` if needed)
3. Build the project: `mvn clean install`
4. Run the application: `mvn spring-boot:run`

### API Endpoints
- Health Check: `GET /api/health`
- Detailed Health: `GET /actuator/health` (when actuator is enabled)

## Project Structure
- `src/main/java/com/company/travelexpense` - Main application code
- `src/main/resources` - Configuration files
- `src/test/java` - Test classes

## Development
This project follows standard Spring Boot conventions.
