# Great Night BE

## Installation

```bash
yarn install
```

## Running Development

1. Create .env file copy from .env.example
2. Run Database
```base
docker-compose up -d
```
3. Run App

```bash
yarn run dev
```


4. Access API Documentaion [http://localhost:4000/api/docs](http://localhost:4000/api/docs)

## Running Production

```bash
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```


