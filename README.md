# Demo application.

- API created on Express.js, PostgreSQL and PrismaORM,
- Frontend Client part on Vite + React, Redux-Toolkit and MaterialUI for design.

## Instructions to start application on local machine

- First you need to install node_modules in both folders. From root folder use these commands:
```bash
cd ./api
npm i

cd ../
cd ./client
npm i
cd ../
```
- After all dependencies installed, go to api folder and create .env file and .db.env file:
1. In .env file enter these values:
- PORT=8000
- DATABASE_URL="postgres://"username":"dbpassword"@localhost:"port in docker"/"db name"?schema=public"
- SESSION_SECRET="generate random long session secret"
- JWT_SECRET="generate random long session secret"
- TELEGRAM_BOT_TOKEN="here telegram bot token. OPTIONAL"

2. In .db.env file:
- POSTGRES_USER="your username"
- POSTGRES_PASSWORD="password for db"
- POSTGRES_DB="db name"
