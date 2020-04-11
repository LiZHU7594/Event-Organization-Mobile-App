import React, {Component} from 'react';
import {View, Text, TextInput, Button} from 'react-native';
import axios from 'axios';

class Logout extends Component{
  constructor() {
    super();
    this.logout = this.logout.bind(this);
  };

  logout(){
      axios.post("http://10.0.2.2:5001/logout").then(res => {
        this.props.navigation.navigate('Login')
      }).catch(err => {
          console.log(err);
      });
  }

  render(){
  	return (
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Button title="Logout" onPress={this.logout}/>
          </View>
  		)
  }
}

export default Logout