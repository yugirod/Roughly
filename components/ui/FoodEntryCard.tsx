import { useState } from 'react';
import { StyleSheet, TouchableOpacity, Image, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

type FoodEntryCardProps = {
  foodName: string;
  calories: number;
  timestamp?: Date; // Optional timestamp, defaults to current time if not provided
  onDelete?: () => void;
};

export function FoodEntryCard({ 
  foodName, 
  calories, 
  timestamp = new Date(), 
  onDelete 
}: FoodEntryCardProps) {
  const [foodImage, setFoodImage] = useState<string | null>(null);
  const theme = useColorScheme() ?? 'light';

  // Format the date and time for display
  const formatDate = (date: Date): string => {
    return date.toLocaleDateString(undefined, { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString(undefined, { 
      hour: '2-digit', 
      minute: '2-digit'
    });
  };

  const pickImage = async () => {
    // Ask for permission to access the camera roll
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to upload an image!');
      return;
    }

    // Launch the image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setFoodImage(result.assets[0].uri);
    }
  };

  return (
    <ThemedView style={styles.card}>
      <View style={styles.headerContainer}>
        <ThemedText type="defaultSemiBold" style={styles.foodName}>
          {foodName}
        </ThemedText>
        
        {onDelete && (
          <TouchableOpacity onPress={onDelete} activeOpacity={0.7}>
            <IconSymbol
              name="xmark"
              size={18}
              weight="medium"
              color={theme === 'light' ? Colors.light.icon : Colors.dark.icon}
            />
          </TouchableOpacity>
        )}
      </View>

      <ThemedText style={styles.calories}>{calories} calories</ThemedText>
      
      <View style={styles.datetimeContainer}>
  <IconSymbol
    name="clock"
    size={14}
    weight="medium"
    color={theme === 'light' ? Colors.light.icon : Colors.dark.icon}
  />
  <ThemedText style={styles.datetime}>
    {formatDate(timestamp)} at {formatTime(timestamp)}
  </ThemedText>
</View>

      {foodImage ? (
        <View style={styles.imageContainer}>
          <Image source={{ uri: foodImage }} style={styles.foodImage} />
          <TouchableOpacity style={styles.changeImageButton} onPress={pickImage} activeOpacity={0.7}>
            <ThemedText style={styles.changeImageText}>Change Image</ThemedText>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity style={styles.addImageButton} onPress={pickImage} activeOpacity={0.7}>
          <IconSymbol
            name="camera"
            size={22}
            weight="medium"
            color={theme === 'light' ? Colors.light.icon : Colors.dark.icon}
          />
          <ThemedText>Add Photo</ThemedText>
        </TouchableOpacity>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 12,
    marginVertical: 12,
    marginHorizontal: 2,
    borderWidth: 1,
    borderColor: '#444',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  foodName: {
    fontSize: 18,
  },
  calories: {
    fontSize: 16,
    marginBottom: 4,
  },
  datetimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 4,
  },
  datetime: {
    fontSize: 14,
    color: '#888',
  },
  imageContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 8,
  },
  foodImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
  },
  addImageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#ccc',
    marginTop: 8,
    gap: 8,
  },
  changeImageButton: {
    marginTop: 8,
    padding: 8,
    borderRadius: 6,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  changeImageText: {
    fontSize: 14,
  }
});
