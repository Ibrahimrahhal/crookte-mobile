module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        "module-resolver",
        {
          alias: {
            // This needs to be mirrored in tsconfig.json
            "home": "./src",
            "assets": "./assets",
            "configs": "./configs",
          },
        },
      ],
    ],
  };
};
