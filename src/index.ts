import { fromHono } from "chanfana";
import { Hono } from "hono";
import { SorobanDomainsQuery } from "./endpoints/sorobanDomainsQuery";
import { cors } from "hono/cors";

// Start a Hono app
const app = new Hono();
app.use("/api/*", cors());

// Setup OpenAPI registry
const openapi = fromHono(app, {
  docs_url: "/",
  schema: {
    info: {
      title: "Soroban Domains Query",
      version: "1.0.0",
    },
  },
});

// Register OpenAPI endpoints
openapi.get("/api/v1/query", SorobanDomainsQuery);

// Export the Hono app
export default app;
