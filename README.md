# React-Nest

Install / run instructions at the bottom!

## Frontend Requirements

- [x] Uses Typescript
- [x] Custom react components
- [x] Signup / login form checking
- [x] Dashboard and logout button

## Backend Requirements

- [x] MongoDB as database
- [x] One protected route `/me`
- [x] Install instructions
- [x] Mongoose ORM
- [x] Basic logging
- [x] Error handling / clear responses
- [x] Api documentation (swagger)

---

## Starting frontend dev server

1. Change directory into the `frontend` folder
2. Run `npm i` to install dependencies
3. Run `npm run start` to start the dev server on port `8080`

```bash
cd frontend
npm i
npm run start
```

---

## Starting backend dev server

1. Change directory into the `backend` folder
2. Run `npm i` to install dependencies
3. Run the docker compose command `docker-compose up -d`
4. Run `npm run start` to start the dev server on port `3000`

```bash
cd backend
npm i
docker-compose up -d
npm run start
```

---

## API documentation (Swagger)

1. Make sure the backend dev server is running
2. Visit `http://localhost:3000/api`

---

## Backend Tests

1. To run the total available tests change directory to `backend`
2. run `npm run test`

```bash
cd backend
npm run test
```
