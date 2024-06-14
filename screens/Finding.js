import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, ImageBackground, StyleSheet, Alert } from 'react-native';
import * as Location from 'expo-location';
import { getDistance } from 'geolib';

const BACKGROUND_COLOR = '#FFE4E1';

const sampleRestaurants = [
  { id: 1, image: require('../assets/res1.jpg'), name: 'Haidilao', address: '123 Main St', latitude: 21.028511, longitude: 105.804817 },
  { id: 2, image: require('../assets/res2.jpg'), name: 'Gogi', address: '234 Elm St', latitude: 21.030654, longitude: 105.803202 },
  { id: 3, image: require('../assets/res3.jpg'), name: 'Dookki', address: '567 Oak St', latitude: 21.027763, longitude: 105.805037 },
  { id: 4, image: require('../assets/res4.jpg'), name: 'KFC', address: '890 Pine St', latitude: 21.029011, longitude: 105.806817 },
  { id: 5, image: require('../assets/res5.jpg'), name: 'Pizza Hut', address: '456 Maple St', latitude: 21.026511, longitude: 105.802817 },
];

const Finding = () => {
  const [searchText, setSearchText] = useState('');
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  useEffect(() => {
    if (location) {
      const filtered = sampleRestaurants.filter(restaurant =>
        getDistance(
          { latitude: location.coords.latitude, longitude: location.coords.longitude },
          { latitude: restaurant.latitude, longitude: restaurant.longitude }
        ) <= 5000 // Lọc các nhà hàng trong vòng bán kính 5 km
      );
      setFilteredRestaurants(filtered);
    }
  }, [location]);

  const handleSearch = (text) => {
    setSearchText(text);
    if (text.trim() !== '') {
      const filtered = sampleRestaurants.filter(restaurant =>
        restaurant.name.toLowerCase().startsWith(text.toLowerCase())
      );
      setFilteredRestaurants(filtered);
    } else if (location) {
      const filtered = sampleRestaurants.filter(restaurant =>
        getDistance(
          { latitude: location.coords.latitude, longitude: location.coords.longitude },
          { latitude: restaurant.latitude, longitude: restaurant.longitude }
        ) <= 5000 // Lọc các nhà hàng trong vòng bán kính 5 km
      );
      setFilteredRestaurants(filtered);
    } else {
      setFilteredRestaurants([]);
    }
  };

  const handleRestaurantDetail = (restaurant) => {
    if (location) {
      const distance = getDistance(
        { latitude: location.coords.latitude, longitude: location.coords.longitude },
        { latitude: restaurant.latitude, longitude: restaurant.longitude }
      );
      Alert.alert(
        'Khoảng cách đến nhà hàng',
        `Khoảng cách từ vị trí hiện tại của bạn đến ${restaurant.name} là ${distance} mét.`
      );
    } else {
      Alert.alert('Lỗi', 'Không thể lấy vị trí hiện tại của bạn.');
    }
  };

  const renderRestaurantItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleRestaurantDetail(item)}>
      <View style={styles.restaurantContainer}>
        <ImageBackground source={item.image} style={styles.imageBackground}>
          <View style={styles.textContainer}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.address}>{item.address}</Text>
          </View>
        </ImageBackground>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, paddingTop: 20, backgroundColor: BACKGROUND_COLOR }}>
      <TextInput
        style={styles.searchInput}
        placeholder="Tìm kiếm nhà hàng..."
        value={searchText}
        onChangeText={handleSearch}
      />

      {location ? (
        <View style={styles.locationContainer}>
          <Text style={styles.locationText}>Vị trí hiện tại của bạn:</Text>
          <Text style={styles.locationText}>Latitude: {location.coords.latitude}</Text>
          <Text style={styles.locationText}>Longitude: {location.coords.longitude}</Text>
        </View>
      ) : (
        <Text style={styles.locationText}>
          {errorMsg ? errorMsg : 'Đang lấy vị trí hiện tại...'}
        </Text>
      )}

      <FlatList
        data={filteredRestaurants}
        renderItem={renderRestaurantItem}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  restaurantContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#FFB6C1',
  },
  imageBackground: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 100,
  },
  textContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 5,
    marginLeft: 10,
  },
  name: {
    fontWeight: 'bold',
    color: 'white',
  },
  address: {
    color: 'white',
  },
  searchInput: {
    padding: 10,
    margin: 10,
    borderWidth: 1,
    borderColor: '#FFB6C1',
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  locationContainer: {
    padding: 10,
    margin: 10,
    borderWidth: 1,
    borderColor: '#FFB6C1',
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  locationText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default Finding;
