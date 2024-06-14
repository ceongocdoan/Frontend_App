import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

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
        if (!storedToken || !storedEmail) {
          navigation.navigate('Account');
          return;
        }
        setToken(storedToken);
        setEmail(storedEmail);
      } catch (err) {
        setError("Failed to load token or email from storage");
      }
    };

    getTokenAndEmail();
  }, []);

  useFocusEffect(
    useCallback(() => {
      const fetchUserInfo = async () => {
        if (token) {
          try {
            const response = await axios.get('http://localhost:8080/api/v1/session', {
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
        } else {
          setLoading(false);
        }
      };

      fetchUserInfo();
    }, [token])
  );

  const handleLogout = async () => {
    try {
      if (!token) {
        navigation.navigate('Account');
        return;
      }
      await axios.post('http://localhost:8080/api/v1/logout', {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      await AsyncStorage.removeItem('user_email');
      await AsyncStorage.removeItem('token');

      Alert.alert('Logout successfully');
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
    } catch (error) {
      Alert.alert("Logout failed. Please try again.");
    }
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#FF69B4" />
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
          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>Name:</Text>
            <Text style={styles.infoText}>{userInfo.name}</Text>
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>Phone:</Text>
            <Text style={styles.infoText}>{userInfo.phone}</Text>
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>Email:</Text>
            <Text style={styles.infoText}>{userInfo.email}</Text>
          </View>
        </View>
      )}
      <View style={styles.uFormGroup}>
        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <Text style={styles.buttonText}>Log out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFE4E1', // Light Pink background color
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFE4E1', // Light Pink background color
  },
  greeting: {
    fontSize: 24,
    marginBottom: 20,
    color: '#FF69B4', // Hot Pink text color
    fontWeight: 'bold',
  },
  infoBox: {
    marginBottom: 10,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#FFF', // White background color for info box
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    width: '100%',
  },
  infoLabel: {
    fontSize: 16,
    color: '#333', // Dark text color for label
    fontWeight: 'bold',
  },
  infoText: {
    fontSize: 18,
    color: '#333', // Dark text color for text
    marginTop: 5,
  },
  uFormGroup: {
    marginTop: 20,
  },
  button: {
    backgroundColor: '#FF69B4', // Hot Pink button color
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 3,
  },
  buttonText: {
    color: '#FFF', // White text color
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
