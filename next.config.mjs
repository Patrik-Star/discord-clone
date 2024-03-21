/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        // domains: ["utfs.io"] - deprecated
        remotePatterns: [
            {
                protocol: "https",
                hostname: "utfs.io",
            },
        ]
    }
};

export default nextConfig;
