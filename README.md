# Soroban Domains Query

A lightweight API deployed on Cloudflare Workers for querying data from Soroban Domains smart contracts.

## Introduction

Soroban Domains is a domain name service on the Soroban platform that allows users to register and manage memorable usernames. This API provides a simple interface to query domain data.

## Example

### Query address by domain name

```bash
https://sorobandomains.lightsail.network/api/v1/query?q=overcat.xlm&type=domain
```

### Query domain by address (Not implemented yet)

```bash
https://sorobandomains.lightsail.network/api/v1/query?q=GDMTVHLWJTHSUDMZVVMXXH6VJHA2ZV3HNG5LYNAZ6RTWB7GISM6PGTUV&type=address
```

## API Endpoints

Check the [API documentation](https://sorobandomains.lightsail.network/) for more information.
