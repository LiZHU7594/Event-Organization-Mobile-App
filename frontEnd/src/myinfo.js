import React, {Component} from 'react';
import {View, Text, TextInput, Button} from 'react-native';
import axios from 'axios';
import Logout from './logout';

class Myinfo extends Component{
  constructor(props) {
    super(props);
  };

  gotoCreation(){
    console.log(this.props)
      this.props.navigation.navigate('Creation');
  }

  gotoParticipation(){
      this.props.navigation.navigate('Participation');
  }

  render(){
  	return (
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Logout/>
            <Button title="My Creation" onPress={this.gotoCreation}/>
            <Button title="My Participation" onPress={this.gotoParticipation}/>
          </View>
  		)
  }
}

export default Myinfo