# Fleetomatic

A NestJS-based fleet management system that helps organizations track and manage their vehicle fleet. The system provides comprehensive vehicle tracking, maintenance scheduling, and incident reporting capabilities.

## Features

- Vehicle management and tracking
- Maintenance scheduling and history
- Incident reporting and tracking
- RESTful API with Swagger documentation
- PostgreSQL database integration
- Docker containerization
- Comprehensive test coverage (Unit, E2E, and Postman tests)

## Tech Stack

- NestJS (Node.js framework)
- TypeScript
- PostgreSQL
- TypeORM
- Docker
- Swagger/OpenAPI
- Jest (Testing)

## Prerequisites

- Node.js (v14 or higher)
- Docker and Docker Compose
- PostgreSQL (if running locally)

## Getting Started

### Development Setup

1. Clone the repository
2. Create a `.env` file with the following configuration:

```bash
POSTGRES_HOST=postgres
POSTGRES_USER=le_user
POSTGRES_PASSWORD=le_pwd
POSTGRES_DB=le_db
PG_DATA=/var/lib/postgresql/data
NODE_ENV=development
```

3. Start the development environment:

```bash
sudo docker-compose build && docker-compose up
```

The application will be available at `http://localhost:3000`

## Testing

### Unit Tests

```bash
npm run test
```

### Coverage Tests

```bash
npm run test:cov
```

### End-to-End Tests

```bash
sudo docker-compose -f docker-compose-e2e.yml build && docker-compose -f docker-compose-e2e.yml up
```

### API Tests (Postman)

1. Install Newman:
```bash
npm install -g newman
```

2. Run the Postman collection:
```bash
newman run -e ./test/postman/FLEET_DEV.postman_environment.json ./test/postman/fleetomatic.postman_collection.json
```

## Documentation

### API Documentation
Swagger documentation is available at `/doc` endpoint when the application is running.

### Code Documentation
Generate code documentation using Compodoc:

```bash
npx @compodoc/compodoc -p tsconfig.json -s
```

## Project Structure

```
src/
├── vehiculos/           # Vehicle management module
│   ├── novedades/      # Incident reporting module
│   ├── vehiculo.entity.ts
│   ├── vehiculo.dto.ts
│   └── ...
├── app.module.ts       # Main application module
├── main.ts            # Application entry point
└── ...
```

## License

UNLICENSED - All rights reserved

## Author

Raúl Jiménez <eclarieurnoir@gmail.com>

```bash
sudo docker-compose build && docker-compose up
```

Necesita el archivo `.env` configurado con la conexión a la base de datos:

```bash
POSTGRES_HOST=postgres
POSTGRES_USER=le_user
POSTGRES_PASSWORD=le_pwd
POSTGRES_DB=le_db
PG_DATA=/var/lib/postgresql/data
NODE_ENV=development
```

## Unit Tests

```bash
npm run test
```

## Coverage Tests

```bash
npm run test:cov
```

## e2e Tests

```bash
sudo docker-compose -f docker-compose-e2e.yml build && docker-compose -f docker-compose-e2e.yml up
```

## Postman Tests

```bash
npm install -g newman
```

```bash
newman run -e ./test/postman/FLEET_DEV.postman_environment.json ./test/postman/fleetomatic.postman_collection.json
newman
```

## API Documentation
Swagger is available in `/doc`

## Code Documentation
Compodocs can be generated with this command:

```bash
npx @compodoc/compodoc -p tsconfig.json -s
```
