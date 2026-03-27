# Deno Deploy OTEL playground

This repository is used to test and debug the OTEL integration with Deno Deploy.

The code is based on [Zero-config Debugging with Deno and OpenTelemetry](https://deno.com/blog/zero-config-debugging-deno-opentelemetry), an article by Luca Casonato and Andy Jiang.

## Why this repository?

I have an ongoing issue with the OTEL integration in Deno Deploy. This repository is used for replication purposes.

Currently my issue is that the custom spans are not displayed in the Deno Deploy console. Worse, it breaks the interface when we click on `view trace` from the `Logs` tab. An error appears in the browser console.

## Usage

You can run the application locally with the following command:

```bash
deno task dev
```

Only one endpoint is available:

- `GET /books/:id`

It will return the book with the given ID. If the book is not found, it will return a 404 error.

## Deploy

You can deploy the application to Deno Deploy with the following command:

```bash
deno deploy create
```

You can then access the application at the URL provided by the command.