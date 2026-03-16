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