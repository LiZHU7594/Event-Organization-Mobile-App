import React, {Component} from 'react';
import {ScrollView, Text, TextInput, Button, View, DeviceEventEmitter} from 'react-native';
import axios from 'axios';
import CreateEvent from './components/create_event.js'
import SearchAndFliter from './components/search_and_filter.js'
import ShowCreation from './components/show_creation.js'

class Creation extends Component{
  constructor() {
    super();
    this.state = {
      eventList: [],
      eventNum: '',
      eventSentence: "",
      layerVisible: false,
      buttonVisible: true,
      page: 'creation',
    };
    this.handleClick = this.handleClick.bind(this)
    this.getData = this.getData.bind(this)
  };

  componentDidMount(){
    this.listener = DeviceEventEmitter.addListener('createEvent', () => {
      this.getData();
      this.forceUpdate();
    })

    this.getData();
  }

  componentWillUnmount() {
    if (this.listener) {
      this.listener.remove();
    }
  }

  getData(){
    axios.get("http://10.0.2.2:5001/creation").then(res => {
        if(res.status===200){
          if(res.data.data.eventNum<2){
            const event_sentence = 'Here is ' + res.data.data.eventNum + " event."
            this.setState({'eventNum':res.data.data.eventNum,
                            'eventSentence':event_sentence,
                            'eventList':res.data.data.eventList})
          }else{
            const event_sentence = 'Here are ' + res.data.data.eventNum + " events."
            this.setState({'eventNum':res.data.data.eventNum,
                            'eventSentence':event_sentence,
                            'eventList':res.data.data.eventList})
          }
        }
    }).catch(err => {
        console.log(err);
    });
  }

  handleClick(event){
    this.setState({ layerVisible: true })
    this.setState({ buttonVisible: false })
  }

  handleGet(val1,val2){
    this.setState({ buttonVisible: true })
    this.setState({ layerVisible: false })
    this.setState({ eventSentence: val1 })
    this.setState({ eventList: val2 })
  }

  handleSearch(val1,val2){
    this.setState({ eventList: val1 })
    this.setState({ eventNum: val2 })

    if(this.state.eventNum<2){
      const event_sentence = 'Here is ' + this.state.eventNum + " event."
      this.setState({'eventSentence':event_sentence})
    }else{
      const event_sentence = 'Here are ' + this.state.eventNum + " events."
      this.setState({'eventSentence':event_sentence})
    }
  }

  handleClickCancel(){
    this.setState({ buttonVisible: true })
    this.setState({ layerVisible: false })
  }

  render(){
    return (
    <ScrollView>
      <SearchAndFliter handleEventSearch={this.handleSearch.bind(this)} page={this.state.page}/>
        {this.state.buttonVisible &&(
          <Button title="Create Event" color="#ffd391" onPress={this.handleClick} />
        )}
      <CreateEvent eventNum={this.state.eventNum} visible={this.state.layerVisible}  handleCancel ={this.handleClickCancel.bind(this)} handleValue={this.handleGet.bind(this)} page={this.state.page}/>
      <Text style={{fontSize:35,fontWeight: 'bold',textAlign: 'center'}}>Your creations</Text>
      <Text style={{fontSize:35,fontWeight: 'bold',textAlign: 'center'}}>{this.state.eventSentence}</Text>
      <ShowCreation eventList={this.state.eventList} />
    </ScrollView>
      )
  }
}

export default Creation