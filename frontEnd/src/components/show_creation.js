import React, {Component} from 'react';
import axios from 'axios';
import EachCreation from '../components/each_creation.js'
import {View} from 'react-native';

class ShowCreation extends Component{
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
          if(res.status==200){
            this.setState({'eventDetailList':res.data.data.eventDetailList})
          }
      }).catch(err => {
          console.log(err);
      });
  }

  render(){
    return (
      <View>
        {
          this.state.eventDetailList.map((event) =>
            <EachCreation id={event.id} name={event.name} place={event.place} time={event.time} category={event.category} detail={event.detail} active_status={event.is_active}/>)

        }    
      </View>
    )
  }
}

export default ShowCreation