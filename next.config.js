/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    i18n: {
        locales: ['am', 'en', 'ru'],
        defaultLocale: 'am',
        localeDetection: false,
    },
}

module.exports = nextConfig
