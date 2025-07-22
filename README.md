<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).

# Biologi Backend API

Backend API untuk aplikasi biologi dengan NestJS dan PostgreSQL.

## Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Database PostgreSQL
Pastikan PostgreSQL sudah terinstall dan berjalan. Buat database dengan nama `biologi_db`.

### 3. Environment Variables
Buat file `.env` di root project dengan konfigurasi berikut:
```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=password
DB_NAME=biologi_db
```

### 4. Running the Application
```bash
# Development
npm run start:dev

# Production
npm run build
npm run start:prod
```

Server akan berjalan di `http://localhost:3000`

## Swagger Documentation

Dokumentasi API lengkap tersedia di Swagger UI:
```
http://localhost:3000/api-docs
```

Swagger menyediakan:
- 📚 Dokumentasi endpoint lengkap
- 🧪 Interface untuk testing API
- 📋 Schema request/response
- 🎯 Contoh payload request

## API Endpoints

### Users

#### Create User
```http
POST /users
Content-Type: application/json

{
  "device_token": "unique_device_token",
  "name": "John Doe",
  "class": "10A"
}
```

#### Get All Users
```http
GET /users
```

#### Get User by ID
```http
GET /users/{id}
```

#### Get User by Device Token
```http
GET /users/device/{device_token}
```

#### Update User
```http
PATCH /users/{id}
Content-Type: application/json

{
  "name": "Jane Doe",
  "class": "10B"
}
```

#### Delete User
```http
DELETE /users/{id}
```

### Scores

#### Create Score
```http
POST /scores
Content-Type: application/json

{
  "date": "2025-01-22",
  "score": 85,
  "level": "Easy",
  "user_id": 1
}
```

#### Get All Scores
```http
GET /scores
```

#### Get Score by ID
```http
GET /scores/{id}
```

#### Get Scores by User ID
```http
GET /scores/user/{user_id}
```

#### Get Leaderboard
```http
GET /scores/leaderboard?limit=10
```

Response:
```json
[
  {
    "rank": 1,
    "user_id": 1,
    "name": "John Doe",
    "class": "10A",
    "highest_score": 95,
    "total_games": 5
  }
]
```

#### Update Score
```http
PATCH /scores/{id}
Content-Type: application/json

{
  "score": 90,
  "level": "Medium"
}
```

#### Delete Score
```http
DELETE /scores/{id}
```

## Database Schema

### Users Table
- `id` (Primary Key)
- `device_token` (Unique)
- `name`
- `class`
- `created_at`
- `updated_at`

### Scores Table
- `id` (Primary Key)
- `date`
- `score`
- `level`
- `user_id` (Foreign Key to Users)
- `created_at`
- `updated_at`

## Features

- ✅ CRUD operations untuk Users
- ✅ CRUD operations untuk Scores
- ✅ Endpoint Leaderboard dengan ranking
- ✅ Validasi input menggunakan class-validator
- ✅ PostgreSQL database dengan TypeORM
- ✅ Environment configuration
- ✅ Relasi One-to-Many antara User dan Score
