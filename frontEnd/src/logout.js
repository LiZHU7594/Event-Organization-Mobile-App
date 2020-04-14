import React, {Component} from 'react';
import {View, Text, TextInput, Button, DeviceEventEmitter} from 'react-native';
import axios from 'axios';
class Logout extends Component{
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
    this.startEmit = this.startEmit.bind(this);
  };

  startEmit() {
    let message = {showLoginPage: true, showNotie: false};
    console.log(message)
    DeviceEventEmitter.emit('changeLoginStatus', message);
  };

  logout(){
    this.props.navigation.navigate('Creation')
      axios.post("http://10.0.2.2:5001/logout").then(res => {
        this.props.navigation.navigate('Login')
        this.startEmit()
      }).catch(err => {
          console.log(err);
      });
  }

  render(){
  	return (
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text style={{fontSize:20}}>Are you sure to logout?</Text>
              <Button title="Logout" color='red' onPress={this.logout}/>
          </View>
  		)
  }
}

export default Logout