# bredex_technical_test

To start the project, the first thing to do is to start the docker with the database. You simply need Docker installed and run the command "docker-compose up -d". 
The dump.sql file contains the database needed to start the project.

Then we have to start both projects.
For Angular, we must access the Frontend folder and start the service with the command "ng serve -o".
For Spring, we must access the app folder and run the javac command to the AppApplication.java file in the src/main/java/abarrerah/app/AppApplication.java path.

Technological stack raised.

Frontend.
 Main framework: Angular 17
[Used:
- Guards
- Components
- Observable
- Service
- Interface
- FormsReactive
I would have liked to add but I couldn't due to lack of time:
- Interceptors
- Best JWT handler
- I18n
- Hydration
- PWA
Primary programming language: TypeScript
CSS framework: Boostrap 5

Backend.
Main Programming language used: Java 21
Main Framework used: Spring 3
Main ORM used: JPA with Hibernate
[Used:
- Lombok for make easier models predefined functions such as getter/setter/constructor...
- JPA
- JWT
- Spring Security
I would have liked to add but I couldn't due to lack of time:
- Spring Cloud with Eureka
- OAuth
- Spring Batch

