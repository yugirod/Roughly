import Constants from 'expo-constants';

interface ApiConfig {
  baseUrl: string;
  timeout: number;
}

const getEnvironment = (): 'development' | 'production' => {
  const env = Constants.expoConfig?.extra?.APP_ENV || 'development';
  return env === 'production' ? 'production' : 'development';
};

const apiConfigs: Record<'development' | 'production', ApiConfig> = {
  development: {
    baseUrl: 'http://localhost:3000',
    timeout: 10000,
  },
  production: {
    baseUrl: 'https://api.roughlyapp.com',
    timeout: 15000,
  },
};

export const getCurrentApiConfig = (): ApiConfig => {
  const environment = getEnvironment();
  console.log('Current environment:', environment);
  return apiConfigs[environment];
};

export const API_BASE_URL = getCurrentApiConfig().baseUrl;
export const API_TIMEOUT = getCurrentApiConfig().timeout;