import React, {Component} from 'react';
import {View, Text, TextInput, Button} from 'react-native';
import DatePicker from 'react-native-datepicker'
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios';

class SearchAndFliter extends Component{
  constructor(props) {
    super(props);
    this.state = {
        keyword: null,
        from: null,
        to: null,
        category: null,
        place: '',
        eventId: [],
        page:props.page
    };
    this.searchAndFilter = this.searchAndFilter.bind(this);
    this.handleChange = this.handleChange.bind(this);
  };

  searchAndFilter(event){
      event.preventDefault();
      const data = {
          'keyword': this.state.keyword,
          'from': this.state.from,
          'to': this.state.to,
          'category': this.state.category,
          'place': this.state.place,
          'page':this.state.page
      };

      axios.post("http://10.0.2.2:5001/search_and_filter", data).then(res => {
          this.props.handleEventSearch(res.data.data.event_list,res.data.data.event_list.length,res.data.data.unavailable_event_list)
      }).catch(err => {
          console.log(err);
      });
  }

  handleChange(name, value) {
    this.setState(() => ({ [name]: value }));
  }

  render(){
    return (
      <View>
        <TextInput placeholder="Keyword" name='keyword' onChangeText={(txt) => this.handleChange("keyword", txt)}/> 
        <DatePicker placeholder="From" name='from' format="YYYY-MM-DD" onChangeText={(txt) => this.handleChange("from", txt)}/>
        <DatePicker placeholder="To" name='to' format="YYYY-MM-DD" onChangeText={(txt) => this.handleChange("to", txt)}/>
        <RNPickerSelect
            onValueChange={(value) => this.handleChange("category", value)}
            items={[
                { label: '', value: '' },
                { label: 'Eat', value: 'eat' },
                { label: 'Leetcode', value: 'leetcode' },
                { label: 'Game', value: 'game' },
                { label: 'Other', value: 'other' },
            ]}
        />
        <TextInput placeholder="Place" name='place' onChangeText={(txt) => this.handleChange("place", txt)}/> 
        <Button title="Search" onPress={this.searchAndFilter}/>
      </View>
  		)
  }
}

export default SearchAndFliter