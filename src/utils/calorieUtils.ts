export async function getChickenAndRiceCalories(foodItem: string): Promise<string> {
  const apiUrl = 'http://localhost:3000/api/get-calories';

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