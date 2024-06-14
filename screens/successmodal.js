import React from 'react';
import { View, Text, Modal, StyleSheet, Button } from 'react-native';

const SuccessModal = ({ visible, onClose }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Đặt bàn thành công!</Text>
          <Button title="Đóng" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFB6C1', 
  },
  modalView: {
    backgroundColor: '#FFE4E1',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#FFB6C1',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SuccessModal;
