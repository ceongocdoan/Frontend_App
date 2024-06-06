

import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TextInput, Button, Alert } from 'react-native';
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
    <View style={styles.container}>
      <Text style={{ textAlign: 'center' }}>Thông tin đặt bàn</Text>
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
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <View style={{ borderRadius: 100, padding: 10 }}>
          <Button title="Đặt bàn ngay" onPress={handleReservation} />
        </View>
      </View>
      <SuccessModal visible={showSuccessModal} onClose={() => setShowSuccessModal(false)} />
    </View>
  );
};

const styles = StyleSheet.create({

});

export default BookingInfo;

