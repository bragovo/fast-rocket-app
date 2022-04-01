// Snowpack Configuration File
// See all supported options: https://www.snowpack.dev/reference/configuration

/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    public: '/',
    src: '/dist',
  },
  plugins: [
    ['@snowpack/plugin-dotenv', '@snowpack/plugin-typescript']
  ],
  packageOptions: {
    /* ... */
  },
  devOptions: {
    open: "none"
  },
  buildOptions: {
    /* ... */
  },
  routes: [
    {
      match: "routes",
      src: ".*",
      dest: "/"
    }
  ]
};
