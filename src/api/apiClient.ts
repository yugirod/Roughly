import { API_BASE_URL, API_TIMEOUT } from './apiConfig';

export interface ApiResponse<T> {
  data: T;
  status: number;
}

export interface ApiError {
  message: string;
  status?: number;
  isTimeout?: boolean;
  isNetworkError?: boolean;
}

class ApiClient {
  private baseUrl: string;
  private timeout: number;

  constructor(baseUrl: string, timeout: number) {
    this.baseUrl = baseUrl;
    this.timeout = timeout;
  }

  private getFullUrl(endpoint: string): string {
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
    return `${this.baseUrl}/${cleanEndpoint}`;
  }

  private async fetchWithTimeout<T>(
    url: string, 
    options: RequestInit,
  ): Promise<ApiResponse<T>> {
    const controller = new AbortController();
    const { signal } = controller;
    
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);
    
    try {
      const response = await fetch(url, {
        ...options,
        signal,
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        const errorBody = await response.text();
        let errorMessage = `Request failed with status ${response.status}`;
        
        try {
          const errorJson = JSON.parse(errorBody);
          if (errorJson.message) {
            errorMessage = errorJson.message;
          }
        } catch (e) {
          if (errorBody) {
            errorMessage = errorBody;
          }
        }
        
        throw {
          message: errorMessage,
          status: response.status,
        };
      }
      
      const data = await response.json();
      
      return {
        data,
        status: response.status,
      };
    } catch (error) {
      clearTimeout(timeoutId);
      
      if (error instanceof Error && error.name === 'AbortError') {
        throw {
          message: 'Request timed out',
          isTimeout: true,
        };
      }
      
      if (error instanceof Error && error.message && error.message.includes('Network request failed')) {
        throw {
          message: 'Network error. Please check your connection.',
          isNetworkError: true,
        };
      }
      
      throw error;
    }
  }

  async get<T>(endpoint: string, headers: Record<string, string> = {}): Promise<ApiResponse<T>> {
    const url = this.getFullUrl(endpoint);
    
    return this.fetchWithTimeout<T>(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    });
  }

  async post<T, D = any>(
    endpoint: string, 
    data: D, 
    headers: Record<string, string> = {},
  ): Promise<ApiResponse<T>> {
    const url = this.getFullUrl(endpoint);
    
    return this.fetchWithTimeout<T>(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: JSON.stringify(data),
    });
  }

}

export const apiClient = new ApiClient(API_BASE_URL, API_TIMEOUT);