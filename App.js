import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import AccountScreen from './screens/AccountScreen';
import ProfileScreen from './screens/ProfileScreen';
import BrandScreen from './screens/BrandScreen';
import BookingScreen from './screens/BookingScreen';
import BookingInfoScreen from './screens/BookingInfoScreen';
import Finding from './screens/Finding';
import Shopping from './screens/Shopping';
import Call from './screens/Call';
import { Ionicons } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons';

const BottomTab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} /> 
    <Stack.Screen name="BookingInfo" component={BookingInfoScreen} options={{ headerShown: false, headerBackTitleVisible: false, headerBackTitle: 'Back' }} /> 
    <Stack.Screen name="Booking" component={BookingScreen} options={{ headerShown: true, headerBackTitleVisible: false, headerBackTitle: 'Back' }} />
    <Stack.Screen name="Finding" component={Finding} options={{ headerShown: true, headerBackTitleVisible: false, headerBackTitle: 'Back' }} />
    <Stack.Screen name="Call" component={Call} options={{ headerShown: true, headerBackTitleVisible: false, headerBackTitle: 'Back' }} />
    <Stack.Screen name="Shopping" component={Shopping} options={{ headerShown: true, headerBackTitleVisible: false, headerBackTitle: 'Back' }} />
    <Stack.Screen name="Profile" component={ProfileScreen} options={{ heheaderShown: true }} /> 
    <Stack.Screen name="Account" component={AccountScreen} options={{ heheaderShown: true }} /> 
  </Stack.Navigator>

);

const App = () => {
  const [isRegistered, setIsRegistered] = useState(null);
  console.log(process.env.BACKEND_HOST)
  useEffect(() => {
    const checkRegistration = async () => {
      const storedEmail = await AsyncStorage.getItem('user_email');
      setIsRegistered(!!storedEmail); 
    };

    checkRegistration();
  }, []);

  if (isRegistered === null) {
    return null; 
  }

  return (
    <NavigationContainer>
        <BottomTab.Navigator>
          <BottomTab.Screen
            name="Trang chủ"
            component={HomeStack}
            options={{
              headerShown: false,
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="home" size={size} color={'pink'} />
              ),
            }}
          />
          <BottomTab.Screen
            name="Thương hiệu"
            component={BrandScreen}
            options={{
              headerShown: false,
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="form-select" size={size} color={'pink'} />
              ),
            }}
          />
          <BottomTab.Screen
            name="Tài khoản"
            component={AccountScreen}
            options={{
              headerShown: false,
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="person" size={size} color={'pink'} />
              ),
            }}
          />
        </BottomTab.Navigator>
    </NavigationContainer>
  );
};

export default App;

