# Spring Boot Backend (minimal scaffold)

This is a minimal Spring Boot scaffold to work with the frontend in this workspace.

Quick run (requires JDK 17+ and Maven installed):

```bash
cd project--backend-main/springboot-backend
mvn -q spring-boot:run
```

Endpoints:

- GET /api/funds — returns demo funds
- GET /api/health — returns {"status":"UP"}
- POST /api/login — accepts {email,password} and returns a demo user
- POST /api/register — accepts {fullName,email,password,role}

Actuator endpoints are exposed: GET /actuator/health, /actuator/info, /actuator/metrics

CORS is configured for local Vite dev server origins.
