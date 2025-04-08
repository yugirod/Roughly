const { FlatCompat } = require('@eslint/eslintrc');
const compat = new FlatCompat();

module.exports = [
  ...compat.extends('expo'),
  
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    
    rules: {
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
      'no-unused-vars': 'warn',
    },
  },
  
  {
    ignores: [
      'node_modules/',
      'dist/',
      '.expo/',
      'web-build/',
    ],
  },
];