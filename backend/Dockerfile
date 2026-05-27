# ──────────────────────────────────────────
# Stage 1: build
# ──────────────────────────────────────────
FROM maven:3.9-eclipse-temurin-21-alpine AS builder

WORKDIR /build

# Copy dependency descriptors first for better layer caching
COPY pom.xml .
COPY .mvn/ .mvn/

# Download dependencies without building the project
RUN mvn dependency:go-offline -q

# Copy source and build the fat JAR
COPY src/ src/
RUN mvn package -DskipTests -q

# ──────────────────────────────────────────
# Stage 2: runtime
# ──────────────────────────────────────────
FROM eclipse-temurin:21-jre-alpine AS runtime

# Non-root user for security
RUN addgroup -S app && adduser -S app -G app
USER app

WORKDIR /app

COPY --from=builder /build/target/portal-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
