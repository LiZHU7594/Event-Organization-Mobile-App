import React,{ setState } from 'react';
import {View, Text, TextInput, Button} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import axios from 'axios';
// import '../css/style.css'

class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            users: [],
            username: '',
            password: '',
            warningStatus:false,
            userUnavailable: false,
        };
        this.login = this.login.bind(this);
        this.gotoRegister = this.gotoRegister.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

  login(event) {
      let usernameFilled = false;
      let passwordFilled = false;
      if(this.state.username===""){
        usernameFilled=false;
      }else{
        usernameFilled=true;
      }
      if(this.state.password===""){
        passwordFilled=false;
      }else{
        passwordFilled=true;
      }

      if (usernameFilled && passwordFilled) {
        event.preventDefault();
        const data = {
            'username': this.state.username,
            'password': this.state.password,
        };
        axios.post("http://10.0.2.2:5001/login",data).then(res => {
          console.log(res.data)
            if(res.data.status==='login success'){
              this.props.navigation.navigate('Event')
            }else{
              this.setState(() => ({ 'userUnavailable': true }));
            }
        }).catch(err => {
            console.log(err);
        });
    }else{
      this.setState(() => ({ 'warningStatus': true }));
    }
  };

    gotoRegister() {
        this.props.navigation.navigate('Register')
   }

    handleChange(name, value) {
      this.setState(() => ({ [name]: value }));
    }

    render(){
      return (
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <TextInput
              value={this.state.username}
              name="username"
              placeholder="username"
              onChangeText={(txt) => this.handleChange("username", txt)}
            />
            {!!this.state.nameError && (
              <Text style={{color: 'red'}}>
                {this.state.nameError}
              </Text>
            )}
            <TextInput
              secureTextEntry={true} 
              value={this.state.password}
              name="password"
              placeholder="password"
              onChangeText={(txt) => this.handleChange("password", txt)}
            />
            {
              this.state.warningStatus && (
                <Text style={{ color:"red"}}>Please fill in all fields</Text>
            )}
            {
              this.state.userUnavailable && (
                <Text style={{ color:"red"}}>Cannot find user. Please try again or register</Text>
            )}
            <Button title="Submit" onPress={this.login}/>
            <Button title="Register" onPress={this.gotoRegister}/>
          </View>
      );
    }
}
 
export default Login;