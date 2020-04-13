import React, {Component} from 'react';
import axios from 'axios';
import {View, Text, Button} from 'react-native';

class EachUnavailableParticipation extends Component{
  constructor(props) {
    super(props);
    this.state = {
        id:props.id,
        name:props.name,
        place:props.place,
        time:props.time,
        category:props.category,
        detail:props.detail,
        moreVisible:true,
        lessVisible:false,
    };
    this.handleMore=this.handleMore.bind(this);
    this.handleLess=this.handleLess.bind(this);
  };

  componentDidMount() {
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
                      moreVisible:true,
                      lessVisible:false,
                    });
    }
  

  handleMore(){
    this.setState({moreVisible:false, lessVisible:true})
  }

  handleLess(){
    this.setState({moreVisible:true, lessVisible:false})
  }

  render(){
    return (
            <View style={{ margin: 10 }}>
              <Text style={{fontSize:25,fontWeight: 'bold'}}>{this.state.name}</Text>
              <Text style={{ color:"red"}}>Unavailable</Text>
              <Text style={{fontSize:20}}>{this.state.place}</Text>
              <Text style={{fontSize:20}}>{this.state.time}</Text>
              <Text style={{fontSize:20}}>{this.state.category}</Text>
              <Text style={{fontSize:20}}>Number of Participators: {this.state.participatorNum}</Text>
              {this.state.lessVisible && (
                <Text style={{fontSize:20}}>{this.state.detail}</Text>
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
            </View>
    )
  }
}

export default EachUnavailableParticipation