// Copyright 2019-2022 @subwallet/wallet-connect authors & contributors
// SPDX-License-Identifier: Apache-2.0

import {  WalletConnectInfo } from '@subwallet/wallet-connect/types';


// @ts-ignore
import WalletConnectLogo from './WalletConnectLogo.svg';

export const PREDEFINED_WALLET_CONNECT: WalletConnectInfo[] = [
  {
    name: 'WalletConnect',
    logo: {
      src: WalletConnectLogo as string,
      alt: 'WalletConnect'
    },
  }
];
