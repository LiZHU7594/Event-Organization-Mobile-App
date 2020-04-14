import React, {Component} from 'react';
import {View, Text, Button, DeviceEventEmitter} from 'react-native';
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
        joinStatusDisplay:false,
        expireDisplay:false,
        participatorNum:""
    };
    this.handleMore=this.handleMore.bind(this);
    this.handleLess=this.handleLess.bind(this);
    this.handleClickJoin=this.handleClickJoin.bind(this);
    this.isAvailable=this.isAvailable.bind(this);
    this.startEmit = this.startEmit.bind(this);
  };

  startEmit() {
    DeviceEventEmitter.emit('participationChangeJoin');
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
      axios.post("http://10.0.2.2:5001/join",data).then(res => {
        this.startEmit()
      }).catch(err => {
          console.log(err);
      });

      this.setState({joinStatus:"Quit"})
    }else{
      const data = {
        'event_id': this.state.id
      };

      axios.post("http://10.0.2.2:5001/quit",data).then(res => {
        this.startEmit()
          this.props.refresh();
      }).catch(err => {
          console.log(err);
      });
      this.setState({joinStatus:"Join in"})
    }
  }

  render(){
    return (
            <View style={{ margin: 10 }}>
              <Text style={{fontSize:25,fontWeight: 'bold'}}>{this.state.name}</Text>
              <Text style={{fontSize:20}}>{this.state.place}</Text>
              <Text style={{fontSize:20}}>{this.state.time}</Text>
              {this.state.expireDisplay && (
                <Text style={{color:"red"}}>Expired</Text>
              )}
              <Text style={{fontSize:20}}>{this.state.category}</Text>
              <Text style={{fontSize:20}}>Number of Participators: {this.state.participatorNum}</Text>
              {this.state.lessVisible && (
            <View style={{marginTop:5,fontSize:20}}>
                <Text style={{fontSize:20, color:'blue'}}>{this.state.detail}</Text>
            </View>
              )}
              {this.state.moreVisible &&(
            <View style={{marginTop:5}}>
                <Button title="More" onPress={this.handleMore}/>
            </View>
              )}
              {this.state.lessVisible &&(
            <View style={{marginTop:5}}>
                <Button title="Less" onPress={this.handleLess}/>
            </View>
              )}
              {this.state.joinStatusDisplay &&(
            <View style={{marginTop:5}}>
                <Button title={this.state.joinStatus} onPress={this.handleClickJoin}/>
            </View>
              )}
              
            </View>
    )
  }
}

export default EachParticipation