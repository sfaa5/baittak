import type {NextConfig} from 'next'
import createNextIntlPlugin from 'next-intl/plugin';

// Specify the path to the request file
const withNextIntl = createNextIntlPlugin();


const nextConfig:NextConfig = {};

export default withNextIntl(nextConfig);


// next.config.js
module.exports = {
    typescript: {
      ignoreBuildErrors: true,
    },
  };
  