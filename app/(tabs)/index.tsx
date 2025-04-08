import { StyleSheet, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { useState } from 'react';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  const [foodItem, setFoodItem] = useState('');

  const handleSubmit = () => {
    // Logic to handle food item submission
    console.log('Food item submitted:', foodItem);
    // Here you would call your AI calorie counting function
    
    // Clear the input after submission
    setFoodItem('');
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
        
        <ThemedText style={styles.helperText}>
          Type any food to being tracking your calories
        </ThemedText>
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
  helperText: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
  },
});