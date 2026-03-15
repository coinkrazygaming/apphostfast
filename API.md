# AppHostFast API Documentation

Complete API reference for integrating with AppHostFast.

## Base URL

```
https://apphostfast.dev/api
```

## Authentication

All authenticated endpoints require a Bearer token in the `Authorization` header:

```bash
curl https://apphostfast.dev/api/apps \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Getting a Token

Tokens are issued after authentication via GitHub OAuth or email/password. Store securely in environment variables.

---

## Endpoints

### Authentication

#### Login (Email)

```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "secure_password"
}
```

**Response:**
```json
{
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "fullName": "John Doe"
  }
}
```

#### OAuth - GitHub

```http
GET /auth/github?code=CODE&state=STATE
```

Redirects to dashboard with authentication token.

#### Logout

```http
POST /auth/logout
Authorization: Bearer YOUR_TOKEN
```

---

### Apps

#### List All Apps

```http
GET /apps
Authorization: Bearer YOUR_TOKEN
```

**Query Parameters:**
- `status` - Filter by status: `active`, `inactive`, `deploying`, `error`
- `framework` - Filter by framework: `next.js`, `react`, `express`, etc.
- `page` - Pagination (default: 1)
- `limit` - Results per page (default: 20, max: 100)

**Response:**
```json
{
  "apps": [
    {
      "id": "app_123",
      "name": "portfolio-v2",
      "framework": "next.js",
      "status": "active",
      "subdomain": "portfolio-v2.apphostfast.dev",
      "customDomain": "myportfolio.com",
      "lastDeployAt": "2024-01-15T10:32:15Z",
      "deployCount": 27,
      "createdAt": "2024-01-01T00:00:00Z"
    }
  ],
  "total": 3,
  "page": 1,
  "pages": 1
}
```

#### Get App Details

```http
GET /apps/:appId
Authorization: Bearer YOUR_TOKEN
```

**Response:**
```json
{
  "id": "app_123",
  "name": "portfolio-v2",
  "framework": "next.js",
  "status": "active",
  "subdomain": "portfolio-v2.apphostfast.dev",
  "customDomain": "myportfolio.com",
  "repositoryUrl": "https://github.com/user/portfolio",
  "repositoryBranch": "main",
  "buildCommand": "npm run build",
  "startCommand": "npm start",
  "envVars": {
    "NODE_ENV": "production"
  },
  "cpuLimit": "500m",
  "memoryLimit": "512Mi",
  "hasDatabase": true,
  "databaseName": "portfolio_db",
  "sslCertificate": "cert_data",
  "sslExpiresAt": "2025-01-15T00:00:00Z",
  "deployments": [
    {
      "id": "deploy_456",
      "commitSha": "abc123",
      "status": "success",
      "createdAt": "2024-01-15T10:32:15Z"
    }
  ],
  "stats": {
    "cpuUsage": 12,
    "memoryUsage": 45,
    "requestsPerSecond": 247,
    "errorRate": 0.52
  }
}
```

#### Create App

```http
POST /apps
Authorization: Bearer YOUR_TOKEN
Content-Type: application/json

{
  "name": "my-app",
  "framework": "next.js",
  "repositoryUrl": "https://github.com/user/repo",
  "repositoryBranch": "main",
  "buildCommand": "npm run build",
  "startCommand": "npm start",
  "envVars": {
    "NODE_ENV": "production",
    "API_KEY": "secret_key"
  }
}
```

**Response:** `201 Created`
```json
{
  "id": "app_789",
  "name": "my-app",
  "status": "deploying",
  "subdomain": "my-app.apphostfast.dev",
  "message": "App created and deployment started"
}
```

#### Update App

```http
PATCH /apps/:appId
Authorization: Bearer YOUR_TOKEN
Content-Type: application/json

