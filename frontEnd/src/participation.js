import React, {Component} from 'react';
import {View, Text, TextInput, Button} from 'react-native';
// import {createBrowserHistory} from 'history'
// import axios from 'axios';
// import Logout from './components/logout.js'
// import SearchAndFliter from './components/search_and_filter.js'
// import ShowParticipation from './components/show_participations.js'
// import ShowUnavailableParticipation from './components/show_unavailable_participation.js'
// import '../css/style.css'

// const history = createBrowserHistory()

class Participation extends Component{
  // constructor() {
  //   super();
  //   this.state = {
  //     eventList: [],
  //     eventListUnavailable: [],
  //   	eventNum: '',
  //     eventSentence: "",
  //     layerVisible: false,
  //     buttonVisible: 'inline',
  //     page: 'participation',
  //   };
  //   this.handleClick = this.handleClick.bind(this)
  //   this.gotoCreation = this.gotoCreation.bind(this)
  //   this.gotoEvent = this.gotoEvent.bind(this)
  // };

  // componentDidMount(){
  //     axios.get("http://localhost:5001/active_status").then(res => {
  //         if(!res.data.data.active_status){
  //           history.push("/");
  //           history.go();
  //         }
  //     }).catch(err => {
  //         console.log(err);
  //     });

  //     axios.get("http://localhost:5001/participation").then(res => {
  //         if(res.status===200){
  //           if(res.data.data.eventNum<2){
  //             const event_sentence = 'Here is ' + res.data.data.eventNum + " available event."
  //             this.setState({'eventNum':res.data.data.eventNum,
  //                             'eventSentence':event_sentence,
  //                             'eventList':res.data.data.eventList,
  //                             'eventListUnavailable':res.data.data.eventListUnavailable})
  //           }else{
  //             const event_sentence = 'Here are ' + res.data.data.eventNum + " available events."
  //             this.setState({'eventNum':res.data.data.eventNum,
  //                             'eventSentence':event_sentence,
  //                             'eventList':res.data.data.eventList,
  //                             'eventListUnavailable':res.data.data.eventListUnavailable})
  //           }
  //         }
  //     }).catch(err => {
  //         console.log(err);
  //     });
  // }

  // handleClick(event){
  //   this.setState({ layerVisible: true })
  //   this.setState({ buttonVisible: 'none' })
  // }

  // handleGet(val){
  //   this.setState({ buttonVisible: 'inline' })
  //   this.setState({ layerVisible: false })
  //   this.setState({ eventSentence: val })
  // }

  // handleSearch(val1,val2,val3){
  //   this.setState({ eventList: val1 })
  //   this.setState({ eventNum: val2 })
  //   this.setState({ eventListUnavailable: val3 })

  //   if(this.state.eventNum<2){
  //     const event_sentence = 'Here is ' + this.state.eventNum + " available event."
  //     this.setState({'eventSentence':event_sentence})
  //   }else{
  //     const event_sentence = 'Here are ' + this.state.eventNum + " available events."
  //     this.setState({'eventSentence':event_sentence})
  //   }
  // }

  // handleClickCancel(){
  //   this.setState({ buttonVisible: 'inline' })
  //   this.setState({ layerVisible: false })
  // }

  // gotoCreation(){
  //     history.push("/creation");
  //     history.go();
  // }

  // gotoEvent(){
  //     history.push("/event");
  //     history.go();
  // }

  // refresh(){
  //     axios.get("http://localhost:5001/participation").then(res => {
  //         if(res.status==200){
  //           if(res.data.data.eventNum<2){
  //             const event_sentence = 'Here is ' + res.data.data.eventNum + " available event."
  //             this.setState({'eventNum':res.data.data.eventNum,
  //                             'eventSentence':event_sentence,
  //                             'eventList':res.data.data.eventList,
  //                             'eventListUnavailable':res.data.data.eventListUnavailable})
  //           }else{
  //             const event_sentence = 'Here are ' + res.data.data.eventNum + " available events."
  //             this.setState({'eventNum':res.data.data.eventNum,
  //                             'eventSentence':event_sentence,
  //                             'eventList':res.data.data.eventList,
  //                             'eventListUnavailable':res.data.data.eventListUnavailable})
  //           }
  //         }
  //     }).catch(err => {
  //         console.log(err);
  //     });

  // }

  render(){
  	return (
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text>Hello, participation!</Text>
          </View>
  		// <div class="participation">
    //     <SearchAndFliter handleEventSearch={this.handleSearch.bind(this)} page={this.state.page}/>
    //     <Logout />
    //     <button class="button-long" onClick={this.gotoCreation}>My creation</button>
    //     <button class="button" onClick={this.gotoEvent}>Events</button>
  		// 	<h1 class="title">Here is your participation page</h1>
  		// 	<h2 class="title">{this.state.eventSentence}</h2>
    //     <ShowParticipation eventList={this.state.eventList} refresh={this.refresh.bind(this)}/>
    //     <ShowUnavailableParticipation eventList={this.state.eventListUnavailable}/>
  		// </div>
  		)
  }
}

export default Participation