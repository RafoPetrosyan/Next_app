/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
    reactStrictMode: false,
    i18n: {
        locales: ['am', 'en', 'ru'],
        defaultLocale: 'am',
        localeDetection: false,
    },
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    },
}

module.exports = nextConfig
