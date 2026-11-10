# Using :latest to ensure patched Debian packages (libpng16-16 CVE-2026-22801, CVE-2026-25646, CVE-2026-22695)
FROM cgr.dev/chainguard/jre:latest
ENV TZ="Europe/Oslo"
WORKDIR /app
COPY build/libs/idebanken-search-api.jar /app/app.jar
EXPOSE 8080
CMD ["-jar","app.jar"]