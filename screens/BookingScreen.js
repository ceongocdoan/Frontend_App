import React, { useState, useEffect } from 'react';
import { View, Button ,ScrollView, Text, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import MyDatePicker from './MyDatePicker';
import axios from 'axios';  // Thêm import axios

const BACKGROUND_COLOR = '#FFE4E1';

const BookingScreen = ({ navigation }) => {
  const [selectedCity, setSelectedCity] = useState('Ha Noi');
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [showRestaurantList, setShowRestaurantList] = useState(false);
  const [cities, setCities] = useState([]);
  const [brands, setBrands] = useState([]);
  const cityIcon = <FontAwesome name="map-marker" size={24} color="black" />
  const brandIcon = <MaterialIcons name="branding-watermark" size={24} color="black" />
  const timeIcon = <MaterialIcons name="access-time" size={24} color="black" />
  const times = [
    '9:00', '9:30','10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
    '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30'
  ];

  useEffect(() => {
    fetchCities();
  }, []);

  const fetchCities = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/v1/restaurants/list-province');
      setCities(response.data.map(city => ({ label: city, value: city }))); 
    } catch (error) {
      console.error('Error fetching cities:', error);
    }
  };

  const fetchBrands = async (province) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/restaurants/list-brand?province=${encodeURIComponent(province)}`);
      setBrands(response.data.map(brands => ({ label: brands, value: brands })));
    } catch (error) {
      console.error('Error fetching brands:', error);
    }
  };

  useEffect(() => {
    if (selectedCity) {
      fetchBrands(selectedCity);
    }
  }, [selectedCity]);

  const fetchRestaurants = async (city, brand, time) => {
    try {
      const restaurantData = {
        'Gogi House - Quán thịt nướng Hàn Quốc': [
          { id: 1, image: require('../assets/b1.jpg'), name: 'Gogi House Bùi Thị Xuân', address: '151 Bùi Thị Xuân, Hai Bà Trưng, Hà Nội', phone: '02473007341', rating: 4.5},
          { id: 2, image: require('../assets/b2.jpg'), name: 'Gogi House Vincom Phạm Ngọc Thạch', address: 'L5-01 & 02, Tầng 5, TTTM Vincom Phạm Ngọc Thạch, Đống Đa, Hà Nội', phone: '0987654321', rating: 4.2 },
          { id: 3, image: require('../assets/b3.jpg'), name: 'Gogi House Lê Trọng Tấn', address: 'Số 182 Lê Trọng Tấn ', phone: '1357924680', rating: 4.0 }
        ],
        'GoGi Steak': [
          { id: 4, image: require('../assets/b1.jpg'), name: 'GoGi Steak Lê Văn Lương', address: 'Số 182 Lê Văn Lương ', phone: '1357924680', rating: 4.0 },
          { id: 5, image: require('../assets/b3.jpg'), name: 'GoGi Steak Nguyễn Khánh Toàn', address: 'Số 182 Nguyễn Khánh Toàn ', phone: '1357924680', rating: 4.0 }
        ],
        'Kichi-Kichi - Lẩu băng chuyền' :[
          { id: 6, image: require('../assets/b2.jpg'), name: 'Kichi-Kichi Vincom Bà Triệu', address: 'Bà Triệu ', phone: '1357924680', rating: 4.5 },
          { id: 7, image: require('../assets/b3.jpg'), name: 'Kichi-Kichi Tràng Tiền Plaza', address: 'Hoàn Kiếm ', phone: '1357924680', rating: 4.0 },
          { id: 8, image: require('../assets/b1.jpg'), name: 'Kichi-Kichi Times City', address: 'Minh Khai', phone: '1357924680', rating: 4.0 },
          { id: 9, image: require('../assets/b3.jpg'), name: 'Kichi-Kichi Royal City', address: 'Thanh Xuân', phone: '1357924680', rating: 4.0 },
        ]
      };
  
      return restaurantData[brand] || [];
    } catch (error) {
      throw new Error('Error fetching restaurants:', error);
    }
  };

  const handleCitySelect = (city) => {
    setSelectedCity(city);
  };

  const handleBrandSelect = (brand) => {
    setSelectedBrand(brand);
    setShowTimePicker(true);
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    setShowTimePicker(false);
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: BACKGROUND_COLOR }]}>
      <Picker
  selectedValue={selectedCity}
  onValueChange={handleCitySelect}
  style={styles.picker}
>
  {cities.map((city, index) => (
    <Picker.Item label={city.label} value={city.value} key={index} />
  ))}
</Picker>

<Picker
  selectedValue={selectedBrand || ''}
  onValueChange={handleBrandSelect}
  style={styles.picker}
>
  <Picker.Item label="Chọn thương hiệu" value="" />
  {brands.map((brand, index) => (
    <Picker.Item label={brand.label} value={brand.value} key={index} />
  ))}
</Picker>

<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Booking Screen</Text>
      <MyDatePicker />
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
    </View>

{showTimePicker && (
  <DateTimePicker
  onChange={handleTimeSelect}
  value={selectedTime}
  format="yyyy-MM-dd HH:mm:ss"
/>
)}
<button onClick={() => setShowTimePicker(true)}>Chọn thời gian</button>

      {loading ? (
        <Text>Loading...</Text>
      ) : showRestaurantList ? (
        <View>
          <Text style={styles.listHeader}>Danh sách nhà hàng còn bàn</Text>
          <ScrollView style={styles.restaurantList}>
            {restaurants.map((restaurant, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => navigation.navigate('BookingInfo', { 
                  restaurantId: restaurant.id,
                  restaurantName: restaurant.name,
                  restaurantImage: restaurant.image,
                })}
                style={styles.restaurantItem}
              >
                <ImageBackground source={restaurant.image} style={styles.restaurantImage} />
                <View style={styles.restaurantInfo}>
                  <Text style={styles.restaurantName}>{restaurant.name}</Text>
                  <Text style={styles.restaurantAddress}>{restaurant.address}</Text>
                  <Text style={styles.restaurantPhone}>{restaurant.phone}</Text>
                  <Text style={styles.restaurantRating}>Rating: {restaurant.rating}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      ) : null}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  picker: {
    width: '100%',
    height: 50,
    borderWidth: 5,
    borderColor: '#FFB6C1',
    marginBottom: 10,
  },
  listHeader: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  restaurantList: {
    flex: 1,
  },
  restaurantItem: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#FFB6C1',
    padding: 10,
    marginVertical: 10,
  },
  restaurantImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  restaurantInfo: {
    flex: 1,
    marginLeft: 10,
  },
  restaurantName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  restaurantAddress: {
    fontStyle: 'italic',
  },
  restaurantPhone: {
    fontWeight: 'bold',
  },
  restaurantRating: {
    marginTop: 5,
  },
});

export default BookingScreen;
