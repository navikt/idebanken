# Idebanken Enonic

Dette er Headless-CMS delen Idebanken applikasjonen. Den bruker Enonic XP. [Idebanken-frontend](https://github.com/navikt/idebanken-frontend/) er frontend-delen av applikasjonen.

# Komme i gang

## Lokalt utviklingsmiljø

### Oppsett av Enonic

Du trenger en sandbox: https://developer.enonic.com/docs/xp/stable/development/sandboxes, som du linker til Enonic applikasjonen. Her er et fint utganspunkt hvis Enonic er nytt for deg: https://developer.enonic.com/docs/next.xp/stable/enonic-setup.

Ellers kjør 
```bash
enonic sandbox create idebanken --template essentials --force
```
#### Konfigurasjon av sandbox
```bash
pushd ~/.enonic/sandboxes/idebanken/home/config
echo "nextjs.default.secret=mySecretKey
nextjs.default.url=http://127.0.0.1:3000" > com.enonic.app.nextxp.cfg
popd
```

### Start applikasjonen i utviklingsmodus

Når sandboxen er opprettet, og koblet til applikasjonen kan du kjøre denne kommandoen for å starte opp sandbox+applikasjon i dev-modus:

```bash
enonic dev
```

NB!: idebanken-frontend må kjøre i tillegg, for å få opp live previews i Enonic Content Studios [idebanken-frontend](https://github.com/navikt/idebanken-frontend/)

```bash
npm run dev
```

Gå til http://localhost:8080 (Enonic Content Studio). Velg "Log in as Guest"


## Test / Prod
For tilgang til test- og produksjonsmiljøene, logg inn med SSO på følgende lenker:
* [TEST](https://idebanken-xp7test.enonic.cloud/admin)
* [PROD](https://idebanken-xp7prod.enonic.cloud/admin)

Etter du har logget inn må du få rettigheter av en administrator og logge inn på nytt eller slette cookies for å få tilgang til innholdet.

Ellers ligger frontend applikasjonen i [NAIS](https://console.nav.cloud.nais.io/team/idebanken)

## Deploy
### Automatisk
Det er satt opp GitHub Actions for automatisk versjonering, bygg og deploy til testmiljøet ved hver endring på main branch. Man kan også [deploye spesifikke versjoner](https://github.com/navikt/idebanken/actions/workflows/xp-app-download-deploy.yml).
### Manuell
Det er for øyeblikket ikke satt opp automatisk deploy. For å oppdatere applikasjonen i dev, må du først bygge apllikasjonen:

```bash
enonic project build
```

Bygget lagres som en .jar-fil her: `/idebanken-enonic/build/libs/xp-backend.jar`

Deretter gå til https://idebanken-xp7test.enonic.cloud/admin/tool/com.enonic.xp.app.applications/main, og velg "Install".
Velg den nye .jar-filen. Applikasjonen blir da installert automatisk

# Henvendelser

Spørsmål knyttet til koden eller prosjektet kan stilles som issues her på GitHub

## For NAV-ansatte

Interne henvendelser kan sendes via Slack i kanalen #idebanken
