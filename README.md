# Layoff Tracker

A real-time layoff monitoring platform that aggregates and visualizes workforce reduction data across industries.

## Features

- 📊 Real-time layoff data dashboard
- 🏢 Company-specific tracking
- 📈 Industry trend analysis
- 🔍 Advanced search capabilities
- 🔔 Custom alert system
- 🌓 Dark/Light theme support
- 📱 Responsive design

## Tech Stack

- **Frontend**
  - Next.js 13.5.1
  - React 18.2.0
  - TypeScript
  - Tailwind CSS
  - shadcn/ui components
  - Recharts for data visualization
  - Lucide React for icons

- **Backend**
  - MongoDB for database
  - Next.js API routes
  - Web scraping functionality

## Prerequisites

- Node.js 18.x or higher
- MongoDB running on port 27018

## Environment Variables

Create a `.env.local` file in the root directory:

```env
MONGODB_URI=mongodb://localhost:27018
```

## Installation

1. Clone the repository:
```bash
git clone <https://github.com/Manishankar2714/Layoff.git>
cd layoff-tracker
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
├── app/                    # Next.js 13 app directory
│   ├── admin/             # Admin dashboard
│   ├── api/               # API routes
│   ├── industries/        # Industries overview
│   └── page.tsx           # Main dashboard
├── components/            # React components
│   ├── dashboard/        # Dashboard-specific components
│   ├── theme/            # Theme components
│   └── ui/               # UI components (shadcn/ui)
├── lib/                   # Utility functions
├── models/               # TypeScript interfaces
└── public/               # Static assets
```

## Dependencies

### Core
- next: 13.5.1
- react: 18.2.0
- react-dom: 18.2.0
- typescript: 5.2.2

### UI & Styling
- tailwindcss: 3.3.3
- @radix-ui/* components
- class-variance-authority: 0.7.0
- lucide-react: 0.446.0
- next-themes: 0.3.0
- recharts: 2.12.7

### Forms & Validation
- react-hook-form: 7.53.0
- zod: 3.23.8

### Development
- @types/node: 20.6.2
- @types/react: 18.2.22
- eslint: 8.49.0
- postcss: 8.4.30
- autoprefixer: 10.4.15

## Features in Development

- Email notifications for new layoffs
- Advanced filtering options
- Company profiles
- Historical data analysis
- API documentation
- Mobile app version


