import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, FlatList, TouchableOpacity, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const scrollX = new Animated.Value(0);
  const [imageScale, setImageScale] = useState({});

  const images = [
    require('../assets/dookki.jpg'),
    require('../assets/gogi.png'),
    require('../assets/haidilao.jpg'),
  ];

  const offerImages = [
    { src: require('../assets/res1.jpg'), text: 'Tặng 1000 suất free mừng nhà hàng mới' },
    { src: require('../assets/res2.jpg'), text: 'Giảm 40% khi đặt chỗ vào buổi trưa' },
    { src: require('../assets/res3.jpg'), text: 'Kichi kichi tặng buffet  0 đồng' },
    { src: require('../assets/res4.jpg'), text: 'Đi càng đông giảm giá càng nhiều' },
    { src: require('../assets/res5.jpg'), text: 'Cuốn cả Hà Nội với voucher 200k!' },
  ];

  const PartnerOffers = [
    { image: require('../assets/h1.jpg'), text: 'VN khao lớn khi đặt bàn tại nhà hàng' },
    { image: require('../assets/h2.jpg'), text: 'Giảm 30% cho hóa đơn từ 500k ' },
    { image: require('../assets/h3.jpg'), text: 'Mua 1 tặng 1 cho mọi thực đơn tại nhà hàng ' },
    { image: require('../assets/h4.jpg'), text: 'Buffet chỉ 199k/người thanh toán qua VP' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    Animated.loop(
      Animated.timing(scrollX, {
        toValue: 1,
        duration: 5000,
        useNativeDriver: true,
      })
    ).start();
  }, [scrollX]);

  const renderImage = ({ item, index }) => {
    const inputRange = [(index - 1) * 300, index * 300, (index + 1) * 300];
    const opacity = scrollX.interpolate({
      inputRange,
      outputRange: [0.3, 1, 0.3],
      extrapolate: 'clamp',
    });

    const handlePressIn = () => {
      setImageScale({ ...imageScale, [index]: 1.2 });
    };

    const handlePressOut = () => {
      setImageScale({ ...imageScale, [index]: 1 });
    };

    return (
      <TouchableOpacity
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={1}
        style={{ transform: [{ scale: imageScale[index] || 1 }] }}
      >
        <Animated.View style={{ opacity }}>
          <Image source={item} style={styles.image} resizeMode="cover" />
        </Animated.View>
      </TouchableOpacity>
    );
  };

  const handleOfferPress = (item) => {
    // Xử lý sự kiện nhấn vào ảnh ưu đãi ở đây
    alert(item.text);
  };

  const renderOfferImage = ({ item }) => (
    <TouchableOpacity onPress={() => handleOfferPress(item)}>
      <View style={styles.offerItem}>
        <Image source={item.src} style={styles.offerImage} />
        {item.text ? <Text style={styles.offerText}>{item.text}</Text> : null}
      </View>
    </TouchableOpacity>
  );

  const renderPartnerOffer = ({ item }) => (
    <View style={styles.partnerOfferItem}>
      <Image source={item.image} style={styles.partnerOfferImage} />
      <Text style={styles.partnerOfferText}>{item.text}</Text>
    </View>
  );

  const BookingIcon = <Icon name="calendar" size={24} color="green" />;
  const RestaurantIcon = <FontAwesome5 name="map-marker-alt" size={24} color="green" />;
  const CallFoodIcon = <Icon name="phone" size={24} color="green" />;
  const MarketIcon = <Icon name="shopping-cart" size={24} color="green" />;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Booking')}>
          <Text style={styles.iconText}>{BookingIcon} Đặt Bàn</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Finding')}>
          <Text style={styles.iconText}>{RestaurantIcon} Tìm Nhà Hàng</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Call')}>
          <Text style={styles.iconText}>{CallFoodIcon} Gọi Đồ Ăn</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Shopping')}>
          <Text style={styles.iconText}>{MarketIcon} Đi Chợ</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.carouselContainer}>
        <FlatList
          data={images}
          renderItem={renderImage}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={(event) => {
            const slideIndex = Math.floor(
              event.nativeEvent.contentOffset.x / event.nativeEvent.layoutMeasurement.width
            );
            setCurrentImageIndex(slideIndex);
          }}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: true }
          )}
        />
      </View>

      <View style={styles.offersContainer}>
        <Text style={styles.header}>Ưu Đãi Siêu Hời</Text>
        <FlatList
          data={offerImages}
          renderItem={renderOfferImage}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.offerList}
        />
      </View>

      <View style={styles.partnerOffersContainer}>
        <Text style={styles.header}>Ưu Đãi Đối Tác</Text>
        <FlatList
          data={PartnerOffers}
          renderItem={renderPartnerOffer}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.partnerOfferList}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFE4E1',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  iconButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#CC99CC',
    padding: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 2,
  },
  iconText: {
    marginLeft: 5,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000033',
  },
  carouselContainer: {
    height: 200,
    marginBottom: 20,
  },
  image: {
    width: 300,
    height: 200,
    borderRadius: 10,
    margin: 5,
  },
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#888',
    margin: 5,
  },
  paginationDotActive: {
    backgroundColor: '#333',
  },
  offersContainer: {
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
  },
  offerList: {
    alignItems: 'center',
  },
  offerItem: {
    alignItems: 'center',
    marginHorizontal: 10, // Thêm khoảng trắng giữa các ảnh
  },
  offerImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  offerText: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
    width: 150, // Đảm bảo chiều dài bằng với ảnh
    textAlign: 'center', // Canh giữa văn bản
  },
  partnerOffersContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  partnerOfferList: {
    alignItems: 'center',
  },
  partnerOfferItem: {
    alignItems: 'center',
    marginHorizontal: 10, // Thêm khoảng trắng giữa các ảnh
  },
  partnerOfferImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  partnerOfferText: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
    width: 150, // Đảm bảo chiều dài bằng với ảnh
    textAlign: 'center', // Canh giữa văn bản
  },
});

export default HomeScreen;
