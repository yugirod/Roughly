export async function getChickenAndRiceCalories(foodItem: string): Promise<string> {
    try {
      const response = await fetch('http://localhost:3000/api/get-calories', {
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