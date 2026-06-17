# OctoFit Tracker - API Configuration Guide

## Backend Configuration

The OctoFit Tracker backend is configured to run on **port 8000** with support for both Codespaces and localhost.

### API Base URL Configuration

The API base URL is dynamically configured based on the environment:

#### In GitHub Codespaces:
```
https://$CODESPACE_NAME-8000.app.github.dev
```

#### On Localhost (local development):
```
http://localhost:8000
```

### Available API Endpoints

- **Health Check:** `/api/health`
- **Users:** `/api/users`
- **Teams:** `/api/teams`
- **Activities:** `/api/activities`
- **Workouts:** `/api/workouts`
- **Leaderboard:** `/api/leaderboard`

### Testing the API

You can verify the API endpoints are working by using the test script:

```bash
bash octofit-tracker/scripts/test-api.sh
```

Or manually test individual endpoints with curl:

```bash
# Test health endpoint
curl http://localhost:8000/api/health

# Test users endpoint
curl http://localhost:8000/api/users

# Test activities endpoint
curl http://localhost:8000/api/activities
```

### Frontend Configuration

The frontend automatically detects the environment and uses the correct API base URL:
- In Codespaces: Uses the Codespaces HTTPS URL
- Locally: Uses localhost

This is configured in `octofit-tracker/frontend/src/config/api.ts`