import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, Pressable } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

function AccountScreen() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [loggedIn, setLoggedIn] = useState(false); 

  useEffect(() => {
    checkLoggedIn();
  }, []);

  const checkLoggedIn = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    if (userToken) {
      setLoggedIn(true);
      const storedEmail = await AsyncStorage.getItem('userEmail');
      setEmail(storedEmail);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3002/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: 'Default User', email }),
      });

      const data = await response.json();

      if (response.status === 200) {
        await AsyncStorage.setItem('userToken', data.token);
        await AsyncStorage.setItem('userEmail', email);
        setLoggedIn(true); 
        Alert.alert("Login successful!");
      } else {
        Alert.alert("Invalid email or password!");
      }
    } catch (error) {
      console.error('Error logging in:', error);
      Alert.alert("An error occurred. Please try again.");
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('userEmail');
      setLoggedIn(false); 
      setEmail("");
      Alert.alert("Logged out successfully!");
    } catch (error) {
      console.error('Error logging out:', error);
      Alert.alert("An error occurred. Please try again.");
    }
  };


  return (
    <View style={styles.account}>
      <View style={styles.loginBox}>
        <View style={styles.lbHeader}>
          <Text style={styles.linkText}>Đăng nhập tài khoản</Text>
        </View>

        {loggedIn ? ( 
          <View style={styles.loggedInContainer}>
            <Text style={styles.loggedInText}>Xin chào, {email}!</Text>
            <Pressable style={styles.logoutButton} onPress={handleLogout}>
              <Text style={styles.buttonText}>Đăng xuất khỏi tài khoản này</Text>
            </Pressable>
          </View>
        ) : (
          <View style={styles.emailLogin}>
            <View style={styles.uFormGroup}>
              <TextInput
                style={styles.input}
                placeholder="Tên..."
                value={name}
                onChangeText={(text) => setName(text)}
              />
            </View>

            <View style={styles.uFormGroup}>
              <TextInput
                style={styles.input}
                placeholder="Email..."
                value={email}
                onChangeText={(text) => setEmail(text)}
              />
            </View>

            <View style={styles.uFormGroup}>
              <Pressable style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Đăng nhập</Text>
              </Pressable>
            </View>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = {
  account:{
    backgroundColor:  '#FFE4E1',
    height: 700
  },
  loginBox: {
    margin: 20,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 5,
  },
  lbHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  linkText: {
    fontSize: 18,
  },
  emailLogin: {},
  loggedInContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  loggedInText: {
    fontSize: 20,
  },
  logoutButton: {
    backgroundColor: 'lightpink',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  uFormGroup: {
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: 'lightpink',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  forgotPassword: {
    textAlign: 'center',
    color: 'blue',
    textDecorationLine: 'underline',
  },
};

export default AccountScreen;
