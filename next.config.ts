import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [{ hostname: "u9a6wmr3as.ufs.sh" }], //assegurando que o host das imagens serão permitidos serem carregados
  },
};

export default nextConfig;
