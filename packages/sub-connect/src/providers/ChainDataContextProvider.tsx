import {
  ReactNode,
  useEffect,
  useState,
} from "react";
import { SolanaChainData } from "../chains/solana";
import { PolkadotChainData } from "../chains/polkadot";
import { ElrondChainData } from "../chains/elrond";
import { TronChainData } from "../chains/tron";

import { ChainNamespaces, ChainsMap, getAllChainNamespaces } from "../helpers";
import { NearChainData } from "../chains/near";
import { CosmosChainData } from "../chains/cosmos";
import { EIP155ChainData } from "../chains/eip155";
import { TezosChainData } from "../chains/tezos";
import { ChainDataContext } from "../contexts";


/**
 * Provider
 */
export function ChainDataContextProvider({
  children,
}: {
  children: ReactNode | ReactNode[];
}) {
  const [chainData, setChainData] = useState<ChainNamespaces>({});

  const loadChainData = async () => {
    const namespaces = getAllChainNamespaces();
    const chainData: ChainNamespaces = {};
    await Promise.all(
      namespaces.map(async (namespace) => {
        let chains: ChainsMap | undefined;
        switch (namespace) {
          case "solana":
            chains = SolanaChainData;
            break;
          case "polkadot":
            chains = PolkadotChainData;
            break;
          case "near":
            chains = NearChainData;
            break;
          case "elrond":
            chains = ElrondChainData;
            break;
          case "tron":
            chains = TronChainData;
            break;
          case "cosmos":
            chains = CosmosChainData;
            break;
          case "eip155":
            chains = EIP155ChainData;
            break;
          case "tezos":
            chains = TezosChainData;
            break;
          default:
            console.error("Unknown chain namespace: ", namespace);
        }

        if (typeof chains !== "undefined") {
          chainData[namespace] = chains;
        }
      })
    );
    console.log('chainData', chainData)

    setChainData(chainData);
  };

  useEffect(() => {
    loadChainData();
  }, []);

  return (
    <ChainDataContext.Provider
      value={{
        chainData,
      }}
    >
      {children}
    </ChainDataContext.Provider>
  );
}
