import { OpenAPIRoute, Str } from "chanfana";
import { z } from "zod";
import { createSorobanDomainsSDK } from "../sorobandomains";
import { Domain404Error, Record, ReverseDomain404Error } from "@creit.tech/sorobandomains-sdk";

export class SorobanDomainsQuery extends OpenAPIRoute {
  schema = {
    tags: ["Domain and Address"],
    summary: "Fetch domain or address based on type",
    request: {
      query: z.object({
        q: Str({ description: "Query string" }),
        type: z.enum(["domain", "address"], {
          description: "Type of record to fetch",
        }),
      }),
    },
    responses: {
      "200": {
        description: "Returns domain or address record",
        content: {
          "application/json": {
            schema: z.object({
              domain: Str(),
              address: Str(),
            }),
          },
        },
      },
      "404": {
        description: "record not found",
        content: {
          "application/json": {
            schema: z.object({
              title: Str(),
            }),
          },
        },
      },
    },
  };

  async handle(c) {
    // Get validated data
    const data = await this.getValidatedData<typeof this.schema>();

    // Retrieve the validated query parameters
    const { q, type } = data.query;
    const sdk = createSorobanDomainsSDK(c);
    if (type === "domain") {
      if (
        !q.endsWith(".xlm") ||
        q.slice(0, -4).split(".").reverse().length > 2
      ) {
        return this.notFound();
      }

      try {
        const [domain, subDomain] = q.slice(0, -4).split(".").reverse();
        const domainRecord: Record = await sdk.searchDomain({
          domain,
          subDomain,
        });
        return Response.json({
          domain: q,
          address: domainRecord.value.address,
        });
      } catch (e) {
        if (e.name === Domain404Error.name) {
          return this.notFound();
        }
        throw e;
      }
    }

    if (type === "address") {
      try {
        const domain = await sdk.getReverseDomain(q);
        return Response.json({
          domain: domain,
          address: q,
        });
      } catch (e) {
        if (e.name === ReverseDomain404Error.name) {
          return this.notFound();
        }
        throw e;
      }
    }
  }

  notFound() {
    return Response.json({ title: "Not Found" }, { status: 404 });
  }
}
