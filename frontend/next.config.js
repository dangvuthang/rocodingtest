/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}
module.exports = nextConfig

const removeImports = require("next-remove-imports")();

module.exports = (phase, { defaultConfig }) => {
  return removeImports({
    ...defaultConfig
  });
};
