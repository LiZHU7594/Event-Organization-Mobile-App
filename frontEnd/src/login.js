import React,{ setState } from 'react';
import {View, Text, TextInput, Button, DeviceEventEmitter} from 'react-native';
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
          showLoginPage: true, 
          showNotie: false
      };
      this.login = this.login.bind(this);
      this.gotoRegister = this.gotoRegister.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.goBack = this.goBack.bind(this);
  }

  componentDidMount(){
    this.listener = DeviceEventEmitter.addListener('changeLoginStatus', (message) => {
      this.setState({showLoginPage:message.showLoginPage,showNotie:message.showNotie})
    })
  }

  componentWillUnmount() {
    if (this.listener) {
      this.listener.remove();
    }
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
            if(res.data.status==='login success'){
              this.props.navigation.navigate('Tab')
              this.setState({showLoginPage:false, showNotie: true})
              this.setState({username: '', password: ''})
              this.setState({ 'warningStatus': false,'userUnavailable': false });
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
        this.forceUpdate();
   }

    handleChange(name, value) {
      this.setState(() => ({ 'warningStatus': false }));
      this.setState(() => ({ [name]: value }));
    }

  goBack(){
    this.props.navigation.navigate('Tab')
  }

    render(){
      // console.log(this.props.route.params.showNotie)
      return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        { this.state.showLoginPage && (
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text style={{fontSize:35,fontWeight: 'bold'}}>Login</Text>
            <TextInput
              style={{backgroundColor:'#d6d6d6',borderRadius: 5,marginTop: 5, width: 120}}
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
              style={{backgroundColor:'#d6d6d6',borderRadius: 5,marginTop: 5, width: 120}}
              secureTextEntry={true} 
              value={this.state.password}
              name="password"
              placeholder="password"
              onChangeText={(txt) => this.handleChange("password", txt)}
            />
            {this.state.warningStatus && (
                <Text style={{ color:"red"}}>Please fill in all fields</Text>
            )}
            {this.state.userUnavailable && (
                <Text style={{ color:"red"}}>Check your username or password</Text>
            )}
            <View style={{marginTop:5}}>
              <Button title="Login" onPress={this.login}/>
            </View>
            <View style={{marginTop:5}}>
              <Button title="Register" onPress={this.gotoRegister}/>
            </View>
          </View>)}
        { this.state.showNotie && (
          <View>
          <Text style={{fontSize:25,fontWeight: 'bold'}}>You have already logged in</Text>
          <Button title="GoBack" onPress={this.goBack}/>
          </View>)}
        </View>
      );
    }
}
 
export default Login;