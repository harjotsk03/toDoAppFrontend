import React, { useState } from 'react';
import { StyleSheet, View, Button, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Alert } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { Link, Tabs } from 'expo-router';
import { Pressable } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import { LogIn } from '@/components/LogIn';
import { CheckBox } from '@rneui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { MainTabLayoutProps } from '@/app/types';
import TabOneScreen from '@/app/(tabs)';
import { useNavigation } from '@react-navigation/native'; 




const MainTabLayout: React.FC<MainTabLayoutProps> = ({ loggedIn, loggingOut }) => {
  const navigation = useNavigation(); // Initialize navigation

  const logOut = async () => {
    try {
      // Remove the token from AsyncStorage
      await AsyncStorage.removeItem('token');
      loggingOut();
      Alert.alert('Logout Successful', 'You have been logged out.');
    } catch (error: any) {
      // Handle any errors that occur during the logout process
      console.error('Logout Error:', error);
      Alert.alert('Logout Error', 'An unexpected error occurred while logging out. Please try again later.');
    }
  }


  return (
    <>
      {/* <View style={styles.logOutHeader}>
      <TouchableOpacity
        activeOpacity={0.5}
        style={styles.logoutButton}
        onPress={logOut}
      >
        <View style={styles.logoutButtonContent}> 
          <Text style={styles.logOutBtnText}>Log Out</Text>
          <Feather name="log-out" size={15} color="black" />
        </View>
      </TouchableOpacity>
      </View> */}
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: '#ffffff',
          tabBarStyle: {
          paddingTop: 10,
          backgroundColor: '#0f2138',
          },
          tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: "400",
          marginTop: 0
          },
          }}
        >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Tasks',
            headerShown: false,
            tabBarShowLabel: false,
            tabBarIcon: ({ color }) => <Entypo name="home" size={24} color={color} />,
          }}
        />
        <Tabs.Screen
          name="three"
          options={{
            headerShown: false,
            title: 'Completed',
            tabBarShowLabel: false,
            tabBarIcon: ({ color }) => <Feather name="check-circle" size={24} color={color} />,
          }}
        />
        <Tabs.Screen
          name="four"
          options={{
            title: 'New Task',
            headerShown: false,
            tabBarShowLabel: false,
            tabBarIcon: ({ color }) => <Feather name="plus-circle" size={24} color={color} />,
          }}
        />
        <Tabs.Screen
          name="two"
          options={{
            title: 'Account',
            tabBarShowLabel: false,
            headerShown: false,
            tabBarIcon: ({ color }) => <Feather name="user" size={24} color={color} />,
          }}
        />
      </Tabs>
    </>
  );
};


const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1, // Make sure the content can grow to fill the container
  },
  container: {
    flex: 1,
    backgroundColor: "#EA6D53",
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 20 // Add padding to the bottom if needed
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: "#ffffff",
    marginTop: 50,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  logOutHeader: {
    paddingTop: 90,
    paddingBottom: 20,
    paddingLeft: 40,
    backgroundColor: "white",
  },
  logoutButton: {
    position: 'absolute', // Position the button absolutely
    top: 60, // Adjust as needed
    right: 20, // Adjust as needed
    backgroundColor: "transparent",
    padding: 8,
    borderRadius: 7,
  },
  logoutButtonContent: {
    flexDirection: 'row',
    alignItems: 'center', 
    gap: 5
  },
  logOutBtnText: {
    fontSize: 12,
    color: "black",
  },
  newScreenButton: {
    backgroundColor: '#1B2631',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  newScreenButtonText: {
    color: '#ffffff',
  },
});

export default MainTabLayout;
