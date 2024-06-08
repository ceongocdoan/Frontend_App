import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null);
  const [email, setEmail] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const getTokenAndEmail = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        const storedEmail = await AsyncStorage.getItem('user_email');
        if (storedToken ===undefined ||storedEmail===null){
          console.log('')
          navigation.navigate('Account');
        }
        setToken(storedToken);
        setEmail(storedEmail);
      } catch (err) {
        setError("Failed to load token or email from storage");
      }
    };

    getTokenAndEmail();
  }, []);

  useEffect(() => {
    if (token) {
      const fetchUserInfo = async () => {
        try {
          const response = await axios.get('http://localhost:8080/api/v1/' + 'session', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (response.data && response.data.length > 0) {
            setUserInfo(response.data[0]);
          } else {
            navigation.navigate("Account");
          }
        } catch (err) {
          navigation.navigate("Account");
        } finally {
          setLoading(false);
        }
      };

      fetchUserInfo();
    }
  }, [token]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>Hello, {email}!</Text>
      {userInfo && (
        <View>
          <Text>Name: {userInfo.name}</Text>
          <Text>Phone: {userInfo.phone}</Text>
          <Text>Email: {userInfo.email}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 20,
    marginBottom: 20,
  },
});

export default ProfileScreen;
