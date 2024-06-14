import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios'; 

function RegisterScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const navigation = useNavigation();

  const handleRegister = async () => {
    if (email.trim() === "" || password.trim() === "" || phone.trim() === "" || name.trim() === "") {
      Alert.alert("Please enter all fields.");
      return;
    }
    
    try {
      const response = await axios.post('http://localhost:8080/api/v1/signup', {
        email: email,
        phone: phone,
        name: name,
        password: password
      });

      await AsyncStorage.setItem('user_email', email);
      await AsyncStorage.setItem('token', response.data.token);

      Alert.alert(`Registered with Email: ${email}`);

      setEmail("");
      setPassword("");
      setPhone("");
      setName("");

      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
    } catch (error) {
      Alert.alert("Registration failed. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Đăng ký tài khoản</Text>
      <View style={styles.formGroup}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
      </View>
      <View style={styles.formGroup}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={(text) => setName(text)}
        />
      </View>
      <View style={styles.formGroup}>
        <TextInput
          style={styles.input}
          placeholder="Phone"
          value={phone}
          onChangeText={(text) => setPhone(text)}
        />
      </View>
      <View style={styles.formGroup}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Đăng ký</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#FFE4E1', // Light Pink background color
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: '#FF69B4', // Hot Pink text color
  },
  formGroup: {
    marginBottom: 20,
    width: '100%',
  },
  input: {
    borderWidth: 1,
    borderColor: "#FFB6C1", // Light Pink border color
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#FFF', // White background color for the input
    width: "100%",
  },
  button: {
    backgroundColor: '#FF69B4', // Hot Pink button color
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
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
    color: "#FFF", // White text color
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default RegisterScreen;
