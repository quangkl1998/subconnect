// Copyright 2019-2022 @subwallet/sub-connect authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { getWallets } from '@subwallet/wallet-connect/dotsama/wallets';
import { getEvmWallets } from '@subwallet/wallet-connect/evm/evmWallets';
import { getSocialWallets } from '@subwallet/wallet-connect/social/socialWallets';
import { getWalletConnects } from '@subwallet/wallet-connect/walletconnect/walletConnect';
import { EvmWallet, SocialWallet, Wallet, WalletConnectInfo } from '@subwallet/wallet-connect/types';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { ClientContext, ModalWalletConnectContext, OpenSelectWallet } from '../contexts';
require('./SelectWallet.scss');

interface Props {
  onSelectWallet: (walletKey: string, walletType?: 'substrate' | 'evm' | 'wallet-connect') => void
}

function SelectWallet({ onSelectWallet }: Props): React.ReactElement<Props> {
  const dotsamaWallets = getWallets();
  const evmWallets = getEvmWallets();
  const socialWallets = getSocialWallets();
  const walletConnects = getWalletConnects();


  const { client, pairings, connect, } = useContext(ClientContext);

  const openSelectWalletContext = useContext(OpenSelectWallet);
  const openRequestModal = useContext(ModalWalletConnectContext);

  const onClickDotsamaWallet = useCallback(
    (wallet: Wallet | EvmWallet) => {
      return () => {
        if (wallet.installed) {
          onSelectWallet(wallet.extensionName);
        }
      };
    },
    [onSelectWallet]
  );

  const onClickEvmWallet = useCallback(
    (wallet: Wallet | EvmWallet) => {
      return () => {
        if (wallet.installed) {
          onSelectWallet(wallet.extensionName, 'evm');
        }
      };
    },
    [onSelectWallet]
  );

  const onClickWalletConnect = useCallback(
    (wallet: WalletConnectInfo) => {

      return () => {
        openSelectWalletContext.close();
        if (typeof client === "undefined") {
          throw new Error("WalletConnect is not initialized");
        }
        // Suggest existing pairings (if any).
        if (pairings?.length) {
          openRequestModal.setModalInfo('pairing');
        } else {
          // If no existing pairings are available, trigger `WalletConnectClient.connect`.
          connect();
        }
        onSelectWallet('', 'wallet-connect');
      };
    },
    [onSelectWallet]
  );

  const walletItem: (wallet: Wallet | EvmWallet, onSelect: (wallet: Wallet | EvmWallet) => () => void) => React.ReactElement = (wallet, onSelect) => (
    <div
      className={'wallet-item'}
      key={wallet.extensionName}
      onClick={onSelect(wallet)}
      id="with-google"
    >
      <div>
        <img
          alt={wallet.logo?.alt}
          className={'wallet-logo'}
          src={wallet.logo?.src}
        />
      </div>
      <div className={'wallet-title'}>
        {wallet.title}
      </div>
      <div className={'wallet-install'}>
        {wallet.installed
          ? ''
          : (<a
            href={wallet.installUrl}
            rel='noreferrer'
            target='_blank'
          >
            Install
          </a>)}
      </div>
    </div>
  );

  const walletConnectItem: (wallet: WalletConnectInfo, onSelect: (wallet: WalletConnectInfo) => () => void) => React.ReactElement = (wallet, onSelect) => (
    <div
      className={'wallet-item'}
      key={wallet.name}
      onClick={onSelect(wallet)}
    >
      <div>
        <img
          alt={wallet.logo?.alt}
          className={'wallet-logo'}
          src={wallet.logo?.src}
        />
      </div>
      <div className={'wallet-title'}>
        {wallet.name}
      </div>

    </div>
  );

  return <div className={'select-wallet-wrapper'}>
    <div className={'select-wallet-content'}>
      <div className='dotsama-wallet-list'>
        <div className='wallet-cat-title'>
          Social Wallets
        </div>
        {socialWallets.map((wallet) => (wallet.renderElement()))}
      </div>
      <div className='dotsama-wallet-list'>
        <div className='wallet-cat-title'>
          Dotsama Wallets
        </div>
        {dotsamaWallets.map((wallet) => (walletItem(wallet, onClickDotsamaWallet)))}
      </div>
      <div className='evm-wallet-list'>
        <div className='wallet-cat-title'>
          EVM Wallets
        </div>
        {evmWallets.map((wallet) => (walletItem(wallet, onClickEvmWallet)))}
      </div>
      <div style={{ height: '36px' }}></div>
      <div className='evm-wallet-list'>
        <div className='wallet-cat-title'>
          Wallet Connect
        </div>
        {walletConnects.map((wallet) => (walletConnectItem(wallet, onClickWalletConnect)))}

      </div>
    </div>
  </div>;
}

export default SelectWallet;
