import { ReactElement } from 'react';
import { WalletLogoProps } from '@subwallet/wallet-connect/types';
// import jwt_decode from 'jwt-decode';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
const Google: (name?: string, logo?: WalletLogoProps) => ReactElement = (name, logo) => {

    const login = useGoogleLogin({
        onSuccess: async codeResponse => {
            const userInfo = await axios.get(
                "https://www.googleapis.com/oauth2/v3/userinfo",
                {
                    headers: { Authorization: `Bearer ${codeResponse.access_token}` },
                }
            );
            console.log({ codeResponse, userInfo })
        },
        // onSuccess: code => console.log(code),
        // flow: 'auth-code',
    });

    return (
        <div
            className={'wallet-item'}
            key={name}
            onClick={() => login()}
        >
            <div>
                <img
                    alt={logo?.alt}
                    className={'wallet-logo'}
                    src={logo?.src}
                />
            </div>
            <div className={'wallet-title'}>
                {name}
            </div>

        </div>
    )



};

export default Google;