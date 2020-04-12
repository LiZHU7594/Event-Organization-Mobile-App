import React, {Component} from 'react';
import {View, Text, Button} from 'react-native';
import axios from 'axios';

class EachCreation extends Component{
  constructor(props) {
    super(props);
    this.state = {
        id:props.id,
        name:props.name,
        place:props.place,
        time:props.time,
        category:props.category,
        detail:props.detail,
        is_active:props.active_status,
        operator:'',
        moreVisible:true,
        lessVisible:false,
        participators: [],
        participatorVisible: true,
        closeVisible: false,
        operatorDisplay:false,
        expireDisplay:false
    };
    this.handleMore=this.handleMore.bind(this);
    this.handleLess=this.handleLess.bind(this);
    this.handleClickOperator=this.handleClickOperator.bind(this);
    this.handleSee=this.handleSee.bind(this);
    this.handleClose=this.handleClose.bind(this);
    this.isAvailable=this.isAvailable.bind(this)
  };

  isAvailable(){
    let a = new Date(Date.parse(this.state.time));
    let b= new Date();
    let aTimes = a.getTime();
    let bTimes = b.getTime();

    if (aTimes>=bTimes) {
      this.setState({operatorDisplay:true});
      this.setState({expireDisplay:false});
    }else{
      this.setState({operatorDisplay:false});
      this.setState({expireDisplay:true});
    }
  }

  componentDidMount() {
    const data = {
        'event_id': this.state.id
    };
    if(this.state.is_active){
      this.setState({operator:"Close"})
    }else{
      this.setState({operator:"Activate"})
    }

    axios.post("http://10.0.2.2:5001/see_participator", data).then(res => {
        this.setState({participators:res.data.data})
    }).catch(err => {
        console.log(err);
    });

    this.isAvailable();
  }


  componentWillReceiveProps(props) {
    this.setState({ 
                    id:props.id,
                    name:props.name,
                    place:props.place,
                    time:props.time,
                    category:props.category,
                    detail:props.detail,
                    is_active:props.is_active,
                    moreVisible:true,
                    lessVisible:false,
                  });
    this.isAvailable();
  }
  

  handleMore(){
    this.setState({moreVisible:false, lessVisible:true})
  }

  handleLess(){
    this.setState({moreVisible:true, lessVisible:false})
  }
  

  handleSee(){
    this.setState({participatorVisible:false, closeVisible:true})
  }

  handleClose(){
    this.setState({participatorVisible:true, closeVisible:false})
  }

  handleClickOperator(){
    if(this.state.operator==="Close"){
      const data = {
        'event_id': this.state.id
      };

      axios.post("http://10.0.2.2:5001/close",data).then(res => {
      }).catch(err => {
          console.log(err);
      });

      this.setState({operator:"Activate"})
    }else{
      const data = {
        'event_id': this.state.id
      };

      axios.post("http://10.0.2.2:5001/open",data).then(res => {
      }).catch(err => {
          console.log(err);
      });
      this.setState({operator:"Close"})
    }
  }

  render(){
    return (
            <View>
              <Text>{this.state.name}</Text>
              <Text>{this.state.place}</Text>
              <Text>{this.state.time}</Text>
              {this.state.expireDisplay && (
                <Text style={{ color:"red"}}>Expired</Text>
              )}
              <Text>{this.state.category}</Text>
              {this.state.lessVisible && (
                <Text>{this.state.detail}</Text>
              )}
              {this.state.moreVisible &&(
                <Button title="More" onPress={this.handleMore}/>
              )}
              {this.state.lessVisible &&(
                <Button title="Less" onPress={this.handleLess}/>
              )}
              <View>
                {this.state.participatorVisible && (
                    <Button title="See Participator" onPress={this.handleSee}/>
                )}
                {this.state.closeVisible && (
                  <View>
                  <Text>Participators:</Text>
                    {
                      this.state.participators.map((participator) =>
                        <Text>{participator.name} </Text>
                      )
                    }
                  </View>
                )}
              </View>  
              {this.state.closeVisible && (
                  <Button title="Close Participators" onPress={this.handleClose}/>
              )}
              {this.state.operatorDisplay && (
                  <Button title={this.state.operator} onPress={this.handleClickOperator}/>
              )}   
            </View>
    )
  }
}

export default EachCreation