import React,{ setState } from 'react';
import {View, Text, TextInput, Button} from 'react-native';
// import {createBrowserHistory} from 'history'
import axios from 'axios';
// import '../css/style.css'

// const history = createBrowserHistory()
 
class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            users: [],
            username: '',
            password: '',
            showNotice: 'none'
        };
        this.login = this.login.bind(this);
        // this.handleClickBtn = this.handleClickBtn.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

  // const [value, onChangeText] = useState('Username');

//     componentDidMount() {
//         axios.get("http://localhost:5001/active_status").then(res => {
//             if(res.data.data.active_status){
//               history.push("/event");
//               history.go();
//             }
//         }).catch(err => {
//             console.log(err);
//         });
//       }

  login(event) {
      console.log("here")
      event.preventDefault();
      const data = {
          'username': this.state.username,
          'password': this.state.password,
      };
      console.log(data)
      axios.post("http://10.0.2.2:5001/login",data).then(res => {
          if(res.data.status==='login success'){
            // history.push("/event");
            // history.go();
          }else{
            this.setState({showNotice:"inline"})
          }
      }).catch(err => {
          console.log(err);
      });
  };

//     handleClickBtn() {
//         history.push("/register");
//         history.go();
//    }

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
            <TextInput
              secureTextEntry={true} 
              value={this.state.password}
              name="password"
              placeholder="password"
              onChangeText={(txt) => this.handleChange("password", txt)}
            />
            <Button title="submit" onPress={this.login}/>
          </View>
      );
//         return (
//           <div class="login">
//             <h1 class="title">Login</h1>
//             <form onSubmit={this.login}>
//               <div className="form-group">
//                 <input
//                   class="register-textinput"
//                   type="text" name="username"
//                   placeholder="Enter your username"
//                   required
//                   onChange={this.handleChange}
//                 />
//               </div>
//               <div className="form-group">
//                 <input
//                   class="register-textinput"
//                   name="password"
//                   type="password"
//                   placeholder="Enter your password"
//                   required
//                   onChange={this.handleChange}
//                 />
//               </div>
//                 <button type="submit" class="button">Submit</button>
//                 <div>
//                   <a onClick={this.handleClickBtn}>Don't have account? Register Here</a>
//                 </div>
//             </form>
//                   <h4 style={{display:this.state.showNotice}}>Cannot find user. Please try again or register</h4>
//           </div>
//         );
    // }
}
}
 
export default Login;