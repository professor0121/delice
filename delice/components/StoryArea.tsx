import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen() {
  const [accountType, setAccountType] = useState<string | null>(null);

  useEffect(() => {
    const fetchAccountType = async () => {
      const value = await AsyncStorage.getItem('accountType');
      setAccountType(value);
    };
    fetchAccountType();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={{ marginTop: 20 }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ paddingLeft: 10 }}>
          {/* Your Story */}
          <View style={styles.storyItem}>
            <View style={[styles.storyCircle, { borderColor: '#007AFF' }]}>
              <Text style={styles.storyEmoji}>👤</Text>
            </View>
            <Text style={styles.storyText}>Your Story</Text>
          </View>

          {/* Other Stories */}
          {Array.from({ length: 8 }).map((_, i) => (
            <View key={i} style={styles.storyItem}>
              <View
                style={[
                  styles.storyCircle,
                  { borderColor: i === 0 ? '#007AFF' : '#aaa' },
                ]}
              >
                <Text style={styles.storyEmoji}>{i === 0 ? '🟦' : '👤'}</Text>
              </View>
              <Text style={styles.storyText}>Story {i + 1}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  storyItem: {
    width: 60,
    alignItems: 'center',
    marginRight: 12,
  },
  storyCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#ddd',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  storyEmoji: {
    fontSize: 24,
    color: '#555',
  },
  storyText: {
    marginTop: 4,
    fontSize: 12,
    color: '#777',
  },
});
