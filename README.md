# Soroban Domains Query

A lightweight API deployed on Cloudflare Workers for querying data from Soroban Domains smart contracts.

## Introduction

Soroban Domains is a domain name service on the Soroban platform that allows users to register and manage memorable domain. This API provides a simple interface to query domain data.

## Example

### Query address by domain name

```bash
curl 'https://sorobandomains-query.lightsail.network/api/v1/query?q=overcat.xlm&type=domain'
```

### Query domain name by address

```bash
curl 'https://sorobandomains-query.lightsail.network/api/v1/query?q=GDMTVHLWJTHSUDMZVVMXXH6VJHA2ZV3HNG5LYNAZ6RTWB7GISM6PGTUV&type=address'
```

## API Endpoints

Check the [API documentation](https://sorobandomains-query.lightsail.network/) for more information.

## Deploy to Cloudflare Workers

1. Install the [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/).
2. Clone this repository.
3. Check the `vars` in `wrangler.toml` and update them if necessary.
4. Run `wrangler login` to authenticate with Cloudflare.
5. Run `wrangler deploy` to deploy the API to Cloudflare Workers.
