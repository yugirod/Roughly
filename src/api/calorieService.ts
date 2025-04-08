import { apiClient, ApiError } from './apiClient';

interface CalorieRequest {
  food: string;
}

interface CalorieResponse {
  calories: string;
}

export class CalorieService {
  private static instance: CalorieService;
  private readonly ENDPOINT = 'api/get-calories';
  
  private constructor() {}
  
  public static getInstance(): CalorieService {
    if (!CalorieService.instance) {
      CalorieService.instance = new CalorieService();
    }
    return CalorieService.instance;
  }
  
  /**
   * Get calories for a food item
   * @param foodItem user input
   * @returns A promise resolving to the calorie information
   */
  public async getCalories(foodItem: string): Promise<string> {
    try {
      const requestData: CalorieRequest = { food: foodItem };
      const response = await apiClient.post<CalorieResponse, CalorieRequest>(
        this.ENDPOINT,
        requestData
      );
      
      return response.data.calories;
    } catch (error) {
      const apiError = error as ApiError;
      
      if (apiError.isTimeout) {
        throw new Error('The calorie service request timed out. Please try again.');
      }
      
      if (apiError.isNetworkError) {
        throw new Error('Network error. Please check your connection and try again.');
      }
      
      if (apiError.status === 404) {
        throw new Error('The calorie information could not be found.');
      }
      
      if (apiError.status === 429) {
        throw new Error('Too many requests. Please try again later.');
      }
      
      if (apiError.status && apiError.status >= 500) {
        throw new Error('The calorie service is currently unavailable. Please try again later.');
      }
      
      throw new Error(apiError.message || 'Failed to get calorie information');
    }
  }
}

export const calorieService = CalorieService.getInstance();

export async function getCalories(foodItem: string): Promise<string> {
  return calorieService.getCalories(foodItem);
}