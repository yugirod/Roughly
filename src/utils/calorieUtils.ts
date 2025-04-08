export async function getChickenAndRiceCalories(foodItem: string): Promise<string> {
  if (!process.env.LOCAL_API_URL) {
    throw new Error('API_URL is not defined');
  }
  const apiUrl = process.env.LOCAL_API_URL;

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ food: foodItem }),
      });
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      
      const data = await response.json();
      return data.calories;
    } catch (error) {
      console.error("Error getting calorie count:", error);
      throw error;
    }
  }