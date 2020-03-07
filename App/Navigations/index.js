/**
 * Created on : 08/03/20
 * Author     : arioki
 * Name       : Yoga Setiawan
 * GitHub     : https://github.com/arioki
 */

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import SplashScreen from '../Screens/SplashScreen';
import LoginScreen from '../Screens/LoginScreen';
import ChatRoomScreen from '../Screens/ChatRoomScreen';
import HomeScreen from '../Screens/HomeScreen';
import ListContactScreen from '../Screens/ListContactScreen';

const Stack = createStackNavigator();

function Navigations() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="ChatRoomScreen" component={ChatRoomScreen} />
        <Stack.Screen name="ListContactScreen" component={ListContactScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigations;
