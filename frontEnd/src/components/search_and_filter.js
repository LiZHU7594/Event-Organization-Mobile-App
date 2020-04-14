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
    this.clearDate = this.clearDate.bind(this);
  };

  searchAndFilter(event){
      event.preventDefault();
      let data = {
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

  clearDate(){
    this.setState({from:null})
    this.setState({to:null})
  }

  render(){
    return (
      <View style={{flex:1, borderWidth:2, borderColor:'#ffd391',flexDirection:'column', alignItems:'flex-end',marginBottom:10}}>
        <View>
          <View style={{flexDirection:'row'}}>
            <TextInput 
              style={{marginLeft:10,backgroundColor:'#d6d6d6',borderRadius: 5,marginTop: 5, width: 180, height: 40}}
              placeholder="Keyword" name='keyword' onChangeText={(txt) => this.handleChange("keyword", txt)}/> 
            <TextInput 
              style={{marginLeft:10,marginRight:10,backgroundColor:'#d6d6d6',borderRadius: 5,marginTop: 5, width: 180, height: 40}}
              placeholder="Place" name='place' onChangeText={(txt) => this.handleChange("place", txt)}/> 
            </View>
            <RNPickerSelect
              style={{marginLeft:10,marginTop: 5, width: 120, height: 40}}
                placeholder={{
                    label: 'Select a category',
                    value: null,
                }}
                onValueChange={(value) => this.handleChange("category", value)}
                items={[
                    { label: 'All', value: '' },
                    { label: 'Eat', value: 'eat' },
                    { label: 'Leetcode', value: 'leetcode' },
                    { label: 'Game', value: 'game' },
                    { label: 'Other', value: 'other' },
                ]}
            />
          <View style={{flexDirection:'row',marginRight:5}}>
            <DatePicker 
              style={{marginLeft:5,marginTop: 5, width: 140, height: 40}}
              placeholder="From" name='from' format="YYYY-MM-DD" date={this.state.from} onDateChange={(date) => this.handleChange("from", date)}/>
            <DatePicker 
              style={{marginLeft:5,marginTop: 5, width: 140, height: 40}}
              placeholder="To" name='to' format="YYYY-MM-DD" date={this.state.to} onDateChange={(date) => this.handleChange("to", date)}/>
            <Button 
              style={{marginLeft:5, height: 20}} color="#ffa59e"
              title="Clear Date" onPress={this.clearDate}/>
            </View>
              <View style={{margin:10}}>
                <Button 
                  style={{marginLeft:10, height: 20, width:300}} color="#ffa59e"
                  title="Search" onPress={this.searchAndFilter}/>
            </View>
          </View>
      </View>
  		)
  }
}

export default SearchAndFliter