# Kopi av [navno-search-api](https://github.com/navikt/navno-search-api)

----

# idebanken-search-api
Søkebackend for idebanken

Secrets ligger i [Nais console](https://console.nav.cloud.nais.io/team/idebanken/secrets).

## Henting av felles bibliotek

Et felles bibliotek publiseres av [navno-search-admin-api](https://github.com/navikt/navno-search-admin-api). Biblioteket inneholder diverse konstanter, samt klassen som brukes for å opprette Opensearch-indexen. Ved deling og versjonering av denne er det mulig å opprette og populere en ny index før man skrur apiet over til å søke mot denne.

For å kunne hente dette biblioteket lokalt, må man opprette et PAT i Github og sette dette i `~/.gradle/gradle.properties`.

```
githubPassword=<PAT>
```

## Lokal kjøring
For å kjøre appen lokalt må man opprette en application-local.yml-fil og populere denne med opensearch-credentials, som ligger i kubernetes.
Man kan generere JIT acccess ved å kjøre 
```bash
gcloud auth login && nais aiven create --access admin --instance search --secret idebanken opensearch ignored idebanken && nais aiven get opensearch idebanken idebanken
```
```
opensearch:
  uris: <uri fra secret>
  username: <brukernavn fra secret>
  password: <passord fra secret>
```

Husk å starte applikasjonen med profile "local".

## Deploy til test

[Actions](https://github.com/navikt/idebanken/actions) -> Velg workflow -> Run workflow -> Velg branch -> Run workflow

## Prodsetting

- Lag en PR til main, og merge inn etter godkjenning (En automatisk release vil oppstå ved deploy til main)
- Dersom det er ny versjon av [navno-search-admin-api](https://github.com/navikt/navno-search-admin-api/) må siste versjon av ```navnoSearchCommonVersion``` oppdateres

## Logging

TODO: Legg til link til Kibana

I Opensearch (uri ligger i application-local.yaml filen) kan man finne logger ved å f.eks. søke på

```
GET /_cat/indices

DELETE /search-content-v7

GET /search-content-v6

GET /search-content-v6/_mapping

POST /search-content-v6/_analyze
{
  "field": "title.no",
  "text": "skule"
}

POST /search-content-v6/_search
{
  "query": {
    "match": {
      "title.no": "nav midt-buskerud"
    }
  }
}
```

