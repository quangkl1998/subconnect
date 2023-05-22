import { PREDEFINED_SOCIAL_WALLETS } from "@subwallet/wallet-connect/social/predefinedWallet";
import { SocialWallet, SocialWalletInfo } from "@subwallet/wallet-connect/types";
import { BaseSocialWallet } from "./BaseSocialWallet";

const socialWallets: SocialWallet[] = []

export function addSocialWallet(data: SocialWalletInfo) {
    const wallet = (new BaseSocialWallet(data)) as SocialWallet;

    socialWallets.push(wallet);
}

PREDEFINED_SOCIAL_WALLETS.forEach((data) => {
    socialWallets.push(new BaseSocialWallet(data));
});

export function getSocialWallets() {
    return socialWallets;
}