# Great Night FE

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

4. Generate axios client from openapi to sync with BE

```bash
yarn run generateAxiosClient
```
