import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Button, Text, TextInput, TouchableOpacity, KeyboardAvoidingView,Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import MainTabLayout from '@/components/MainLayout';
require('dotenv').config();

const apiCallURL = process.env.apiCallURL;

const LoginScreen: React.FC<{ onLogin: (isLoggedIn: boolean) => void }> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nameSignup, setNameSignup] = useState('');
  const [emailSignup, setEmailSignup] = useState('');
  const [passwordSignup, setPasswordSignup] = useState('');
  const [passwordConfirmSignup, setPasswordConfirmSignup] = useState('');
  const [signingUp, setSigningUp] = useState(false);


  const handleLogin = async () => {
    try {
      const response = await axios.post(`${apiCallURL}/users/login`, {
        email: email,
        password: password
      });
      
      const token: string = response.data.token;

      const userName: string = response.data.user.name;

      const userEmail: string = response.data.user.email;
      
      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('name', userName);
      await AsyncStorage.setItem('email', userEmail);

      Alert.alert('Login Successful', 'You are now logged in.');
      onLogin(true);

    } catch (error: any) {
      if (error.response) {
        Alert.alert('Error', error.response.data.message);
      } else if (error.request) {
        Alert.alert('Error', 'No response received from server. Please try again later.');
      } else {
        Alert.alert('Error', 'An unexpected error occurred. Please try again later.');
      }
    }
  };

  const handleSignup = async () => {
    try {
      if (passwordSignup === passwordConfirmSignup) {
        const response = await axios.post(`${apiCallURL}/users/create`, {
          name: nameSignup,
          email: emailSignup,
          password: passwordConfirmSignup
        });
        
        // Assuming your backend sends a response with a message upon successful creation
        if (response.status === 201) {
          // const token = response.data.token;
  
          // await AsyncStorage.setItem('token', token);
  
          Alert.alert('Signup Successful', 'User created successfully.');
          setNameSignup('');
          setEmailSignup('')
          setPasswordSignup('')
          setPasswordConfirmSignup('')
          setSigningUp(false)
        } else {
          Alert.alert('Error', 'Failed to create user. Please try again.');
        }
      } else {
        Alert.alert("Passwords don't match.");
      }
    } catch (error: any) {
      if (error.response) {
        if (error.response.status === 409) {
          Alert.alert('Error', 'User already exists.');
        } else {
          Alert.alert('Error', error.response.data.message);
        }      
      } else if (error.request) {
        Alert.alert('Error', 'No response received from server. Please try again later.');
      } else {
        Alert.alert('Error', 'An unexpected error occurred. Please try again later.');
      }
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      {!signingUp ? (
        <View style={styles.containerInput}>
          <Text style={styles.title}>Log in to your account</Text>
          <Text style={styles.subTitle}>Welcome back. Let's get you caught up!</Text>
          <Text style={styles.inputTitle}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            placeholderTextColor="#999999"
            value={email}
            onChangeText={setEmail}
          />
          <Text style={styles.inputTitle}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="••••••••••"
            secureTextEntry={true}
            placeholderTextColor="#999999"
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            onPress={handleLogin}
            style={styles.button}
            activeOpacity={0.5}
          >
            <Text style={styles.buttonText}>Log In</Text>
          </TouchableOpacity>
          <View style={styles.containerNewAcc}>
            <Text style={styles.accountCreate} >Don't have an account?</Text>
            <TouchableOpacity
            style={styles.signUp}
            activeOpacity={0.5}
            onPress={() => setSigningUp(true)}
          >
            <Text style={styles.buttonTextSignUp}>Sign Up</Text>
          </TouchableOpacity>
          </View>
        </View>
      ):(
        <View style={styles.containerInput}>
          <Text style={styles.title}>Sign up for your account</Text>
          <Text style={styles.subTitle}>Let's get you signed up today!</Text>
          <Text style={styles.inputTitle}>Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            placeholderTextColor="#999999"
            value={nameSignup}
            onChangeText={setNameSignup}
          />
          <Text style={styles.inputTitle}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            placeholderTextColor="#999999"
            value={emailSignup}
            onChangeText={setEmailSignup}
          />
          <Text style={styles.inputTitle}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="••••••••••"
            secureTextEntry={true}
            placeholderTextColor="#999999"
            value={passwordSignup}
            onChangeText={setPasswordSignup}
          />
          <Text style={styles.inputTitle}>Confirm Password</Text>
          <TextInput
            style={styles.input}
            placeholder="••••••••••"
            secureTextEntry={true}
            placeholderTextColor="#999999"
            value={passwordConfirmSignup}
            onChangeText={setPasswordConfirmSignup}
          />
          <TouchableOpacity
            onPress={handleSignup}
            style={styles.button}
            activeOpacity={0.5}
          >
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
          <View style={styles.containerNewAcc}>
            <Text style={styles.accountCreate} >Already have an account?</Text>
            <TouchableOpacity
            style={styles.signUp}
            activeOpacity={0.5}
            onPress={() => setSigningUp(false)}
          >
            <Text style={styles.buttonTextSignUp}>Log In</Text>
          </TouchableOpacity>
          </View>
        </View>
      )}
    </KeyboardAvoidingView>
  );
};



// Define your main navigation component
const Navigation: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const loggingOut = () => {
    setLoggedIn(false);
  }

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token !== null) {
          setLoggedIn(true);
        } else {
          setLoggedIn(false);
        }
      } catch (error) {
        console.error('Error checking token:', error);
        setLoggedIn(false);
      }
    };

    checkToken();
  }, []);

  return loggedIn ? <MainTabLayout loggedIn={loggedIn} loggingOut={loggingOut} /> : <LoginScreen onLogin={() => setLoggedIn(true)} />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "white",
  },
  containerNewAcc: {
    flexDirection: 'row', // Display children components horizontally
    alignItems: 'center', // Align children components vertically
    marginTop: 15, // Adjust spacing between the login section and the "Don't have an account?" section
    
  },  
  containerInput: {
    width: '80%',
    justifyContent: 'center',
  },
  title: {
    fontSize: 40,
    fontWeight: "500",
    color: "#F2F2F2",
    marginBottom: 2,
  },
  subTitle: {
    fontSize: 17,
    fontWeight: "400",
    color: "#999999",
    marginBottom: 15,
  },
  inputTitle: {
    fontSize: 13,
    fontWeight: "400",
    color: "white",
    marginBottom: 10,
    marginLeft: 3
  },
  accountCreate: {
    fontSize: 13,
    fontWeight: "300",
    color: "#999999",
    marginTop: 15,
  },
  input: {
    width: '100%', // Adjust width to 100% to fill the containerInput
    color: 'black',
    height: 45,
    fontSize: 18,
    backgroundColor: 'white',
    marginBottom: 15,
    borderRadius: 10,
    paddingHorizontal: 15,
  },
  button: {
    alignSelf: 'flex-start', // Align button to the left
    backgroundColor: '#F2CB05',
    paddingVertical: 10,
    width: '100%',
    borderRadius: 8,
    marginTop: 10,
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
  },
  signUp: {
    alignSelf: 'flex-start', // Align button to the left
    backgroundColor: 'transparent',
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: '#0D0D0D',
    fontSize: 15,
    fontWeight: '500',
    textAlign: 'center', // Center text horizontally
  },
  buttonTextSignUp: {
    color: 'white',
    fontSize: 12.5,
    fontWeight: '400',
    marginLeft: 5,
    marginTop: 5,
    textAlign: 'center', // Center text horizontally
  },
});

export default Navigation;
