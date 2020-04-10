import React, {Component} from 'react';
// import {createBrowserHistory} from 'history'
// import axios from 'axios';
// import Logout from './components/logout.js'
// import CreateEvent from './components/create_event.js'
// import SearchAndFliter from './components/search_and_filter.js'
// import ShowEvents from './components/show_events.js'
// import '../css/style.css'



class Event extends Component{
  // constructor() {
  //   super();
  //   this.state = {
  //     eventList: [],
  //   	eventNum: '',
  //     eventSentence: "",
  //     layerVisible: false,
  //     buttonVisible: 'inline',
  //     page: 'event',
  //   };
  //   this.handleClick = this.handleClick.bind(this)
  //   this.gotoCreation = this.gotoCreation.bind(this)
  //   this.gotoParticipation = this.gotoParticipation.bind(this)
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

  //     axios.get("http://localhost:5001/events").then(res => {
  //         if(res.status===200){
  //           if(res.data.data.eventNum<2){
  //             const event_sentence = 'Here is ' + res.data.data.eventNum + " event."
  //             this.setState({'eventNum':res.data.data.eventNum,
  //                             'eventSentence':event_sentence,
  //                             'eventList':res.data.data.eventList})
  //           }else{
  //             const event_sentence = 'Here are ' + res.data.data.eventNum + " events."
  //             this.setState({'eventNum':res.data.data.eventNum,
  //                             'eventSentence':event_sentence,
  //                             'eventList':res.data.data.eventList})
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

  // handleGet(val1,val2){
  //   this.setState({ buttonVisible: 'inline' })
  //   this.setState({ layerVisible: false })
  //   this.setState({ eventSentence: val1 })
  //   this.setState({ eventList: val2 })
  // }

  // handleSearch(val1,val2){
  //   this.setState({ eventList: val1 })
  //   this.setState({ eventNum: val2 })

  //   if(this.state.eventNum<2){
  //     const event_sentence = 'Here is ' + this.state.eventNum + " event."
  //     this.setState({'eventSentence':event_sentence})
  //   }else{
  //     const event_sentence = 'Here are ' + this.state.eventNum + " events."
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

  // gotoParticipation(){
  //     history.push("/participation");
  //     history.go();
  // }
  render(){
      return (
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text>Hello, world!</Text>
          </View>
      );
  // 	return (
  // 		<div class="event">
  //       <SearchAndFliter handleEventSearch={this.handleSearch.bind(this)} page={this.state.page}/>
  //       <Logout />
  //       <button class="button-long" onClick={this.gotoCreation}>My creation</button>
  //       <button class="button-long" onClick={this.gotoParticipation}>My participation</button>
  //       <button class="button-long" onClick={this.handleClick} style={{display:this.state.buttonVisible}}>Create Event</button>
  //       <CreateEvent eventNum={this.state.eventNum} visible={this.state.layerVisible}  handleCancel ={this.handleClickCancel.bind(this)} handleValue={this.handleGet.bind(this)} page={this.state.page}/>
  // 			<h1 class="title">Here is event page</h1>
  // 			<h2 class="title">{this.state.eventSentence}</h2>
  //       <ShowEvents eventList={this.state.eventList}/>
  // 		</div>
  // 		)
  }
}

export default Event