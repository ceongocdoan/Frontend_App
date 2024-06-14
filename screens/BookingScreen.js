import React, { useState, useEffect } from "react";
import {
  View,
  Button,
  ScrollView,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Platform,
} from "react-native";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import axios from "axios"; // Thêm import axios
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const BACKGROUND_COLOR = "#FFE4E1";

const BookingScreen = ({ navigation }) => {
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [showRestaurantList, setShowRestaurantList] = useState(false);
  const [cities, setCities] = useState([]);
  const [brands, setBrands] = useState([]);
  const [date, setDate] = useState(new Date());
  useEffect(() => {
    fetchCities();
  }, []);

  const fetchCities = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/restaurants/list-province"
      );
      setCities(response.data.map((city) => ({ label: city, value: city })));
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  const fetchBrands = async (province) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/restaurants/list-brand?province=${encodeURIComponent(
          province
        )}`
      );
      setBrands(
        response.data.map((brands) => ({ label: brands, value: brands }))
      );
    } catch (error) {
      console.error("Error fetching brands:", error);
    }
  };

  useEffect(() => {
    if (selectedCity) {
      fetchBrands(selectedCity);
    }
  }, [selectedCity]);

  const fetchRestaurants = async (city, brand, time) => {
    setLoading(true);
    try {
      let timestamp = date.getTime() / 1000;
      const response = await axios.get(
        `http://localhost:8080/api/v1/restaurants/list-order?province=${encodeURIComponent(
          city
        )}&brand=${encodeURIComponent(brand)}&time=${timestamp}`
      );
      setRestaurants(response.data);
    } catch (error) {
      console.error("Error fetching restaurants:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if ((selectedCity, selectedBrand, date)) {
      fetchRestaurants(selectedCity, selectedBrand, date);
    }
  }, [date]);

  const handleCitySelect = (city) => {
    setSelectedCity(city);
  };

  const handleBrandSelect = (brand) => {
    setSelectedBrand(brand);
    setShowTimePicker(true);
  };

  const handleTimeSelect = (date) => {
    setDate(date);
    setShowRestaurantList(true);
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: BACKGROUND_COLOR }]}
    >
      <Picker
        selectedValue={selectedCity}
        onValueChange={handleCitySelect}
        style={styles.picker}
      >
        <Picker.Item label="Chọn thành phố" value={null} />
        {cities.map((city, index) => (
          <Picker.Item label={city.label} value={city.value} key={index} />
        ))}
      </Picker>

      <Picker
        selectedValue={selectedBrand}
        onValueChange={handleBrandSelect}
        style={styles.picker}
      >
        <Picker.Item label="Chọn thương hiệu" value={null} />
        {brands.map((brand, index) => (
          <Picker.Item label={brand.label} value={brand.value} key={index} />
        ))}
      </Picker>

      {showTimePicker && (
        <View style={styles.picker}>
          <DatePicker
            selected={date}
            onChange={handleTimeSelect}
            showTimeSelect
            dateFormat="Pp"
            customInput={
              <input
                style={{ width: "99.6%", background: "white", border: "none" }}
              />
            }
          />
          <Text
            style={{ background: "white"}}
          >Selected Date: {date.toLocaleString()}</Text>
        </View>
      )}

      {loading ? (
        <Text>Loading...</Text>
      ) : showRestaurantList ? (
        <View>
          <Text style={styles.listHeader}>Danh sách nhà hàng còn bàn</Text>
          <ScrollView style={styles.restaurantList}>
            {restaurants.map((restaurant, index) => (
              <TouchableOpacity
                key={index}
                onPress={() =>
                  navigation.navigate("BookingInfo", {
                    restaurantId: restaurant.id,
                    restaurantName: restaurant.name,
                    restaurantImage: restaurant.image,
                  })
                }
                style={styles.restaurantItem}
              >
                <ImageBackground
                  source={restaurant.image}
                  style={styles.restaurantImage}
                />
                <View style={styles.restaurantInfo}>
                  <Text style={styles.restaurantName}>{restaurant.name}</Text>
                  <Text style={styles.restaurantAddress}>
                    {restaurant.address}
                  </Text>
                  <Text style={styles.restaurantPhone}>{restaurant.phone}</Text>
                  <Text style={styles.restaurantRating}>
                    Rating: {restaurant.rating}
                  </Text>
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
    width: "100%",
    height: 50,
    borderWidth: 5,
    borderColor: '#FFB6C1',
    marginBottom: 10,
  },
  listHeader: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  restaurantList: {
    flex: 1,
  },
  restaurantItem: {
    flexDirection: "row",
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
    fontWeight: "bold",
  },
  restaurantAddress: {
    fontStyle: "italic",
  },
  restaurantPhone: {
    fontWeight: "bold",
  },
  restaurantRating: {
    marginTop: 5,
  },
});

export default BookingScreen;
