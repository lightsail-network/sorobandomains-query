import { SorobanDomainsSDK } from "@creit.tech/sorobandomains-sdk";
import * as SDK from "@stellar/stellar-sdk";
import { env } from "hono/adapter";

export function createSorobanDomainsSDK(c) {
  const {
    SOROBAN_RPC_URL,
    STELLAR_NETWORK,
    SOROBAN_DOMAINS_VAULTS_CONTRACT_ID,
  } = env<{
    SOROBAN_RPC_URL: string;
    STELLAR_NETWORK: string;
    SOROBAN_DOMAINS_VAULTS_CONTRACT_ID: string;
  }>(c);
  return new SorobanDomainsSDK({
    stellarSDK: SDK,
    rpc: new SDK.SorobanRpc.Server(SOROBAN_RPC_URL),
    network: SDK.Networks[STELLAR_NETWORK],
    vaultsContractId: SOROBAN_DOMAINS_VAULTS_CONTRACT_ID,
    defaultFee: "1000000",
    defaultTimeout: 60,
    simulationAccount:
      "GAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWHF",
  });
}
