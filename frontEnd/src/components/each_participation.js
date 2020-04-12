import React, {Component} from 'react';
import {View, Text, Button} from 'react-native';
import axios from 'axios';

class EachParticipation extends Component{
  constructor(props) {
    super(props);
    this.state = {
        id:props.id,
        name:props.name,
        place:props.place,
        time:props.time,
        category:props.category,
        detail:props.detail,
        connect_status:props.connect_status,
        is_active:props.is_active,
        joinStatus:"",
        moreVisible:true,
        lessVisible:false,
        joinStatusDisplay:"",
        expireDisplay:"",
        participatorNum:""
    };
    this.handleMore=this.handleMore.bind(this);
    this.handleLess=this.handleLess.bind(this);
    this.handleClickJoin=this.handleClickJoin.bind(this);
    this.isAvailable=this.isAvailable.bind(this)
  };

  isAvailable(){
    let a = new Date(Date.parse(this.state.time));
    let b= new Date();
    let aTimes = a.getTime();
    let bTimes = b.getTime();

    if (aTimes>=bTimes) {
      this.setState({joinStatusDisplay:true});
      this.setState({expireDisplay:false});
    }else{
      this.setState({joinStatusDisplay:false});
      this.setState({expireDisplay:true});
    }
  }

  componentDidMount() {
    if(this.state.connect_status){
      this.setState({joinStatus:"Quit"})
    }else{
      this.setState({joinStatus:"Join in"})
    }

    this.isAvailable();

    const data = {
        'event_id': this.state.id
    };

    axios.post("http://10.0.2.2:5001/see_participator", data).then(res => {
        this.setState({participatorNum:res.data.data.length})
    }).catch(err => {
        console.log(err);
    });
  }

  componentWillReceiveProps(props) {
      this.setState({ 
                      id:props.id,
                      name:props.name,
                      place:props.place,
                      time:props.time,
                      category:props.category,
                      detail:props.detail,
                      connect_status:props.connect_status,
                      joinStatus:'quit',
                      moreVisible:true,
                      lessVisible:false,
                    });
      if(this.state.connect_status){
        this.setState({joinStatus:"Quit"})
      }else{
        this.setState({joinStatus:"Join in"})
      }
      
      this.isAvailable();
    }
  

  handleMore(){
    this.setState({moreVisible:false, lessVisible:true})
  }

  handleLess(){
    this.setState({moreVisible:true, lessVisible:false})
  }

  handleClickJoin(){
      if(this.state.joinStatus==='Join in'){
      const data = {
        'event_id': this.state.id
      };

      axios.post("http://localhost:5001/join",data).then(res => {
      }).catch(err => {
          console.log(err);
      });

      this.setState({joinStatus:"Quit"})
    }else{
      const data = {
        'event_id': this.state.id
      };

      axios.post("http://localhost:5001/quit",data).then(res => {
          this.props.refresh();
      }).catch(err => {
          console.log(err);
      });
      this.setState({joinStatus:"Join in"})
    }
  }

  render(){
    return (
            <View>
              <Text>{this.state.name}</Text>
              <Text>{this.state.place}</Text>
              <Text>{this.state.time}</Text>
              {this.state.expireDisplay && (
                <Text style={{color:"red"}}>Expired</Text>
              )}
              <Text>{this.state.category}</Text>
              <Text>Number of Participators: {this.state.participatorNum}</Text>
              {this.state.lessVisible && (
                <Text>{this.state.detail}</Text>
              )}
              {this.state.moreVisible &&(
                <Button title="More" onPress={this.handleMore}/>
              )}
              {this.state.lessVisible &&(
                <Button title="Less" onPress={this.handleLess}/>
              )}
              {this.state.joinStatusDisplay &&(
                <Button title={this.state.joinStatus} onPress={this.handleClickJoin}/>
              )}
            </View>
    )
  }
}

export default EachParticipation