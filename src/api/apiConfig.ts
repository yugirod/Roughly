import Constants from 'expo-constants';

interface ApiConfig {
  baseUrl: string;
  timeout: number;
}

const getEnvironment = (): 'development' | 'staging' | 'production' => {
  try {
    const constAny = Constants as any;
    
    let releaseChannel: string | undefined;
    
    if (constAny.expoConfig) {
      releaseChannel = constAny.expoConfig.releaseChannel;
    } else if (constAny.manifest) {
      releaseChannel = constAny.manifest.releaseChannel;
    } else {
      releaseChannel = constAny.releaseChannel;
    }
    
    if (releaseChannel === 'production') {
      return 'production';
    } else if (releaseChannel === 'staging') {
      return 'staging';
    }
    
    if (process.env.NODE_ENV === 'production') {
      return 'production';
    }
    
    return 'development';
  } catch (error) {
    console.warn('Error determining environment:', error);
    return 'development';
  }
};

const apiConfigs: Record<'development' | 'staging' | 'production', ApiConfig> = {
  development: {
    baseUrl: 'http://localhost:3000',
    timeout: 10000,
  },
  staging: {
    baseUrl: 'https://staging-api.roughlyapp.com',
    timeout: 15000,
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