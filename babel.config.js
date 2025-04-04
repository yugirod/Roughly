module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          extensions: ['.ios.js', '.android.js', '.js', '.json'],
          alias: {
            '@components': './src/components',
            '@screens': './src/screens',
            '@navigation': './src/navigation',
            '@utils': './src/utils',
            '@hooks': './src/hooks',
            '@api': './src/api',
            '@assets': './src/assets',
            '@theme': './src/theme',
            '@state': './src/state',
          },
        },
      ],
    ],
  };
};
