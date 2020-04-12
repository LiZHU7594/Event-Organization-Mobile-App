import React, {Component} from 'react';
import axios from 'axios';
import EachParticipation from '../components/each_participation.js'
import {View} from 'react-native';

class ShowParticipations extends Component{
  constructor(props) {
    super(props);
    this.state = {
        eventList:[],
        eventDetailList:[],
    };
  };

  componentWillReceiveProps(props) {
      this.setState({ eventList: props.eventList })
      const data = {
          'eventList': props.eventList,
      };

      axios.post("http://10.0.2.2:5001/show_event", data).then(res => {
          if(res.status===200){
            this.setState({'eventDetailList':res.data.data.eventDetailList})
          }
      }).catch(err => {
          console.log(err);
      });
  }

  refresh(){
    this.props.refresh();
  }

  render(){
    return (
      <View>
        {
          this.state.eventDetailList.map((event) =>
            <EachParticipation id={event.id} name={event.name} place={event.place} time={event.time} category={event.category} detail={event.detail} connect_status={event.connect_status} refresh={this.refresh.bind(this)}/>)

        }
      </View>
    )
  }
}

export default ShowParticipations