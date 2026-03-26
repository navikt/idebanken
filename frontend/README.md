# Idebanken frontend

Dette er frontend applikasjonen satt opp i Next.js for den fremtidige nye nettsiden til Idebanken. Den bruker [idebanken-enonic](https://github.com/navikt/idebanken-enonic/) som headless CMS.

# Komme i gang

## Lokalt utviklingsmiljø

### Sett lokale EVN-variabler

```bash
echo """
ENV=local
NEXT_PUBLIC_ENV=local
ENONIC_API=http://localhost:8080/site/
ENONIC_API_TOKEN=mySecretKey
SEARCH_API_URL=http://localhost:9000
""" > .env.local
```

### Installer node moduler

```bash
npm install
```


### Start applikasjonen i utviklingsmodus

NB!: Enonic sandbox med idebanken-enonic må kjøre i tillegg. Sjekk repoet til [xp-backend](../xp-backend)

```bash
npm run dev
```

Gå til http://localhost:3000, eller via Enonic Content Studio (http://localhost:8080)


## Test / Prod
For tilgang til test- og produksjonsmiljøene, logg inn med SSO på følgende lenker:
* [TEST](https://idebanken-xp7test.enonic.cloud/admin)
* [PROD](https://idebanken-xp7prod.enonic.cloud/admin)

Etter du har logget inn må du få rettigheter av en administrator og logge inn på nytt eller slette cookies for å få tilgang til innholdet.

Ellers ligger frontend applikasjonen i [NAIS](https://console.nav.cloud.nais.io/team/idebanken)

## Deploy
Det er satt opp GitHub Actions for automatisk versjonering, bygg og deploy til testmiljøet ved hver endring på main branch. For å deploye til prod kan man bruke [backend & frontend deploy workflow](https://github.com/navikt/idebanken/actions/workflows/deploy-backend-and-frontend.yml) og velge/oppgi tag.

# Henvendelser

Spørsmål knyttet til koden eller prosjektet kan stilles til post@idebanken.org

## For NAV-ansatte

Interne henvendelser kan sendes via Slack i kanalen #idebanken
