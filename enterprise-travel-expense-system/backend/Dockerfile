FROM eclipse-temurin:17-jdk-alpine as builder

WORKDIR /app

# Copy maven executable
COPY mvnw .
COPY .m2 .m2
COPY pom.xml .
COPY src src

# Build the application
RUN ./mvnw clean package -DskipTests

# Runtime stage
FROM eclipse-temurin:17-jre-alpine

WORKDIR /app

# Copy the jar from builder stage
COPY --from=builder /app/target/travel-expense-system-0.0.1-SNAPSHOT.jar app.jar

# Expose port
EXPOSE 8080

# Run the application
ENTRYPOINT ["java","-jar","app.jar"]
