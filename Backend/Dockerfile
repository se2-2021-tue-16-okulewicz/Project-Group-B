# Build
FROM maven:3.6.0-jdk-11-slim AS build
COPY src /home/app/src
COPY pom.xml /home/app
RUN mvn -f /home/app/pom.xml clean install

# Package
FROM openjdk:11
COPY --from=build home/app/target/se-backend-1.0.jar se-backend-1.0.jar

ENV WAIT_VERSION 2.7.2
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/$WAIT_VERSION/wait /wait
RUN chmod +x /wait

CMD ["java", "-jar", "se-backend-1.0.jar"]