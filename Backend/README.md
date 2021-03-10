# Backend application

This is backend application for the project project.

## Setting up project

Before start go to `src/resources/`, find file `application-mysql-dev-example.properties`, copy it and rename new file to `application-mysql-dev.poperties` (essentially delete "-example" part). Then in copied file change properties to match your local setup.

3 configurations are setted up (only if you have new Intellij):

- TEST - runs the tests
- RUN - runs spring app wth local settings
- INSTALL PRODUCTION - prepares package for the production

---

## Remarks from starter repository (from react classes)

### Installed Prerequisites

In order to launch the application the following items must be installed:

- [Java 11](https://adoptopenjdk.net/)
- [Maven](https://maven.apache.org/download.cgi)
- [MySQL Community Server + Workbench](https://dev.mysql.com/downloads/installer/)
- [Git](https://git-scm.com/downloads)

### Reference Documentation

For further reference, please consider the following sections:

- [Official Apache Maven documentation](https://maven.apache.org/guides/index.html)
- [Spring Boot Maven Plugin Reference Guide](https://docs.spring.io/spring-boot/docs/2.4.0-SNAPSHOT/maven-plugin/reference/html/)
- [Create an OCI image](https://docs.spring.io/spring-boot/docs/2.4.0-SNAPSHOT/maven-plugin/reference/html/#build-image)
- [Spring Web](https://docs.spring.io/spring-boot/docs/2.3.3.RELEASE/reference/htmlsingle/#boot-features-developing-web-applications)
- [Spring Data JPA](https://docs.spring.io/spring-boot/docs/2.3.3.RELEASE/reference/htmlsingle/#boot-features-jpa-and-spring-data)
- [Spring Boot Actuator](https://docs.spring.io/spring-boot/docs/2.3.3.RELEASE/reference/htmlsingle/#production-ready)
- [Spring Boot DevTools](https://docs.spring.io/spring-boot/docs/2.3.3.RELEASE/reference/htmlsingle/#using-boot-devtools)

### Guides

The following guides illustrate how to use some features concretely:

- [Building a RESTful Web Service](https://spring.io/guides/gs/rest-service/)
- [Serving Web Content with Spring MVC](https://spring.io/guides/gs/serving-web-content/)
- [Building REST services with Spring](https://spring.io/guides/tutorials/bookmarks/)
- [Accessing Data with JPA](https://spring.io/guides/gs/accessing-data-jpa/)
- [Building a RESTful Web Service with Spring Boot Actuator](https://spring.io/guides/gs/actuator-service/)
