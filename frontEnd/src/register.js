import React, {Component} from 'react';
import {View, Text, TextInput, Button} from 'react-native';
import axios from 'axios';

class Register extends Component{
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            username: '',
            email: '',
            password: '',
            showSuccess:false,
            showFill: false,
            showTryAgain:false
        };
        this.register = this.register.bind(this);
        this.gotoLogin = this.gotoLogin.bind(this);
        this.handleChange = this.handleChange.bind(this);
    };

    gotoLogin() {
        this.props.navigation.navigate('Login');
    }

    register(event) {
        let allFilled = true;
        if(this.state.username===""){
          allFilled=false;
        }
        if(this.state.emailname===""){
          allFilled=false;
        }
        if(this.state.password===""){
          allFilled=false;
        }

        if (allFilled) {
        event.preventDefault();
        const data = {
            'username': this.state.username,
            'email': this.state.email,
            'password': this.state.password,
        };

        axios.post("http://10.0.2.2:5001/register",data).then(res => {
            if(res.data.status==='register success'){
              this.setState({showFill: false });
              this.setState({showTryAgain:false})
              this.setState({showSuccess:true})
              if(this.timer){
                clearTimeout(this.time);
              }
              this.timer = setTimeout(()=>{
                this.props.navigation.navigate('Event')
              },3000)
            }

            if(res.data.status==='register fail'){
              this.setState({showFill:false})
              this.setState({showTryAgain:true})
            }
        }).catch(err => {
            console.log(err);
        });
      }else{
        this.setState({showTryAgain: false });
        this.setState({showFill: true });
      }
    }

    handleChange(name, value) {
      this.setState(() => ({ [name]: value }));
    }

    render(){
      return(
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text style={{fontSize:35,fontWeight: 'bold',}}>Register</Text>
          <TextInput
            style={{backgroundColor:'#d6d6d6',borderRadius: 5,marginTop: 5, width: 120}}
            value={this.state.username}
            name="username"
            placeholder="username"
            onChangeText={(txt) => this.handleChange("username", txt)}
          />
          <TextInput
            style={{backgroundColor:'#d6d6d6',borderRadius: 5,marginTop: 5, width: 120}}
            value={this.state.email}
            name="email"
            placeholder="email"
            onChangeText={(txt) => this.handleChange("email", txt)}
          />
          <TextInput
            style={{backgroundColor:'#d6d6d6',borderRadius: 5,marginTop: 5, width: 120}}
            secureTextEntry={true} 
            value={this.state.password}
            name="password"
            placeholder="password"
            onChangeText={(txt) => this.handleChange("password", txt)}
          />
            {
              this.state.showFill && (
                <Text style={{ color:"red"}}>Please fill in all fields</Text>
            )}
            {
              this.state.showTryAgain && (
                <Text style={{ color:"red"}}>Repeated name. Please Try again.</Text>
            )}
            {
              this.state.showSuccess && (
                <Text>Register success. Now redirect to event page</Text>
            )}
            <View style={{marginTop:5}}>
              <Button title="Register" onPress={this.register}/>
            </View>
          <Text onPress={this.gotoLogin}>Already hava account? Click here to login</Text>
        </View>
        )
    };
}

export default Register