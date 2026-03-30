# Portfolio_David

Personal portfolio platform built with React, Node.js, PostgreSQL, and Vercel. The project includes a public-facing site plus an admin layer for managing projects, blog content, and contact submissions.

## Why it matters
- Full-stack portfolio product instead of a static landing page.
- Shows frontend, backend, content management, analytics, and deployment concerns in one repository.
- Good showcase for web product engineering rather than isolated UI work.

## Highlights
- Bilingual experience.
- Responsive design with light and dark themes.
- Contact workflow with email integration.
- Admin panel for projects and blog content.
- PostgreSQL-backed content model.
- Vercel deployment workflow.

## Stack
- React
- Node.js
- PostgreSQL
- Tailwind CSS
- Vercel Functions

## Quick start
```bash
pnpm install:all
pnpm run build
pnpm run dev
```

## Environment
The repository includes `vercel.env.example` for deployment-oriented variables.

Main groups:
- database: `DATABASE_URL`
- email delivery: Gmail/SMTP variables
- auth: `JWT_SECRET`
- analytics: Vercel and Google Analytics variables

## Project structure
```txt
frontend/   React application
api/        Serverless API functions
shared/     Shared configuration and utilities
```

## Notes
- The project includes asset generation scripts for icons and static branding files.
- The admin area is intended for personal content management, not as a general multi-tenant CMS.

## License
MIT
