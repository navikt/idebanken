type ServerEnv = 'prod' | 'test' | 'local'
type EnvRecord = Record<ServerEnv, string>

const env = (app.config.env || 'local') as ServerEnv

const frontendOrigins: EnvRecord = {
    prod: 'https://idebanken.no',
    test: 'https://idebanken.ekstern.dev.nav.no',
    local: 'http://localhost:3000',
} as const

const xpOrigins: EnvRecord = {
    prod: 'https://idebanken-xp7prod.enonic.cloud',
    test: 'https://idebanken-xp7test.enonic.cloud',
    local: 'http://localhost:8080',
} as const

const searchApiUrls: EnvRecord = {
    prod: 'https://idebanken-search-api.nav.no/content/idebanken',
    test: 'https://idebanken-search-api.ekstern.dev.nav.no/content/idebanken',
    local: 'http://localhost:9000/content/idebanken',
} as const

export const URLS = {
    FRONTEND_ORIGIN: frontendOrigins[env],
    XP_ORIGIN: xpOrigins[env],
    SEARCH_API_URL: searchApiUrls[env],
} as const

export const CONTENT_REPO_PREFIX = 'com.enonic.cms'
export const CONTENT_ROOT_PROJECT_ID = 'idebanken'
export const CONTENT_ROOT_REPO_ID = `${CONTENT_REPO_PREFIX}.${CONTENT_ROOT_PROJECT_ID}`

export const CONTENT_LOCALE_DEFAULT = 'no'

export const SYSTEM_ID_PROVIDER = 'system'
export const SYSTEM_USER = 'system-user'
export const SYSTEM_USER_PRINCIPAL = `user:${SYSTEM_ID_PROVIDER}:${SYSTEM_USER}`
export const SUPER_USER = 'su'
export const SUPER_USER_PRINCIPAL = `user:${SYSTEM_ID_PROVIDER}:${SUPER_USER}`

export const ADMIN_PRINCIPAL = 'role:system.admin'
export const LOGGED_IN_PRINCIPAL = 'role:system.admin.login'
