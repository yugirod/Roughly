// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: ['expo', 'plugin:jest/recommended'],
  ignorePatterns: ['/dist/*'],
  env: {
    'jest/globals': true,
    node: true,
    browser: true,
    jest: true
  },
  plugins: ['jest'],
  rules: {
    'no-unused-vars': 'warn',
    'react/react-in-jsx-scope': 'off'
  },
  overrides: [{
    files: ['**/*.test.js', '**/*.test.tsx', '**/*.test.ts'],
    env: {
      jest: true
    }
  }]
};
