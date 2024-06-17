import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const AccountScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = async () => {
    if (email.trim() === "" || password.trim() === "") {
      Alert.alert("Please enter email and password.");
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/api/v1/login', {
        email: email,
        password: password
      });

      await AsyncStorage.setItem('user_email', email);
      await AsyncStorage.setItem('token', response.data.token);

      Alert.alert(`Login with Email: ${email}`);

      setEmail("");
      setPassword("");
      navigation.navigate('Profile');
    } catch (error) {
      Alert.alert("Login failed. Please try again.");
    }
  };

  const navigateToRegister = () => {
    navigation.navigate("Register");
  };

  return (
    <View style={styles.container}>
      <View style={styles.loginBox}>
        <View style={styles.lbHeader}>
          <Text style={styles.headerText}>LOGIN</Text>
          <TouchableOpacity onPress={navigateToRegister}>
            <Text style={styles.linkText}>SIGN UP</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.emailLogin}>
          <View style={styles.uFormGroup}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
          </View>
          <View style={styles.uFormGroup}>
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry={true}
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
          </View>
          <View style={styles.uFormGroup}>
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>Log in</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.uFormGroup}>
            <Text style={styles.forgotPassword}>Forgot password?</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#FFE4E1', 
  },
  loginBox: {
    padding: 20,
    backgroundColor: '#FFF', 
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  lbHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 18,
    color: '#FFB6C1', 
    fontWeight: 'bold',
  },
  linkText: {
    fontSize: 18,
    color: '#FFB6C1', 
    textDecorationLine: 'underline',
  },
  emailLogin: {},
  uFormGroup: {
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#FFB6C1', 
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#FFF', 
  },
  button: {
    backgroundColor: '#FFB6C1', 
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 3,
  },
  buttonText: {
    color: '#FFF', 
    fontSize: 16,
    fontWeight: 'bold',
  },
  forgotPassword: {
    textAlign: 'center',
    color: '#FF69B4', 
    textDecorationLine: 'underline',
  },
});

export default AccountScreen;
