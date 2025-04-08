import { StyleSheet, TextInput, View, KeyboardAvoidingView, Platform, Button, ActivityIndicator } from 'react-native';
import { useState } from 'react';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { getCalories } from '../../src/api/calorieService';

export default function HomeScreen() {
  const [foodItem, setFoodItem] = useState('');
  const [submittedFood, setSubmittedFood] = useState('');
  const [calories, setCalories] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!foodItem.trim()) return;
    
    const submittedItem = foodItem.trim();
    setSubmittedFood(submittedItem);
    
    setCalories(null);
    setLoading(true);
    setError(null);
    
    try {
      const calorieCount = await getCalories(submittedItem);
      setCalories(parseInt(calorieCount));
      setError(null);
    } catch (err) {
      setError('Failed to fetch calorie information');
    }
    
    setLoading(false);
  };

  const resetForm = () => {
    setFoodItem('');
    setSubmittedFood('');
    setCalories(null);
    setError(null);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ThemedView style={styles.contentContainer}>
        <ThemedText type="title" style={styles.title}>
          Roughly
        </ThemedText>
        
        <ThemedView style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="What did you eat?"
            placeholderTextColor="#888"
            value={foodItem}
            onChangeText={setFoodItem}
            onSubmitEditing={handleSubmit}
            returnKeyType="done"
            autoCapitalize="none"
          />
        </ThemedView>
        
        <ThemedView style={styles.buttonContainer}>
          <Button 
            title="Get Calories" 
            onPress={handleSubmit} 
            disabled={loading || !foodItem.trim()}
          />
        </ThemedView>
        
        {loading && (
          <ThemedView style={styles.resultContainer}>
            <ActivityIndicator size="small" />
            <ThemedText style={styles.statusText}>Calculating calories...</ThemedText>
          </ThemedView>
        )}
        
        {error && !loading && (
          <ThemedView style={styles.resultContainer}>
            <ThemedText style={styles.errorText}>{error}</ThemedText>
          </ThemedView>
        )}
        
        {calories && !loading && (
          <ThemedView style={styles.resultContainer}>
            <ThemedText style={styles.caloriesText}>
              {submittedFood} contains approximately {calories} calories
            </ThemedText>
            <Button title="Reset" onPress={resetForm} />
          </ThemedView>
        )}
        
        {!calories && !loading && !error && (
          <ThemedText style={styles.helperText}>
            Type any food to begin tracking your calories
          </ThemedText>
        )}
      </ThemedView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    marginBottom: 40,
    fontSize: 28,
    textAlign: 'center',
  },
  inputContainer: {
    width: '100%',
    maxWidth: 400,
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    color: '#333',
  },
  buttonContainer: {
    marginBottom: 20,
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
  },
  resultContainer: {
    alignItems: 'center',
    marginTop: 20,
    padding: 15,
    borderRadius: 8,
    width: '100%',
    maxWidth: 400,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  caloriesText: {
    fontSize: 16,
    marginBottom: 15,
    textAlign: 'center',
  },
  statusText: {
    marginTop: 10,
  },
  errorText: {
    color: '#e53935',
    marginBottom: 10,
  },
  helperText: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
  },
});