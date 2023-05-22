import React, { PropsWithChildren, FC } from "react";


import { getChainMetadata } from "../chains";
import {
  AccountAction,
  ellipseAddress,
  AccountBalances,
  ChainMetadata,
  ChainNamespaces,
  ChainData,
} from "../helpers";
require('./Blockchain.scss');

import styled from "styled-components";
import { Button } from "antd";


const SChain = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  & p {
    font-weight: 600;
  }
  & img {
    border-radius: 50%;
    width: 35px;
    height: 35px;
    margin-right: 10px;
  }
`;

const SContainer = styled.div`
  height: 100%;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  word-break: break-word;
`;

const SFullWidthContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;


interface Props {
  chainData: ChainNamespaces;
  fetching?: boolean;
  active?: boolean;
  chainId: string;
  address?: string;
  onClick?: (chain: string) => void;
  balances?: AccountBalances;
  actions?: AccountAction[];
}

interface BlockchainDisplayData {
  data: ChainData;
  meta: ChainMetadata;
}

function getBlockchainDisplayData(
  chainId: string,
  chainData: ChainNamespaces
): BlockchainDisplayData | undefined {
  const [namespace, reference] = chainId.split(":");
  let meta: ChainMetadata;
  try {
    meta = getChainMetadata(chainId);
  } catch (e) {
    return undefined;
  }
  const data: ChainData = chainData[namespace][reference];
  if (typeof data === "undefined") return undefined;
  return { data, meta };
}


function Blockchain({ chainData, fetching, chainId, address, onClick, active,
  balances,
  actions,
}: Props): React.ReactElement<Props> {


  if (!Object.keys(chainData || {}).length) return <></>;

  const chain = getBlockchainDisplayData(chainId, chainData);

  if (typeof chain === "undefined") return <></>;

  const name = chain.meta.name || chain.data.name;
  const account =
    typeof address !== "undefined" ? `${chainId}:${address}` : undefined;
  const assets =
    typeof account !== "undefined" && typeof balances !== "undefined"
      ? balances[account]
      : [];

  // console.log('assets', assets)
  return (
    <React.Fragment>
      <div
        onClick={() => onClick && onClick(chainId)}
        className={active ? "active account" : "account"}
      >
        <div className="image">
          <img src={chain.meta.logo} alt={name} />
          <p>{name}</p>
        </div>
        {!!address && <p>{ellipseAddress(address)}</p>}
        <div>
          {fetching ? (
            <div >
              Loading...
            </div>
          ) : (
            <>
              {!!assets && assets.length ? (
                <div className="balances">
                  <h6>Balances</h6>
                  <div >
                    {assets.map((asset) =>
                      asset.symbol ? (
                        <div>{asset.balance} {asset.symbol}</div>
                      ) : null
                    )}
                  </div>
                </div>
              ) : null}
              {address && !!actions && actions.length ? (
                <div className="methods">
                  <h6>Methods</h6>
                  {actions.map((action) => (
                    <Button
                      className='sub-wallet-btn sub-wallet-btn-normal-size'
                      style={{ width: '100%' }}
                      key={action.method}
                      onClick={() => action.callback(chainId, address)}
                    >
                      {action.method}
                    </Button>
                  ))}
                </div>
              ) : null}
            </>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};
export default Blockchain;
