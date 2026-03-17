# Using :latest to ensure patched Debian packages (libpng16-16 CVE-2026-22801, CVE-2026-25646, CVE-2026-22695)
FROM gcr.io/distroless/java21-debian12:latest
COPY build/libs/idebanken-search-api.jar /app.jar
ENV TZ="Europe/Oslo"
EXPOSE 8080
CMD ["app.jar"]