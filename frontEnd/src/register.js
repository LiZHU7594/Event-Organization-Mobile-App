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
        this.handleChange = this.handleChange.bind(this);
    };

    register(event) {
        let usernameFilled = false;
        let emailFilled = false;
        let passwordFilled = false;
        if(this.state.username===""){
          usernameFilled=false;
        }else{
          usernameFilled=true;
        };
        if(this.state.emailname===""){
          emailFilled=false;
        }else{
          emailFilled=true;
        };
        if(this.state.password===""){
          passwordFilled=false;
        }else{
          passwordFilled=true;
        };

        if (usernameFilled && emailFilled && passwordFilled) {
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
          <TextInput
            value={this.state.username}
            name="username"
            placeholder="username"
            onChangeText={(txt) => this.handleChange("username", txt)}
          />
          <TextInput
            value={this.state.email}
            name="email"
            placeholder="email"
            onChangeText={(txt) => this.handleChange("email", txt)}
          />
          <TextInput
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
          <Button title="Submit" onPress={this.register}/>
        </View>
        )
        // return (
        //   <div class='register'>
        //     <h1 class="title">Register</h1>
        //     <form onSubmit={this.register}>
        //         <div className="form-group">
        //             <input class="login-textinput"
        //               type="text" name="username"
        //               placeholder="Enter a username"
        //               required
        //               onChange={this.handleChange}
        //             />
        //         </div>
        //         <div className="form-group">
        //             <input class="login-textinput"
        //               name="email"
        //               type="email"
        //               placeholder="Enter an email address"
        //               required
        //               onChange={this.handleChange}
        //             />
        //         </div>
        //         <div className="form-group">
        //             <input class="login-textinput"
        //               name="password"
        //               type="password"
        //               placeholder="Enter a password"
        //               required
        //               onChange={this.handleChange}
        //             />
        //         </div>
        //         <button type="submit" class="button">Submit</button>
        //         <div style={{display:this.state.showNotice}}>
        //             <h4>Register success. Now redirect to event page</h4>
        //         </div>
        //         <div style={{display:this.state.showTryAgain}}>
        //             <h4>Repeated name. Please Try again.</h4>
        //         </div>
        // </form>
        // </div>
        // )
    };
}

export default Register