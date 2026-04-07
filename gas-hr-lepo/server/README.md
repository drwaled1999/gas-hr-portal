# Server

## Run
```bash
cd server
npm install
copy .env.example .env
npm run prisma:generate
npm run dev
```

## Optional database steps
If you want Prisma + PostgreSQL fully enabled later:
```bash
npm run prisma:migrate -- --name init
npm run seed
```

## Demo login
```json
{
  "username": "hrmanager",
  "password": "123456"
}
```

## Main endpoints
- `POST /api/auth/login`
- `GET /api/employees`
- `POST /api/employees`
- `PATCH /api/employees/:id`
- `POST /api/employees/:id/notes`
- `GET /api/permissions`
- `GET /api/audit`
- `GET /api/notifications`