{
  "name": "my-app-updated",
  "envVars": {
    "NODE_ENV": "production",
    "NEW_VAR": "value"
  }
}
```

**Response:** `200 OK`

#### Delete App

```http
DELETE /apps/:appId
Authorization: Bearer YOUR_TOKEN
```

**Response:** `204 No Content`

---

### Deployments

#### Get Deployment History

```http
GET /apps/:appId/deployments
Authorization: Bearer YOUR_TOKEN
```

**Query Parameters:**
- `limit` - Number of deployments to return (default: 20)
- `status` - Filter: `pending`, `building`, `deploying`, `success`, `failed`

**Response:**
```json
{
  "deployments": [
    {
      "id": "deploy_456",
      "appId": "app_123",
      "status": "success",
      "commitSha": "abc123def456",
      "commitMessage": "Update homepage",
      "branch": "main",
      "buildDuration": 45,
      "buildError": null,
      "buildStartedAt": "2024-01-15T10:30:00Z",
      "buildCompletedAt": "2024-01-15T10:31:15Z",
      "previewUrl": "pr-123.my-app.apphostfast.dev",
      "productionUrl": "my-app.apphostfast.dev",
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ]
}
```

#### Get Deployment Details

```http
GET /apps/:appId/deployments/:deploymentId
Authorization: Bearer YOUR_TOKEN
```

#### Trigger Deployment

```http
POST /deploy
Authorization: Bearer YOUR_TOKEN
Content-Type: application/json

{
  "appId": "app_123",
  "commitSha": "abc123",
  "branch": "main"
}
```

**Response:** `202 Accepted`
```json
{
  "deploymentId": "deploy_789",
  "status": "queued",
  "message": "Deployment queued"
}
```

---

### Logs

#### Get App Logs

```http
GET /apps/:appId/logs
Authorization: Bearer YOUR_TOKEN
```

**Query Parameters:**
- `limit` - Number of log lines (default: 100, max: 1000)
- `level` - Filter: `info`, `warn`, `error`, `debug`
- `since` - ISO timestamp, return logs after this time
- `follow` - Stream logs in real-time (SSE)

**Response:**
```json
{
  "logs": [
    {
      "id": "log_123",
      "level": "info",
      "message": "Server started on port 3000",
      "source": "app",
      "createdAt": "2024-01-15T10:32:47Z"
    },
    {
      "id": "log_124",
      "level": "error",
      "message": "Database connection failed",
      "source": "system",
      "createdAt": "2024-01-15T10:33:12Z"
    }
  ]
}
```

#### Stream Logs (Server-Sent Events)

```bash
curl -N \
  -H "Authorization: Bearer YOUR_TOKEN" \
  https://apphostfast.dev/api/apps/:appId/logs?follow=true
```

---

### Domains

#### List Domains

```http
GET /domains
Authorization: Bearer YOUR_TOKEN
```

**Response:**
```json
{
  "domains": [
    {
      "id": "domain_123",
      "domain": "myportfolio.com",
      "appId": "app_123",
      "verified": true,
      "dnsRecordType": "CNAME",
      "dnsRecordValue": "portfolio-v2.apphostfast.dev",
      "dnsVerified": true,
      "sslStatus": "active",
      "sslExpiresAt": "2025-01-15T00:00:00Z",
      "createdAt": "2024-01-01T00:00:00Z"
    }
  ]
}
```

#### Add Domain

```http
POST /domains
Authorization: Bearer YOUR_TOKEN
Content-Type: application/json

{
  "domain": "myapp.com",
  "appId": "app_123"
}
```

**Response:** `201 Created`
```json
{
  "id": "domain_456",
  "domain": "myapp.com",
  "appId": "app_123",
  "verified": false,
  "dnsRecordType": "CNAME",
  "dnsRecordValue": "my-app.apphostfast.dev",
  "message": "Add this DNS record to your domain registrar"
}
```

#### Verify Domain

```http
POST /domains/:domainId/verify
Authorization: Bearer YOUR_TOKEN
```

**Response:** `200 OK`
```json
{
  "verified": true,
  "sslStatus": "pending",
  "message": "Domain verified, SSL certificate pending"
}
```

#### Delete Domain

```http
DELETE /domains/:domainId
Authorization: Bearer YOUR_TOKEN
```

**Response:** `204 No Content`

---

### User Profile

#### Get Profile

```http
GET /user
Authorization: Bearer YOUR_TOKEN
```

**Response:**
```json
{
  "id": "user_123",
  "email": "user@example.com",
  "fullName": "John Doe",
  "username": "johndoe",
  "avatar": "https://avatars.githubusercontent.com/u/123",
  "company": "Acme Corp",
  "plan": "startup",
  "githubId": "123456",
  "createdAt": "2024-01-01T00:00:00Z"
}
```

#### Update Profile

```http
PATCH /user
Authorization: Bearer YOUR_TOKEN
Content-Type: application/json

{
  "fullName": "John Smith",
  "company": "New Company"
}
```

#### Change Password

```http
POST /user/password
Authorization: Bearer YOUR_TOKEN
Content-Type: application/json

{
  "currentPassword": "old_password",
  "newPassword": "new_password"
}
```

---

### Billing

#### Get Plan

```http
GET /billing/plan
Authorization: Bearer YOUR_TOKEN
```

**Response:**
```json
{
  "plan": "startup",
  "price": 6.99,
  "renewalDate": "2025-02-15T00:00:00Z",
  "features": {
    "maxApps": 10,
    "maxWebsites": 100,
    "cpuCores": 4,
    "ramGb": 4,
    "storageGb": 100
  }
}
```

#### Get Invoices

```http
GET /billing/invoices
Authorization: Bearer YOUR_TOKEN
```

**Response:**
```json
{
  "invoices": [
    {
      "id": "inv_123",
      "amount": 699,
      "currency": "USD",
      "period": "2024-01",
      "status": "paid",
      "paidAt": "2024-01-15T00:00:00Z",
      "dueDate": "2024-02-15T00:00:00Z"
    }
  ]
}
```

---

### Health & Status

#### Health Check

```http
GET /health
```

**Response:** `200 OK`
```json
{
  "status": "ok",
  "timestamp": "2024-01-15T10:35:00Z",
  "version": "1.0.0",
  "services": {
    "api": "up",
    "database": "up",
    "cache": "up",
    "docker": "up"
  }
}
```

---

## Error Responses

All errors return appropriate HTTP status codes with error details:

```json
{
  "error": "Invalid request",
  "message": "The app name must be between 2 and 50 characters",
  "code": "VALIDATION_ERROR",
  "statusCode": 400
}
```

### Common Status Codes

- `200 OK` - Request successful
- `201 Created` - Resource created
- `202 Accepted` - Request accepted for processing
- `204 No Content` - Request successful, no content to return
- `400 Bad Request` - Invalid request parameters
- `401 Unauthorized` - Missing or invalid authentication
- `403 Forbidden` - User doesn't have permission
- `404 Not Found` - Resource not found
- `409 Conflict` - Resource already exists
- `429 Too Many Requests` - Rate limited
- `500 Internal Server Error` - Server error

---

## Rate Limiting

API requests are rate-limited per user:

- **Authenticated**: 1,000 requests per hour
- **Unauthenticated**: 100 requests per hour

Rate limit headers:
```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1705326000
```

---

## Webhooks

### GitHub Webhook

AppHostFast receives webhooks from GitHub for automatic deployments.

**Trigger Events:**
- `push` - On every push to configured branch
- `pull_request` - On PR creation/update

**Webhook Payload:**
```json
{
  "action": "opened",
  "pull_request": {
    "number": 123,
    "head": {
      "sha": "abc123def456",
      "ref": "feature/new-feature",
      "repo": {
        "clone_url": "https://github.com/user/repo.git"
      }
    }
  }
}
```

**Signature Verification:**
```bash
X-Hub-Signature-256: sha256=signature_hash
```

---

## SDK & Libraries

### JavaScript/TypeScript

```bash
npm install apphostfast-sdk
```

```typescript
import { AppHostFast } from 'apphostfast-sdk';

const client = new AppHostFast({
  token: process.env.APPHOSTFAST_TOKEN
});

// List apps
const apps = await client.apps.list();

// Deploy
await client.deployments.trigger({
  appId: 'app_123',
  commitSha: 'abc123'
});

// Stream logs
const stream = client.logs.stream('app_123');
stream.on('data', (log) => console.log(log));
```

### Python

```bash
pip install apphostfast
```

```python
from apphostfast import AppHostFast

client = AppHostFast(token='your_token')

# List apps
apps = client.apps.list()

# Deploy
deployment = client.deployments.trigger(
    app_id='app_123',
    commit_sha='abc123'
)

# Stream logs
for log in client.logs.stream('app_123'):
    print(log)
```

---

## Support

- **Docs**: https://docs.apphostfast.dev
- **Status**: https://status.apphostfast.dev
- **Email**: support@apphostfast.dev
- **Issues**: https://github.com/yourusername/apphostfast/issues
