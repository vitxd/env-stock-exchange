# 🌐 Environment Management Service

## 📝 Overview

This is a TypeScript-based environment management service that provides a **REST API** and **Slack integration** for managing development environments across multiple services. The application allows teams to reserve, release, and track the status of different environments.

## ✨ Key Features

### 🏗 Environment Management
- **List available environments**
- **Reserve environments** for specific users
- **Release environments** when no longer needed
- Track environment ownership and availability

### 🚀 Deployment Tracking
- Store and retrieve deployment information for services across different environments
- Track service versions and deployers

### 🤖 Slack Integration
- Manage environments directly through Slack commands
- List, reserve, and release environments via a Slack bot

### 📦 Key Components

#### Routes
- `/api/environment`: Environment management endpoints
- `/api/deployment`: Deployment tracking endpoints
- `/api/service`: Service-related operations
- `/slack/environment`: Slack command processing

#### Services
- Environment management logic
- Deployment tracking
- Slack command resolution

#### Data Access
- Manage database interactions for environments, services, and deployments
- Support CRUD operations for environments and services

## 💬 Slack Commands

| Command | Description |
|---------|-------------|
| `/env list` | Show all environments and their current status |
| `/env reserve <environment>` | Reserve an environment |
| `/env release <environment>` | Release a previously reserved environment |

## 🛠 Setup and Configuration

1. **Install dependencies**
   ```bash
   pnpm install
   ```

2. Configure environment variables
3. Set up SQL database
4. Run database migrations
5. **Start the server**
   ```bash
   npm start
   ```

## Develop

```
$ docker compose up -d
$ docker compose exec app pnpm run migrate
$ docker compose exec app pnpm run seed
```

---

**Made with ❤️ in TypeScript**
