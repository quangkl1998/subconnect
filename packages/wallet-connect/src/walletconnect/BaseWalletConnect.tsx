import {   WalletConnectInfo, WalletLogoProps } from "../types";
export class BaseWalletConnect implements WalletConnectInfo {
    name = '';
    logo: WalletLogoProps;

    constructor({ logo, name }: WalletConnectInfo) {
        this.name = name;
        this.logo = logo;
    }
}