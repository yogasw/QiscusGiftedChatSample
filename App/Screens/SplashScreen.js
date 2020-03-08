/**
 * Created on : 08/03/20
 * Author     : arioki
 * Name       : Yoga Setiawan
 * GitHub     : https://github.com/arioki
 */

import React from 'react';
import {Text, View} from 'react-native';
import * as Qiscus from '../Services/qiscus';

class SplashScreen extends React.Component {
  componentDidMount() {
    Qiscus.init();
    setTimeout(() => {
      this.props.navigation.replace('LoginScreen');
    }, 300);
  }

  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Loading..</Text>
      </View>
    );
  }
}

export default SplashScreen;
