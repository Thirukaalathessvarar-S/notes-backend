
# Stage 1: Build the application
FROM maven:3.8.5-openjdk-17 AS build

WORKDIR /app

# Copy the pom.xml and download dependencies
COPY pom.xml .
RUN mvn dependency:go-offline

# Copy the source code and build the application
COPY src ./src
RUN mvn clean install -DskipTests

# Stage 2: Create the final image
FROM openjdk:17-slim

WORKDIR /app

# Copy the built JAR from the build stage
COPY --from=build /app/target/VibeProject-0.0.1-SNAPSHOT.jar .

# Expose the port the application runs on
EXPOSE 8081

# Run the application
ENTRYPOINT ["java", "-jar", "VibeProject-0.0.1-SNAPSHOT.jar"]
