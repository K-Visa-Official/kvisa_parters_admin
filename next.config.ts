import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['kvisa-partners.s3.amazonaws.com', 'kvisa-partners.s3.ap-northeast-2.amazonaws.com'],
    
  },
  async redirects() {
    return [
      {
        source: '/en',
        destination: '/ko', // 한국어로 리디렉션
        permanent: false,
      },
      {
        source: '/vi',
        destination: '/ko',
        permanent: false,
      },
      {
        source: '/th',
        destination: '/ko',
        permanent: false,
      },
      {
        source: '/si',
        destination: '/ko',
        permanent: false,
      },
      {
        source: '/ne',
        destination: '/ko',
        permanent: false,
      },
      {
        source: '/my',
        destination: '/ko',
        permanent: false,
      },
      {
        source: '/mn',
        destination: '/ko',
        permanent: false,
      },
      {
        source: '/km',
        destination: '/ko',
        permanent: false,
      },
      {
        source: '/id',
        destination: '/ko',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
