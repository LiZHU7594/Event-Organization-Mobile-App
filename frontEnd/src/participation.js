import React, {Component} from 'react';
import {ScrollView, Text, TextInput, Button, View, DeviceEventEmitter} from 'react-native';
import axios from 'axios';
import SearchAndFliter from './components/search_and_filter.js'
import ShowParticipation from './components/show_participations.js'
import ShowUnavailableParticipation from './components/show_unavailable_participation.js'
import Logout from './logout';

class Participation extends Component{
  constructor(props) {
    super(props);
    this.state = {
      eventList: [],
      eventListUnavailable: [],
    	eventNum: '',
      eventSentence: "",
      layerVisible: false,
      buttonVisible: true,
      page: 'participation',
    };
    this.handleClick = this.handleClick.bind(this)
    this.getData = this.getData.bind(this)
  };

  componentDidMount(){
      this.listener = DeviceEventEmitter.addListener('eventChangeJoin', () => {
      this.getData();
      this.forceUpdate();
    })
      this.listener = DeviceEventEmitter.addListener('changeActiveStatus', () => {
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
    axios.get("http://10.0.2.2:5001/participation").then(res => {
        if(res.status===200){
          if(res.data.data.eventNum<2){
            const event_sentence = 'Here is ' + res.data.data.eventNum + " available event."
            this.setState({'eventNum':res.data.data.eventNum,
                            'eventSentence':event_sentence,
                            'eventList':res.data.data.eventList,
                            'eventListUnavailable':res.data.data.eventListUnavailable})
          }else{
            const event_sentence = 'Here are ' + res.data.data.eventNum + " available events."
            this.setState({'eventNum':res.data.data.eventNum,
                            'eventSentence':event_sentence,
                            'eventList':res.data.data.eventList,
                            'eventListUnavailable':res.data.data.eventListUnavailable})
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

  handleGet(val){
    this.setState({ buttonVisible: true })
    this.setState({ layerVisible: false })
    this.setState({ eventSentence: val })
  }

  handleSearch(val1,val2,val3){
    this.setState({ eventList: val1 })
    this.setState({ eventNum: val2 })
    this.setState({ eventListUnavailable: val3 })

    if(this.state.eventNum<2){
      const event_sentence = 'Here is ' + this.state.eventNum + " available event."
      this.setState({'eventSentence':event_sentence})
    }else{
      const event_sentence = 'Here are ' + this.state.eventNum + " available events."
      this.setState({'eventSentence':event_sentence})
    }
  }

  handleClickCancel(){
    this.setState({ buttonVisible: true })
    this.setState({ layerVisible: false })
  }

  refresh(){
      axios.get("http://10.0.2.2:5001/participation").then(res => {
          if(res.status==200){
            if(res.data.data.eventNum<2){
              const event_sentence = 'Here is ' + res.data.data.eventNum + " available event."
              this.setState({'eventNum':res.data.data.eventNum,
                              'eventSentence':event_sentence,
                              'eventList':res.data.data.eventList,
                              'eventListUnavailable':res.data.data.eventListUnavailable})
            }else{
              const event_sentence = 'Here are ' + res.data.data.eventNum + " available events."
              this.setState({'eventNum':res.data.data.eventNum,
                              'eventSentence':event_sentence,
                              'eventList':res.data.data.eventList,
                              'eventListUnavailable':res.data.data.eventListUnavailable})
            }
          }
      }).catch(err => {
          console.log(err);
      });

  }

  render(){
  	return (
  		<ScrollView>
        <SearchAndFliter handleEventSearch={this.handleSearch.bind(this)} page={this.state.page}/>
  			<Text style={{fontSize:35,fontWeight: 'bold',textAlign: 'center'}}>Your participations</Text>
        <Text style={{fontSize:25,fontWeight: 'bold',textAlign: 'center'}}>{this.state.eventSentence}</Text>
        <ShowParticipation eventList={this.state.eventList} refresh={this.refresh.bind(this)}/>
        <ShowUnavailableParticipation eventList={this.state.eventListUnavailable}/>
  		</ScrollView>
  		)
  }
}

export default Participation