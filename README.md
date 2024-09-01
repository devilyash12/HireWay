# HireWay Job Portal

HireWay is a responsive job portal website that connects job seekers with employers. It provides a seamless experience for applying to jobs, posting new positions, saving interesting opportunities, and tracking previous job applications.

## Features

- Apply for jobs
- Post new job listings
- Save jobs for later
- View previous job application requests
- Responsive design for all devices

## Tech Stack

- Frontend:
  - React
  - Next.js
  - Vite
  - TailwindCSS
- Backend:
  - PostgreSQL
  - Supabase
- Authentication:
  - Clerk
- Programming Language:
  - JavaScript

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- PostgreSQL database

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/hireway.git
   cd hireway
   ```

2. Install dependencies:
   ```
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add the following variables:
   ```
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Run the development server:
   ```
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.