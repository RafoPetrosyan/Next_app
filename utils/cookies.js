import serverCookie from 'cookie';
import clientCookie from 'component-cookie';
import {isEmpty} from "lodash";

class Cookies {
    static setCookie = (ctx, name, value, remember= true, options = {}) => {
        options.httpOnly = true;
        options.secure = true;
        options.path = '/';
        options.sameSite = true;
        options.samesite = true;
        if(remember) {
            options.maxAge = 1000 * 24 * 60 * 60;
            options.maxage = 1000 * 24 * 60 * 60;
        }
        const data = JSON.stringify(value);
        if (ctx && typeof window === 'undefined') {
            ctx.res.setHeader('Set-Cookie', serverCookie.serialize(name, data, options));
        } else {
            clientCookie(name, data, options);
        }
    };

    static getCookie = (name) => {
       const data = clientCookie(name);
       if(!isEmpty(data)) return JSON.parse(data);
       return null;
    }

    static removeCookie = (ctx, name, options = { path: '/' }) => {
        if (ctx && typeof window === 'undefined') {
            if (ctx.res.finished) return;

            const setCookieHeader = ctx.res.getHeader('Set-Cookie') || [];

            ctx.res.setHeader('Set-Cookie', [
                ...setCookieHeader,
                serverCookie.serialize(name, '', { expires: new Date(), ...options }),
            ]);
        } else {
            clientCookie(name, null, options);
        }
    };
}

export default Cookies;
