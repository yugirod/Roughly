import { ExpoConfig } from 'expo/config';

module.exports = ({ config }: { config: ExpoConfig }) => {
    return {
      ...config,
      extra: {
        APP_ENV: process.env.APP_ENV || 'development',
      },
    };
  }; 