# INFO

## Run for development

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
