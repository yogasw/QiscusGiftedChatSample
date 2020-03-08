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
import {TouchableOpacity} from 'react-native';
import TextPrimary from '../Component/Text/TextPrimary';

const Stack = createStackNavigator();

function Navigations() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={({navigation, route}) => ({
            headerRight: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate('ListContactScreen')}>
                <TextPrimary text={'Add Chat'} />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen name="ChatRoomScreen" component={ChatRoomScreen} />
        <Stack.Screen name="ListContactScreen" component={ListContactScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigations;
