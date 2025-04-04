module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    '@react-native-community',
    'prettier',
  ],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react-native/no-inline-styles': 'warn',
  },
};
