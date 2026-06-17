# OctoFit Tracker - React 19 Frontend Configuration

## Overview

The OctoFit Tracker frontend is built with React 19 and Vite, featuring a modern multi-tier architecture with dynamic API configuration for both Codespaces and local development.

## Environment Variables

The frontend uses Vite environment variables for API configuration. Create a `.env.local` file in the `octofit-tracker/frontend/` directory:

```bash
# .env.local
VITE_CODESPACE_NAME=your-codespace-name
```

### VITE_CODESPACE_NAME

- **Required in Codespaces:** Set this to your Codespace name
- **Optional for localhost:** Leave empty for local development
- **Example in Codespaces:** `VITE_CODESPACE_NAME=great-space-palindrome-1x9v5`

## API Configuration

The frontend automatically detects the environment and builds the correct API base URL:

### In GitHub Codespaces
```
https://${VITE_CODESPACE_NAME}-8000.app.github.dev
```

### On Localhost
```
http://localhost:8000
```

## Components

### Users (`src/components/Users.jsx`)
- Displays list of users
- Shows user name, email, and fitness points
- Fetches from `/api/users`

### Teams (`src/components/Teams.jsx`)
- Displays list of teams
- Shows team name, description, and member count
- Fetches from `/api/teams`

### Activities (`src/components/Activities.jsx`)
- Displays available activities
- Shows activity name, type, and calories
- Fetches from `/api/activities`

### Workouts (`src/components/Workouts.jsx`)
- Displays workout records
- Shows duration, date, and associated user/activity
- Fetches from `/api/workouts`

### Leaderboard (`src/components/Leaderboard.jsx`)
- Displays user rankings
- Shows rank, user name, points, and team
- Fetches from `/api/leaderboard`

## API Response Compatibility

All components handle multiple response formats:
- **Array response:** `[{...}, {...}]`
- **Paginated response:** `{ data: [...] }` or `{ users: [...] }` or `{ teams: [...] }` etc.

This ensures compatibility with different backend implementations.

## Navigation

Uses React Router for client-side navigation:
- `/` - Users
- `/teams` - Teams
- `/activities` - Activities
- `/workouts` - Workouts
- `/leaderboard` - Leaderboard

## Safe Fallback

If `VITE_CODESPACE_NAME` is not defined:
1. The app gracefully falls back to `http://localhost:8000`
2. No `undefined` values appear in URLs
3. Users can switch environments by updating `.env.local`

## Running the Frontend

```bash
cd octofit-tracker/frontend

# Install dependencies
npm install

# Run in development mode (port 5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Dependencies

- **React 19** - UI library
- **React Router DOM** - Client-side routing
- **Vite** - Build tool and dev server
