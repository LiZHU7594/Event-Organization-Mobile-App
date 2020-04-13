import React, {Component} from 'react';
import axios from 'axios';
import {View, Text, TextInput, Button} from 'react-native';
import DatePicker from 'react-native-datepicker'
import RNPickerSelect from 'react-native-picker-select';

class CreateEvent extends Component{
  constructor(props) {
    super(props);
    this.state = {
        name: '',
        place: '',
        time: '',
        category: 'eat',
        detail: '',
        visible:false,
        eventNum:'',
        eventSentence:'',
        showNotice:false,
        showFill: false,
        page:props.page
    };
    this.createEventFunc = this.createEventFunc.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCancel = this.handleCancel.bind(this)
  };

  componentWillReceiveProps(props) {
    this.setState({ visible: props.visible })
  }

  createEventFunc(event){
        let allFilled = true;
        if(this.state.name===""){
          allFilled=false;
        }
        if(this.state.place===""){
          allFilled=false;
        }
        if(this.state.detail===""){
          allFilled=false;
        }

        if(allFilled){
          event.preventDefault();
          const data = {
              'name': this.state.name,
              'place': this.state.place,
              'time': this.state.time,
              'category': this.state.category,
              'detail': this.state.detail,
              'page':this.state.page
          };

          axios.post("http://10.0.2.2:5001/create", data).then(res => {
              if(res.data.message==="repeated name"){
                this.setState({showNotice:true})
              }else if(res.data.status==="event creation success"){
                let eventNum = res.data.data.eventList;
                this.setState({'eventNum':res.data.data.eventNum})
                if(res.data.data.eventNum<2){
                  const event_sentence = 'Here is ' + res.data.data.eventNum + " event."
                  this.setState({'eventSentence':event_sentence})
                  this.props.handleValue(this.state.eventSentence,eventNum)
                }else{
                  const event_sentence = 'Here are ' + res.data.data.eventNum + " events."
                  this.setState({'eventSentence':event_sentence})
                  this.props.handleValue(this.state.eventSentence,eventNum)
                }}
          }).catch(err => {
              console.log(err);
          });
        }else{
          this.setState({showFill: true });
        }
  }

  handleChange(name, value) {
    this.setState(() => ({ [name]: value }));
  }

  handleCancel(event){
    event.preventDefault();
    this.setState({visible:false})
    this.props.handleCancel()
  }

  render(){
    return (
      this.state.visible && <View style={{flex:1, flexDirection:'column', alignItems:'flex-end',marginBottom:10}}>
      <View style={{flexDirection:'row',marginRight:10}}>
        <TextInput 
          style={{backgroundColor:'#d6d6d6',borderRadius: 5,marginTop: 5, width: 105, height: 40}}
          placeholder="Name" name='name' onChangeText={(txt) => this.handleChange("name", txt)}/>
        <TextInput 
          style={{marginLeft:10,marginRight:10,backgroundColor:'#d6d6d6',borderRadius: 5,marginTop: 5, width: 105, height: 40}}
          placeholder="Place" name='place' onChangeText={(txt) => this.handleChange("place", txt)}/>
      </View>
        <RNPickerSelect
            onValueChange={(value) => this.handleChange("category", value)}
            items={[
                { label: 'Eat', value: 'eat' },
                { label: 'Leetcode', value: 'leetcode' },
                { label: 'Game', value: 'game' },
                { label: 'Other', value: 'other' },
            ]}
        />
        <DatePicker placeholder="Time" name='time' format="YYYY-MM-DD HH:mm" onChangeText={(txt) => this.handleChange("time", txt)}/>
          <TextInput 
            style={{backgroundColor:'#d6d6d6',borderRadius: 5,marginTop: 5, marginRight:10, width: 370, height: 40}}
            placeholder="Detail" name='detail' onChangeText={(txt) => this.handleChange("detail", txt)}/>
          {this.state.showFill && (
            <Text style={{ color:"red"}}>Please fill in all fields</Text>
            )}
          {this.state.showNotice && (
            <Text style={{ color:"red"}}>Repeated Name.Please try again</Text>
          )}
      <View style={{flexDirection:'row',marginTop:10, marginRight:120}}>
          <View style={{marginRight:10}}>
            <Button title="Cancel" onPress={this.handleCancel}/>
          </View>
          <Button title="Create" onPress={this.createEventFunc}/>
        </View>
      </View>
  		)
  }
}

export default CreateEvent