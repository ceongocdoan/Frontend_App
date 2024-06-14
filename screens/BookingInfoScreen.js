import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  Button,
  Alert,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SuccessModal from "./successmodal";
import axios from "axios";

const BookingInfo = ({ route, navigation }) => {
  const {
    restaurantId,
    restaurantName,
    restaurantImage,
    restaurantAddress,
    date,
  } = route.params;
  const [numberOfPeople, setNumberOfPeople] = useState("");
  const [userID, setUserID] = useState("");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [token, setToken] = useState(null);
  const [email, setEmail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getTokenAndEmail = async () => {
      try {
        const storedToken = await AsyncStorage.getItem("token");
        const storedEmail = await AsyncStorage.getItem("user_email");
        if (!storedToken || !storedEmail) {
          navigation.navigate("Account");
          return;
        }
        setToken(storedToken);
        setEmail(storedEmail);
      } catch (err) {
        navigation.navigate("Account");
        return;
      }
    };

    getTokenAndEmail();
  }, []);

  useEffect(() => {
    if (token) {
      getUserInfo();
    }
  }, [token]);

  const getUserInfo = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/v1/session", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data && response.data.length > 0) {
        setUserID(response.data[0]._id);
        setFullName(response.data[0].name);
        setEmail(response.data[0].email);
        setPhoneNumber(response.data[0].phone);
      } else {
        navigation.navigate("Account");
      }
    } catch (err) {
      navigation.navigate("Account");
    } finally {
      setLoading(false);
    }
  };

  const handleReservation = async () => {
    try {
      if (numberOfPeople && fullName && phoneNumber && email) {
        const response = await axios.post(
          "http://localhost:8080/api/v1/" + `orders`,
          {
            phone: phoneNumber,
            numberOfPeople: numberOfPeople,
            fullName: fullName,
            restaurant: {
              id: restaurantId,
              name: restaurantName,
              location: restaurantAddress,
            },
            time: date.getTime() / 1000,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 201) {
          setShowSuccessModal(true);
        }
      }
    } catch (err) {
      Alert.alert("Lỗi", "Vui lòng điền đầy đủ thông tin để đặt bàn.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.headerText}>Thông tin đặt bàn</Text>
      <View style={styles.restaurantInfo}>
        <Image
          source={{ uri: restaurantImage }}
          style={styles.restaurantImage}
        />
        <Text style={styles.restaurantName}>{restaurantName}</Text>
      </View>
      <View style={styles.reservationInfo}>
        <TextInput
          style={styles.input}
          placeholder="Số lượng người"
          value={numberOfPeople}
          onChangeText={setNumberOfPeople}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Họ tên"
          value={fullName}
          onChangeText={setFullName}
        />
        <TextInput
          style={styles.input}
          placeholder="Số điện thoại"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <View style={styles.buttonContainer}>
          <Button
            title="Đặt bàn ngay"
            onPress={handleReservation}
            color="#f4511e"
          />
        </View>
      </View>
      <SuccessModal
        visible={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#FFE4E1",
  },
  headerText: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 20,
    color: "#333",
  },
  restaurantInfo: {
    alignItems: "center",
    marginBottom: 20,
  },
  restaurantImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 10,
  },
  restaurantName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },
  reservationInfo: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  input: {
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginVertical: 10,
    backgroundColor: "#CC99CC",
  },
  buttonContainer: {
    marginTop: 20,
    borderRadius: 8,
    overflow: "hidden",
  },
});

export default BookingInfo;
