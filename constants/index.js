export const API_HOST = process.env.NEXT_PUBLIC_API_HOST || 'http://localhost:3000';
export const BASE_URL = `${API_HOST}/api`;
export const SOURCE_URL = `https://tapi.fractal.am`
export const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '';
export const FACEBOOK_APP_ID = process.env.NEXT_PUBLIC_FACEBOOK_APP_ID || '';

export const momentLocales = {
    am: 'hy-am',
    en: 'en-gb',
    ru: 'ru',
}
