/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = () => {
  const rewrites = () => {
    return [
      {
        source: "/api/:path*",
        destination: "http://127.0.0.1:5000/:path*",
      },
    ];
  };
  return {
    rewrites,
  };
};
