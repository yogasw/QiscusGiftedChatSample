/**
 * Created on : 08/03/20
 * Author     : arioki
 * Name       : Yoga Setiawan
 * GitHub     : https://github.com/arioki
 */

import React from 'react';
import {View} from 'react-native';
import TextPrimary from '../Coomponent/Text/TextPrimary';

//TODO
class HomeScreen extends React.Component {
  static navigationOptions = ({navigation}) => {
    return {
      headerTitle: 'selamat datang',
      headerRight: <TextPrimary text={'masuk'} />,
    };
  };
  constructor() {
    super();
  }

  componentDidMount() {}

  render() {
    return (
      <View style={{flex: 1}}>
        <TextPrimary text={'yo'} />
      </View>
    );
  }
}

export default HomeScreen;
