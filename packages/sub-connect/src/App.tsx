// Copyright 2019-2022 @subwallet/sub-connect authors & contributors
// SPDX-License-Identifier: Apache-2.0

import EvmWalletInfo from '@subwallet/sub-connect/pages/EvmWalletInfo';
import { WalletContextProvider } from '@subwallet/sub-connect/providers/WalletContextProvider';
import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';

import Layout from './components/Layout';
import Welcome from './components/Welcome';
import WalletInfo from './pages/WalletInfo';

import { GoogleOAuthProvider } from '@react-oauth/google';
import { ClientContextProvider } from './providers/ClientContextProvider';
import WalletConnectInfo from './pages/WalletConnectInfo';
import { JsonRpcContextProvider } from './providers/JsonRpcContextProvider';
import { ChainDataContextProvider } from './providers/ChainDataContextProvider';

require('./App.scss');

// Add new example wallet
// doAddWallet();

export function App() {
  return (
    <GoogleOAuthProvider clientId="548599734299-t3tj8jfnkmllr50sm86mrcieu460m93j.apps.googleusercontent.com">

      <WalletContextProvider>
        <ClientContextProvider>
          <ChainDataContextProvider>
            <JsonRpcContextProvider>
              <HashRouter>
                <Routes>
                  <Route
                    element={<Layout />}
                    path='/'
                  >
                    <Route
                      element={<Welcome />}
                      index
                    />
                    <Route
                      element={<Welcome />}
                      path='/welcome'
                    />
                    <Route
                      element={<WalletInfo />}
                      path='/wallet-info'
                    />
                    <Route
                      element={<EvmWalletInfo />}
                      path='/evm-wallet-info'
                    />
                    <Route
                      element={<WalletConnectInfo />}
                      path='/wallet-connect-info'
                    />
                  </Route>
                </Routes>
              </HashRouter>
            </JsonRpcContextProvider>
          </ChainDataContextProvider>
        </ClientContextProvider>
      </WalletContextProvider>
    </GoogleOAuthProvider>

  );
}
