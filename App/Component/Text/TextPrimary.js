/**
 * Created on : 08/03/20
 * Author     : arioki
 * Name       : Yoga Setiawan
 * GitHub     : https://github.com/arioki
 */
import React, {Component} from 'react';
import {Text} from 'react-native';

class TextPrimary extends Component {
  constructor(props) {
    super();
  }
  render() {
    const {text, style} = this.props;

    return <Text style={style}> {text} </Text>;
  }
}
export default TextPrimary;
