import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

function LoginScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Dummy authentication function
  const handleLogin = () => {
    // Implement your own authentication logic here
    if (email === "example@email.com" && password === "password") {
      Alert.alert("Login Successfully!");
      console.log("ssss");
      navigation.navigate("Home");
      setEmail("");
      setPassword("");
    } else {
      Alert.alert("Invalid email or password!");
    }
  };

  // handle register
  const handleRegister = () => {
    navigation.navigate("Register");
  };

  return (
    <View>
      <View style={styles.loginBox}>
        <View style={styles.lbHeader}>
          <Text style={styles.linkText}>LOGIN</Text>
          <TouchableOpacity onPress={handleRegister}>
            <Text style={styles.linkText}>SIGN UP</Text>
          </TouchableOpacity>
        </View>

        {/* input */}
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

export default LoginScreen;

const styles = {
  loginBox: {
    // Your styles for login box
  },
  lbHeader: {
    // Your styles for header
  },
  linkText: {
    // Your styles for link text
  },
  emailLogin: {
    // Your styles for email login container
  },
  uFormGroup: {
    // Your styles for form group
  },
  input: {
    // Your styles for input field
  },
  button: {
    // Your styles for button
  },
  buttonText: {
    // Your styles for button text
  },
  forgotPassword: {
    // Your styles for forgot password text
  },
};
