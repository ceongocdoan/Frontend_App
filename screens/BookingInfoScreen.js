import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TextInput, Button, Alert, ScrollView } from 'react-native';
import SuccessModal from './successmodal';

const BookingInfo = ({ route, navigation }) => {
  const { restaurantName, restaurantImage } = route.params;
  const [time, setTime] = useState('');
  const [numberOfPeople, setNumberOfPeople] = useState('');
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleReservation = () => {
    if (time && numberOfPeople && fullName && phoneNumber && email) {
      setShowSuccessModal(true);
    } else {
      Alert.alert('Lỗi', 'Vui lòng điền đầy đủ thông tin để đặt bàn.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.headerText}>Thông tin đặt bàn</Text>
      <View style={styles.restaurantInfo}>
        <Image source={{ uri: restaurantImage }} style={styles.restaurantImage} />
        <Text style={styles.restaurantName}>{restaurantName}</Text>
      </View>
      <View style={styles.reservationInfo}>
        <TextInput
          style={styles.input}
          placeholder="Thời gian đặt bàn"
          value={time}
          onChangeText={setTime}
        />
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
          <Button title="Đặt bàn ngay" onPress={handleReservation} color="#f4511e" />
        </View>
      </View>
      <SuccessModal visible={showSuccessModal} onClose={() => setShowSuccessModal(false)} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#FFE4E1',
  },
  headerText: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
    color: '#333',
  },
  restaurantInfo: {
    alignItems: 'center',
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
    fontWeight: 'bold',
    color: '#333',
  },
  reservationInfo: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginVertical: 10,
    backgroundColor: '#CC99CC',
  },
  buttonContainer: {
    marginTop: 20,
    borderRadius: 8,
    overflow: 'hidden',
  },
});

export default BookingInfo;
