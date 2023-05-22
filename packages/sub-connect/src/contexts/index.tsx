// Copyright 2019-2022 @subwallet/sub-connect authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Wallet, WalletAccount } from '@subwallet/wallet-connect/src/types';
import { EvmWallet } from '@subwallet/wallet-connect/types';
import Client from '@walletconnect/sign-client';
import React from 'react';
import { PairingTypes, SessionTypes } from "@walletconnect/types";
import { PublicKey } from "@solana/web3.js";
import { AccountBalances, ChainNamespaces } from '../helpers';

export interface WalletContextInterface {
  wallet?: Wallet,
  evmWallet?: EvmWallet,
  accounts: WalletAccount[],
  setWallet: (wallet: Wallet | EvmWallet | undefined, walletType: 'substrate' | 'evm') => void
  walletType: 'substrate' | 'evm';
}

export const WalletContext = React.createContext<WalletContextInterface>({
  accounts: [],
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setWallet: (wallet, walletType: 'substrate' | 'evm') => { },
  walletType: 'substrate'
});

interface OpenSelectWalletInterface {
  isOpen: boolean,
  open: () => void
  close: () => void
}

export const OpenSelectWallet = React.createContext<OpenSelectWalletInterface>({
  isOpen: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  open: () => { },
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  close: () => { }
});

/**
 * Types
 */
interface ClientInterface {
  client: Client | undefined;
  session: SessionTypes.Struct | undefined;
  connect: (pairing?: { topic: string }) => Promise<void>;
  disconnect: () => Promise<void>;
  isInitializing: boolean;
  chains: string[];
  relayerRegion: string;
  pairings: PairingTypes.Struct[];
  accounts: string[];
  solanaPublicKeys?: Record<string, PublicKey>;
  balances: AccountBalances;
  isFetchingBalances: boolean;
  setChains: any;
  setRelayerRegion: any;
}

/**
 * Context
 */
export const ClientContext = React.createContext<ClientInterface>({} as ClientInterface);

export type ModalType = "" | "request" | "pairing";

interface ModalWalletConnectInterface {
  modal: ModalType,
  setModalInfo: (type: ModalType) => void
}

export const ModalWalletConnectContext = React.createContext<ModalWalletConnectInterface>({
  modal: '',
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setModalInfo: () => { },
});


/**
 * Types
 */
interface ChainDataContextInterface {
  chainData: ChainNamespaces;
}

/**
 * Context
 */
export const ChainDataContext = React.createContext<ChainDataContextInterface>({} as ChainDataContextInterface);

/**
 * Types
 */
export interface IFormattedRpcResponse {
  method?: string;
  address?: string;
  valid: boolean;
  result: string;
}

type TRpcRequestCallback = (chainId: string, address: string) => Promise<void>;

interface JsonRpcInterface {
  ping: () => Promise<void>;
  ethereumRpc: {
    testSendTransaction: TRpcRequestCallback;
    testSignTransaction: TRpcRequestCallback;
    testEthSign: TRpcRequestCallback;
    testSignPersonalMessage: TRpcRequestCallback;
    testSignTypedData: TRpcRequestCallback;
  };
  cosmosRpc: {
    testSignDirect: TRpcRequestCallback;
    testSignAmino: TRpcRequestCallback;
  };
  solanaRpc: {
    testSignMessage: TRpcRequestCallback;
    testSignTransaction: TRpcRequestCallback;
  };
  polkadotRpc: {
    testSignMessage: TRpcRequestCallback;
    testSignTransaction: TRpcRequestCallback;
  };
  nearRpc: {
    testSignAndSendTransaction: TRpcRequestCallback;
    testSignAndSendTransactions: TRpcRequestCallback;
  };
  // elrondRpc: {
  //   testSignMessage: TRpcRequestCallback;
  //   testSignTransaction: TRpcRequestCallback;
  //   testSignTransactions: TRpcRequestCallback;
  // };
  // tronRpc: {
  //   testSignMessage: TRpcRequestCallback;
  //   testSignTransaction: TRpcRequestCallback;
  // };
  tezosRpc: {
    testGetAccounts: TRpcRequestCallback;
    testSignMessage: TRpcRequestCallback;
    testSignTransaction: TRpcRequestCallback;
  };
  rpcResult?: IFormattedRpcResponse | null;
  isRpcRequestPending: boolean;
  isTestnet: boolean;
  setIsTestnet: (isTestnet: boolean) => void;
}

/**
 * Context
 */
export const JsonRpcContext = React.createContext<JsonRpcInterface>({} as JsonRpcInterface);
