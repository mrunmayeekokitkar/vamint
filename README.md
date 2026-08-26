# VAMINT Community Website

![VAMINT Logo](public/logo.jpg)

Official website of **VAMINT**, the student tech community of our college.

Live Site: [https://vamintcommunity.vercel.app/](https://vamintcommunity.vercel.app/)
Repository: [https://github.com/mrunmayeekokitkar/vamint](https://github.com/mrunmayeekokitkar/vamint)

## Tech Stack

* **Frontend Framework**: Next.js 16 (App Router)
* **Styling**: Tailwind CSS v4 & Vanilla CSS
* **3D Graphics**: React Three Fiber & Three.js (dynamic scroll CLI terminal)
* **Database**: PostgreSQL (Prisma ORM)
* **Form Validation**: React Hook Form & Zod
* **Icons**: Lucide React

## Key Features

1. **3D Scroll Terminal**: A stylized, floating CLI window that progressively types commands matching our brand identity as you scroll, utilizing window scroll events without causing layout double scrollbars.
2. **Double Recruitment Flow**:
   * **Club Membership Form**: For students wishing to join events, workshops, hackathons, and debates.
   * **Committee Application Form**: A detailed application for joining the core executive committee.
3. **Protected Admin Dashboard**: Dashboard at `/admin/dashboard` allowing core members to securely review application entries across both forms separately, verified using `ADMIN_PASSWORD` cookies.
4. **Real Content Integration**: Updated calendar schedules with past campus events (Smart India Hackathon internal selections, Sitecraft 2025, Technobash 2026, Debate Competition 2026) and core committee rosters.

## Setup Instructions

### Prerequisites

Ensure you have [Node.js](https://nodejs.org) (v18+) and [npm](https://npmjs.com) installed.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/mrunmayeekokitkar/vamint.git
   cd vamint
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Setup environment variables:
   Create a `.env` file in the root directory and copy values from `.env.example`:
   ```bash
   cp .env.example .env
   ```
   Define your Postgres database string:
   ```env
   DATABASE_URL="postgresql://user:password@host:port/database"
   ADMIN_PASSWORD="your_secure_admin_password_here"
   ```

4. Run Prisma database migrations to create the tables locally:
   ```bash
   npx prisma db push
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) to view the application.

## Vercel Deployment

Configure the environment variables in your Vercel project settings:
* `DATABASE_URL` (e.g. from Vercel Postgres or Neon)
* `ADMIN_PASSWORD`
* `NEXT_PUBLIC_APP_URL`

Run the build command:
```bash
npm run build
```

## Community Socials

* **LinkedIn**: [VAMINT Community](https://www.linkedin.com/company/vamint-community/)
* **Instagram**: [@vamintcommunity](https://www.instagram.com/vamintcommunity/)
* **Email**: [vamintcommunity@gmail.com](mailto:vamintcommunity@gmail.com)
