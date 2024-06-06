import React from 'react';
import { View, Text } from 'react-native';

const ProfileScreen = ({ route }) => {
  const { username } = route.params;

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Hello, {username}!</Text>
      {/* Hiển thị thông tin người dùng khác nếu cần */}
    </View>
  );
};

export default ProfileScreen;
