import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const AccountScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = async () => {
    if (email.trim() === "" || password.trim() === ""){
      Alert.alert("Please enter email and password.");
      return;
    }
    
    try {
      const response = await axios.post('http://localhost:8080/api/v1/'+`login`, {
        email: email,
        password: password
      });

      await AsyncStorage.setItem('user_email', email);
      await AsyncStorage.setItem('token', response.data.token);

      Alert.alert(`Login with Email: ${email}`);
  
      setEmail("");
      setPassword("");
  
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
    } catch (error) {
      Alert.alert("Login failed. Please try again.");
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
