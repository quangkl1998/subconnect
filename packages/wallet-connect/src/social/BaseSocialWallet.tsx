import { SocialWallet, SocialWalletInfo, WalletLogoProps } from "../types";
export class BaseSocialWallet implements SocialWallet {
    name = '';
    logo: WalletLogoProps;
    render(props: object): JSX.Element {
        return <></>
    }
    constructor({ logo, name, render }: SocialWalletInfo) {
        this.name = name;
        this.logo = logo;
        this.render = render;
    }

    renderElement(): JSX.Element {
        return this.render({ name: this.name, logo: this.logo })
    }
}