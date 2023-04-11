import React, {useState} from 'react';
import {LoginSocialGoogle, LoginSocialFacebook} from 'reactjs-social-login';
import {FacebookLoginButton, GoogleLoginButton} from 'react-social-login-buttons';
import {FACEBOOK_APP_ID, GOOGLE_CLIENT_ID} from "../../../constants";
import axios from "axios";

const SocialLogin = () => {
    const [profile, setProfile] = useState(null);
    const [provider, setProvider] = useState('');
    console.log(profile, 777)
    console.log(provider, 88888)

    const onResolve = (data) => {
        console.log(data, 8888)
    }


    return (
        <div>
            <LoginSocialGoogle
                // isOnlyGetToken
                client_id={GOOGLE_CLIENT_ID}
                // onSuccess={responseGoogle}
                onResolve={({ provider, data }) => {
                    setProvider(provider)
                    onResolve(data)
                }}
                onReject={(err) => {
                    console.log(err)
                }}
            >
                <GoogleLoginButton />
            </LoginSocialGoogle>
            <LoginSocialFacebook
                isOnlyGetToken
                appId={FACEBOOK_APP_ID}
                onResolve={({ provider, data }) => {
                    setProvider(provider)

                    onResolve(data)
                }}
                onReject={(err) => {
                    console.log(err)
                }}
            >
                <FacebookLoginButton />
            </LoginSocialFacebook>
        </div>
    );
};

export default SocialLogin;
