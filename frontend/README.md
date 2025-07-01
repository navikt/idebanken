# Idebanken frontend

Dette er frontend applikasjonen satt opp i Next.js for den fremtidige nye nettsiden til Idebanken. Den bruker [idebanken-enonic](https://github.com/navikt/idebanken-enonic/) som headless CMS.

# Komme i gang

## Lokalt utviklingsmiljø

### Sett lokale EVN-variabler

```bash
cp ./.env .env.local
```

Eller opprett filen `.env.local` basert på innholdet fra `.env`.

Endre på `ENONIC_API`, `ENONIC_DOMAIN` og `IS_LOCALHOST` til å bruke localhost verdiene.

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
