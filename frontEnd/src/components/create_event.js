import React, {Component} from 'react';
import axios from 'axios';
import {View, Text, TextInput, Button, DeviceEventEmitter} from 'react-native';
import DatePicker from 'react-native-datepicker'
import DateTimePicker from '@react-native-community/datetimepicker';
import RNPickerSelect from 'react-native-picker-select';

class CreateEvent extends Component{
  constructor(props) {
    super(props);
    this.state = {
        name: '',
        place: '',
        date: '',
        time: '',
        category: 'eat',
        detail: '',
        visible:false,
        eventNum:'',
        eventSentence:'',
        showNotice:false,
        showFill: false,
        page:props.page,
        showTimePicker: false,
        showDatePicker: false
    };
    this.createEventFunc = this.createEventFunc.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.showDatePicker = this.showDatePicker.bind(this);
    this.showTimePicker = this.showTimePicker.bind(this);
    this.startEmit = this.startEmit.bind(this);
  };

  componentWillReceiveProps(props) {
    this.setState({ visible: props.visible })
  }

  startEmit() {
    DeviceEventEmitter.emit('createEvent');
  };

  createEventFunc(event){
        let allFilled = true;
        if(this.state.name===""){
          allFilled=false;
        }
        if(this.state.date===""){
          allFilled=false;
        }
        if(this.state.time===""){
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
              'time': this.state.date+" "+this.state.time,
              'category': this.state.category,
              'detail': this.state.detail,
              'page':this.state.page
          };
          axios.post("http://10.0.2.2:5001/create", data).then(res => {
              if(res.data.message==="repeated name"){
                this.setState({showNotice:true})
              }else if(res.data.status==="event creation success"){
                this.startEmit();
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
    if(name==='date'){
      this.setState({showDatePicker:false}, ()=> {
        let date = new Date(value.nativeEvent.timestamp);
        let Y = date.getFullYear() + '-';
        let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        let D = date.getDate();
        this.setState(() => ({ [name]: (Y+M+D) }));
      })
    }else if(name==='time'){
      this.setState({showTimePicker:false}, ()=> {
        let time = new Date(value.nativeEvent.timestamp);
        let H = time.getHours() + ':';
        let M = time.getMinutes();
        this.setState(() => ({ [name]: (H+M) }));
      })
    }else{
      this.setState(() => ({ [name]: value }));
    }
  }

  handleCancel(event){
    event.preventDefault();
    this.setState({visible:false})
    this.props.handleCancel()
  }

  showDatePicker(){
    this.setState({showDatePicker:true})
  }

  showTimePicker(){
    this.setState({showTimePicker:true})
  }

  render(){
    return (
      this.state.visible && 
      <View style={{borderWidth:2, borderColor:'#ffd391',flex:1, flexDirection:'column', marginBottom:10}}>
      <View style={{flexDirection:'row',marginLeft:10}}>
        <TextInput 
          style={{backgroundColor:'#d6d6d6',borderRadius: 5,marginTop: 5, width: 180, height: 40}}
          placeholder="Name" name='name' onChangeText={(txt) => this.handleChange("name", txt)}/>
        <TextInput 
          style={{marginLeft:10,marginRight:10,backgroundColor:'#d6d6d6',borderRadius: 5,marginTop: 5, width: 180, height: 40}}
          placeholder="Place" name='place' onChangeText={(txt) => this.handleChange("place", txt)}/>
      </View>
        <RNPickerSelect
            onValueChange={(value) => this.handleChange("category", value)}
            placeholder={{
                label: 'Select a category',
                value: null,
            }}
            items={[
                { label: 'Eat', value: 'eat' },
                { label: 'Leetcode', value: 'leetcode' },
                { label: 'Game', value: 'game' },
                { label: 'Other', value: 'other' },
            ]}
        />
      <View style={{flexDirection:'row',marginBottom:10}}>
        <Button title="Select Date" onPress={this.showDatePicker}/>
        <Text style={{fontSize: 20}}>Date: {this.state.date}</Text>
      </View>
      <View style={{flexDirection:'row',}}>
        <Button title="Select Time" onPress={this.showTimePicker}/>
        <Text style={{fontSize: 20}}>Time: {this.state.time}</Text>
      </View>
        {this.state.showDatePicker && (
          <DateTimePicker
            value={new Date()}
            mode="date"
            onChange={(date) => this.handleChange("date", date)}
          />
        )}
        {this.state.showTimePicker && (
          <DateTimePicker
            value={new Date()}
            mode="time"
            is24Hour={true}
            onChange={(date) => this.handleChange("time", date)}
          />
        )}
          <TextInput 
            style={{backgroundColor:'#d6d6d6',borderRadius: 5,marginTop: 5, marginLeft:10, width: 370, height: 100}}
            placeholder="Detail" name='detail' onChangeText={(txt) => this.handleChange("detail", txt)}/>
          {this.state.showFill && (
            <Text style={{ color:"red"}}>Please fill in all fields</Text>
            )}
          {this.state.showNotice && (
            <Text style={{ color:"red"}}>Repeated Name.Please try again</Text>
          )}
      <View style={{flexDirection:'row',marginTop:10, marginLeft:120,marginBottom:10}}>
          <View style={{marginRight:10}}>
            <Button title="Cancel" color="#ffd391" onPress={this.handleCancel}/>
          </View>
          <Button title="Create" color="#ffd391" onPress={this.createEventFunc}/>
        </View>
      </View>
  		)
  }
}

export default CreateEvent