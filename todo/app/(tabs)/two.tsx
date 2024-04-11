import { StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Text, View } from '@/components/Themed';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TabTwoScreen() {
  const [name, setName] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    getUserInfo();
  }, []);

  const getUserInfo = async () => {
    try {
      const storedName = await AsyncStorage.getItem('name');
      const storedEmail = await AsyncStorage.getItem('email');
      if (storedName) {
        setName(storedName);
      }
      if (storedEmail){
        setEmail(storedEmail)
      }
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.userInfo}>Name: {name ? name : 'Guest'}</Text>
      <Text style={styles.userInfo}>Email: {email ? email : 'No Email'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1, // Make sure the content can grow to fill the container
  },
  container: {
    flex: 1,
    backgroundColor: "#283747",
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 20 // Add padding to the bottom if needed
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: "#ffffff",
    marginTop: 30,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  userInfo: {
    fontSize: 16,
    color: "#ffffff",
  },
});
