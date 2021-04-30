import React, { Component } from 'react';
import {
    Text,
    View,
} from 'react-native';

import MyCalendar from '../calendar/MyCalendar';

export default class YellowCalendar extends Component {

    state = {
        selectedDate: "",
    };

    selectDate = (Date) => {
        this.setState({ selectedDate : Date });
    }

    render() {
        //Date.parse() return unixTimeStamp and .toString() return a readable string
        return (
            <View>
                <MyCalendar onDateSelect={this.selectDate} />
                <Text>Welcome! {this.props.usersession.email} Lucky on {(this.state.selectedDate).toString()}!</Text>
            </View>
        );
    }
}