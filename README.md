# VAMINT Community Website

![VAMINT Logo](public/logo.jpg)

Official website of **VAMINT**, the GSMCOE student tech community.

VAMINT is a student-led technology club at GSMCOE focused on fostering technical growth, hosting hackathons, developer events, debates, and collaborating on real-world projects.

Live Site: [https://vamintcommunity.vercel.app/](https://vamintcommunity.vercel.app/)
Repository: [https://github.com/mrunmayeekokitkar/vamint](https://github.com/mrunmayeekokitkar/vamint)

## Tech Stack

- **Frontend Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4 & Vanilla CSS
- **3D Graphics**: React Three Fiber & Three.js (dynamic scroll CLI terminal)
- **Database**: PostgreSQL (Prisma ORM)
- **Form Validation**: React Hook Form & Zod
- **Icons**: Lucide React
- **Deployment**: Vercel

## Key Features

1. **3D Scroll Terminal**: A stylized, floating CLI window that progressively types commands matching our brand identity as you scroll, utilizing window scroll events without causing layout double scrollbars.
2. **Double Recruitment Flow**:
   - **Club Membership Form**: For students wishing to join events, workshops, hackathons, and debates.
   - **Committee Application Form**: A detailed application for joining the core executive committee.
3. **Protected Admin Dashboard**: Dashboard at `/admin/dashboard` allowing core members to securely review application entries across both forms separately, verified using `ADMIN_PASSWORD` cookies.
4. **Real Content Integration**: Updated calendar schedules with past campus events (Smart India Hackathon internal selections, Sitecraft 2025, Technobash 2026, Debate Competition 2026) and core committee rosters.

## Project Structure (Routes Overview)

The project layout follows Next.js App Router structure under the `/app` directory:

- `/` (Home): The landing page showcasing the 3D scroll terminal, about intro, and highlight sections.
- `/about`: Overview of VAMINT, its mission, values, and vision.
- `/events`: Listing of upcoming and past events, hackathons, and calendar schedules.
- `/projects`: Showcases projects built by community members.
- `/team`: Unified roster of core leads, secretary, and general committee members.
- `/join`: Membership and committee recruitment forms.
- `/gallery`: Photo memories from past events and workshops.
- `/faq`: Frequently asked questions.
- `/legal`: Terms, conditions, and privacy policies.
- `/admin`: Secure dashboard to review applications.

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

   Configure the required environment variables:

   ```env
   # Database Connection String
   DATABASE_URL="postgresql://user:password@host:port/database"

   # Admin Panel Password
   ADMIN_PASSWORD="your_secure_admin_password_here"

   # App URL (for email links and verification)
   NEXT_PUBLIC_APP_URL="https://vamintcommunity.vercel.app"

   # Email Service (Resend)
   RESEND_API_KEY="your_resend_api_key_here"

   # Form Integration & Services (if configured)
   GOOGLE_SCRIPT_URL="your_google_script_url_here"
   FORM_SECRET_KEY="your_form_secret_key_here"
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

- `DATABASE_URL` (e.g. from Vercel Postgres or Neon)
- `ADMIN_PASSWORD`
- `NEXT_PUBLIC_APP_URL`
- `RESEND_API_KEY`
- `GOOGLE_SCRIPT_URL`
- `FORM_SECRET_KEY`

Run the build command:

```bash
npm run build
```

## Community Socials

- **LinkedIn**: [VAMINT Community](https://www.linkedin.com/company/vamint-community/)
- **Instagram**: [@vamintcommunity](https://www.instagram.com/vamintcommunity/)
- **Email**: [vamintcommunity@gmail.com](mailto:vamintcommunity@gmail.com)
