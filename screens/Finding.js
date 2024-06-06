import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native';

const BACKGROUND_COLOR = '#FFE4E1';

const sampleRestaurants = [
  { id: 1, image: require('../assets/haidilao.jpg'), name: 'Haidilao', address: '123' },
  { id: 2, image: require('../assets/gogi.png'), name: 'Gogi', address: '234' },
  { id: 3, image: require('../assets/dookki.jpg'), name: 'Dookki', address: '567' },
];

const Finding = () => {
  const [searchText, setSearchText] = useState('');
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);

  const handleSearch = (text) => {
    setSearchText(text);
    if (text.trim() !== '') {
      const filtered = sampleRestaurants.filter(restaurant =>
        restaurant.name.toLowerCase().startsWith(text.toLowerCase())
      );
      setFilteredRestaurants(filtered);
    } else {
      setFilteredRestaurants([]);
    }
  };

  const handleRestaurantDetail = (restaurant) => {
    console.log('Thông tin chi tiết của nhà hàng:', restaurant);
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
        style={{ padding: 10, margin: 10, borderWidth: 5, borderColor: '#CC99FF' }}
        placeholder="Tìm kiếm nhà hàng..."
        value={searchText}
        onChangeText={handleSearch}
      />

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
    borderColor: '#ccc',
  },
  
  imageBackground: {
    flexDirection: 'row', 
    alignItems: 'center', 
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
  
});

export default Finding;
