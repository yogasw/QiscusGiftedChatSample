/**
 * Created on : 08/03/20
 * Author     : arioki
 * Name       : Yoga Setiawan
 * GitHub     : https://github.com/arioki
 */

import React from 'react';
import {Button, TextInput, ToastAndroid, View} from 'react-native';
import * as Qiscus from '../Services/qiscus';

class LoginScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      username: 'yoga',
      password: 'yoga',
    };
  }
  componentDidMount() {
    this.subscription = Qiscus.login$()
      .map(data => data.user)
      .subscribe({
        next: data => {
          this.setState({loading: false});
          this.props.navigation.navigate('HomeScreen');
        },
      });
    this.subscription2 = Qiscus.loginError$().subscribe({
      next: data => {
        this.setState({loading: false});
        ToastAndroid.show('Login Gagal', ToastAndroid.SHORT);
      },
    });
  }
  componentWillUnmount() {
    this.subscription && this.subscription.unsubscribe();
    this.subscription2 && this.subscription2.unsubscribe();
  }

  submitLoginForm = () => {
    const {username, password} = this.state;
    Qiscus.qiscus.setUser(username, password).catch(() => {
      ToastAndroid.show('Login Gagal', ToastAndroid.SHORT);
    });
  };
  render() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <TextInput
          editable
          maxLength={40}
          placeholder={'Input Username'}
          onChangeText={username => this.setState({username})}
        />
        <TextInput
          editable
          maxLength={40}
          placeholder={'Input Password'}
          onChangeText={password => this.setState({password})}
        />
        <Button title={'Login'} onPress={() => this.submitLoginForm()} />
      </View>
    );
  }
}

export default LoginScreen;
