FROM gcr.io/distroless/java21-debian12
COPY build/libs/idebanken-search-api.jar /app.jar
ENV TZ="Europe/Oslo"
EXPOSE 8080
CMD ["app.jar"]