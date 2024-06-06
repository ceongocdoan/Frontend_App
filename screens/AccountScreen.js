//account
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';

function AccountScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const storedEmail = await AsyncStorage.getItem('user_email');
    const storedPassword = await AsyncStorage.getItem('user_password');

    if (email === storedEmail && password === storedPassword) {
      Alert.alert("Login successful!");
      navigation.navigate("Home");
      setEmail("");
      setPassword("");
    } else {
      Alert.alert("Invalid email or password!");
    }
  };

  const navigateToRegister = () => {
    navigation.navigate("Register");
  };

  return (
    <View>
      <View style={styles.loginBox}>
        <View style={styles.lbHeader}>
          <Text style={styles.linkText}>LOGIN</Text>
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

const styles = {
  loginBox: {
    margin: 20,
    padding: 20,
    backgroundColor: '#f0f0f0',
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
  linkText: {
    fontSize: 18,
    color: 'blue',
    textDecorationLine: 'underline',
  },
  emailLogin: {},
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
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  forgotPassword: {
    textAlign: 'center',
    color: 'blue',
    textDecorationLine: 'underline',
  },
};

export default AccountScreen;

