import {   WalletConnectInfo} from "@subwallet/wallet-connect/types";
import { BaseWalletConnect } from "./BaseWalletConnect";
import { PREDEFINED_WALLET_CONNECT } from "./predefinedWallet";

const walletConnects: WalletConnectInfo[] = []

export function addSocialWallet(data: WalletConnectInfo) {
    const wallet = (new BaseWalletConnect(data) as WalletConnectInfo);

    walletConnects.push(wallet);
}

PREDEFINED_WALLET_CONNECT.forEach((data) => {
    walletConnects.push(new BaseWalletConnect(data));
});

export function getWalletConnects() {
    return walletConnects;
}