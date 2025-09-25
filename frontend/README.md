# Idebanken frontend

Dette er frontend applikasjonen satt opp i Next.js for den fremtidige nye nettsiden til Idebanken. Den bruker [idebanken-enonic](https://github.com/navikt/idebanken-enonic/) som headless CMS.

# Komme i gang

## Lokalt utviklingsmiljø

### Sett lokale EVN-variabler

```bash
echo """
MODE=development
NEXT_PUBLIC_MODE=development
IS_LOCALHOST=true
ENONIC_DOMAIN=localhost:8080
ENONIC_API=http://\${ENONIC_DOMAIN}/site/
ENONIC_API_TOKEN=mySecretKey
SEARCH_API_URL=http://localhost:9000
""" > .env.local
```

### Installer node moduler

```bash
npm install
```


### Start applikasjonen i utviklingsmodus

NB!: Enonic sandbox med idebanken-enonic må kjøre i tillegg. Sjekk repoet til [idebanken-enonic](https://github.com/navikt/idebanken-enonic/)

```bash
npm run dev
```

Gå til http://localhost:3000, eller via Enonic Content Studio (http://localhost:8080)


## Login i dev

Du trenger en bruker for Idebanken sitt Enonic-dashboard i dev. Noen i teamet kan opprette for deg

Gå til:

https://idebanken-xp7test.enonic.cloud/admin (Enonic dashboard)

eller:

https://idebanken.ekstern.dev.nav.no/ (frontendapplikajonen i NAIS)



# Henvendelser

Spørsmål knyttet til koden eller prosjektet kan stilles som issues her på GitHub

## For NAV-ansatte

Interne henvendelser kan sendes via Slack i kanalen #idebanken
