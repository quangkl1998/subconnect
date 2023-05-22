import { SocialWalletInfo } from '@subwallet/wallet-connect/types';

import GoogleLogo from './GoogleIcon.svg';
import Google from './Google';

export const PREDEFINED_SOCIAL_WALLETS: SocialWalletInfo[] = [
    {
        name: "Login with Google",
        logo: {
            src: GoogleLogo as string,
            alt: 'Google Icon'
        },
        render(props: object): JSX.Element {
            return Google(props.name, props.logo)

        },
    }
]