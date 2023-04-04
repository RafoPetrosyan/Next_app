/** @type {import('next').NextConfig} */
const {locales} = require('constants/index');

const nextConfig = {
    reactStrictMode: false,
    i18n: {
        locales,
        defaultLocale: 'am',
        localeDetection: false,
    },
}

module.exports = nextConfig
