# Idébanken monorepo

### [backend](./xp-backend/README.md) - Enonic XP Backend
### [frontend](./frontend/README.md) - Next.js Frontend
## Other Apps
#### [idebanken-search-api](./apps/idebanken-search-api/README.md) - Search API for Idebanken  
## Configuration
#### [idebanken-xp-configuration](https://github.com/navikt/idebanken-xp-configuration) - Configuration repository for Enonic XP, used by [GitPull](https://github.com/enonic/app-gitpull/tree/master) to pull configuration into the Enonic XP app.

```
monorepo
│
└─── xp-backend
│      * The main enonic XP app/backend/headless CMS
│
│   
└─── frontend
│      * Next.js frontend app
│
└─── apps
    │  * Folder for other apps that are part of the monorepo
    │   
    └─── idebanken-search-api
           * Search API for Idebanken
```

---

## Quick Start

> **Goal:** get the full local stack running — Enonic XP backend, Next.js frontend, and the search API.  
> All three services must run simultaneously for the full experience.

### Prerequisites

Make sure you have the following installed before starting:

| Tool | Version | Notes |
|------|----|-------|
| [Node.js](https://nodejs.org/) | 24 | Used by both the frontend and xp-backend build |
| [Enonic CLI](https://developer.enonic.com/docs/enonic-cli) | latest | `npm install -g @enonic/cli` |
| [Java](https://adoptium.net/) | 21 | Required by idebanken-search-api |
| [gcloud CLI](https://cloud.google.com/sdk/docs/install) | latest | Required to fetch OpenSearch credentials for search-api |
| [nais CLI](https://doc.nais.io/operate/cli/) | latest | Required to fetch OpenSearch credentials for search-api |
| A GitHub PAT with `read:packages` scope | —  | Required to pull the shared search library; add to `~/.gradle/gradle.properties` as `githubPassword=<PAT>` |

---

### 1 — Set up and start the Enonic XP backend

```bash
cd xp-backend

# Install dependencies
npm install

# Create the sandbox (only needed the first time)
enonic sandbox create idebanken --template essentials --force

# Configure the sandbox
pushd ~/.enonic/sandboxes/idebanken/home/config
echo "nextjs.default.secret=mySecretKey
nextjs.default.url=http://127.0.0.1:3000" > com.enonic.app.nextxp.cfg
echo "searchApiKey=key" > idebanken.cfg
popd

# Start the sandbox + app in dev mode
enonic dev
```

Enonic Content Studio will be available at http://localhost:8080 — click **Log in as Guest**.

---

### 2 — Start the Next.js frontend

In a new terminal:

```bash
cd frontend

# Install dependencies
npm install

# Set up local environment variables
echo "
ENV=local
NEXT_PUBLIC_ENV=local
ENONIC_API=http://localhost:8080/site/
ENONIC_API_TOKEN=mySecretKey
SEARCH_API_URL=http://localhost:9000
" > .env.local

# Start the dev server
npm run dev
```

The frontend will be available at http://localhost:3000.

---

### 3 — Start the Search API

In a new terminal:

```bash
cd apps/idebanken-search-api

# Fetch OpenSearch credentials from Kubernetes (requires gcloud + nais CLI)
gcloud auth login && \
  nais aiven create --access admin --instance search --secret idebanken opensearch ignored idebanken && \
  nais aiven get opensearch idebanken idebanken

# Create a local config file with the credentials from the command above
cat > src/main/resources/application-local.yml << 'EOF'
opensearch:
  uris: <uri from secret>
  username: <username from secret>
  password: <password from secret>

api-key: key
EOF

# Run the app with the local profile
./gradlew bootRun --args='--spring.profiles.active=local'
```

The Search API will be available at http://localhost:9000.

---

### Deployment

#### Backend & frontend
Push to main to trigger the GitHub Actions workflow for automatic build and deploy to test. For production deploy, use the [backend & frontend deploy workflow](https://github.com/navikt/idebanken/actions/workflows/deploy-backend-and-frontend.yml) and choose/enter the appropriate tag.

#### Search API
Push to main to trigger the GitHub Actions workflow for automatic build and deploy to test. For production deploy, use the [app build and deploy workflow](https://github.com/navikt/idebanken/actions/workflows/app-build-and-deploy.yml)

---

### All services at a glance

| Service | URL | Start command |
|---------|-----|---------------|
| Enonic XP (Content Studio) | http://localhost:8080 | `enonic dev` (in `xp-backend/`) |
| Next.js frontend | http://localhost:3000 | `npm run dev` (in `frontend/`) |
| Search API | http://localhost:9000 | `./gradlew bootRun --args='--spring.profiles.active=local'` (in `apps/idebanken-search-api/`) |

---

## Contacts

Questions about the code or the project can be directed to post@idebanken.org  
**NAV employees:** use the [#idebanken](https://nav-it.slack.com/archives/idebanken) Slack channel.
