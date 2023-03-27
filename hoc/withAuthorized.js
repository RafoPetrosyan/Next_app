import {useEffect, useState} from "react";
import Router from 'next/router';
import {isEmpty} from "lodash";
import cookies from "next-cookies";
import Cookies from "../utils/cookies";

const withAuthorized = (Component) => {
    const WithAuthorized = (props) => {
        const [authorized, setAuthorized] = useState(false);

        useEffect(() => {
            (async () => {
                if (!isEmpty(Cookies.getCookie('currentUser'))) {
                    setAuthorized(true);
                    return;
                }
                await Router.replace('/');
            })()
        }, [])

        return authorized && <Component {...props} />;
    }

    WithAuthorized.getInitialProps = async (ctx) => {
        const {currentUser} = cookies(ctx);
        if (!isEmpty(currentUser) || !isEmpty(ctx.store.getState().users.currentUser)) {
            return {...await Component.getInitialProps(ctx)};
        }
        return {}
    }

    return WithAuthorized;
}

export default withAuthorized;
