import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

const BACKGROUND_COLOR = '#FFE4E1';

const Call = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(false);

  const handlePhoneNumberChange = (number) => {
    setPhoneNumber(number);
    setIsPhoneNumberValid(number.length === 10); // Giả sử độ dài số điện thoại là 10 chữ số
  };

  const handleContinuePress = () => {
    if (isPhoneNumberValid) {
      // Xử lý khi số điện thoại hợp lệ
      console.log('Số điện thoại hợp lệ:', phoneNumber);
    } else {
      // Xử lý khi số điện thoại không hợp lệ
      console.log('Số điện thoại không hợp lệ:', phoneNumber);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: BACKGROUND_COLOR }]}>
      <Text style={styles.header}>App đặt hàng vui vẻ xin chào!</Text>
      <Text style={styles.subHeader}>Đăng nhập/ Đăng kí tài khoản ngay bây giờ</Text>
      <View style={[styles.inputContainer, { borderColor: isPhoneNumberValid ? 'green' : 'red' }]}>
        <TextInput
          style={styles.input}
          placeholder="Nhập số điện thoại của bạn"
          keyboardType="numeric"
          value={phoneNumber}
          onChangeText={handlePhoneNumberChange}
        />
      </View>
      <TouchableOpacity
        style={[styles.continueButton, { backgroundColor: isPhoneNumberValid ? 'green' : 'pink' }]}
        onPress={handleContinuePress}
        disabled={!isPhoneNumberValid}
      >
        <Text style={styles.buttonText}>Tiếp tục</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 18,
    marginBottom: 20,
  },
  inputContainer: {
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
  },
  input: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 16,
  },
  continueButton: {
    backgroundColor: '#FFCCFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Call;
