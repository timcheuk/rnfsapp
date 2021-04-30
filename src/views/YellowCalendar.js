import React, { Component } from 'react';
import {
    Text,
    View,
} from 'react-native';

import MyCalendar from '../calendar/MyCalendar';
import WebView from 'react-native-webview';

export default class YellowCalendar extends Component {

    state = {
        selectedDate: "",
        link: "",
    };

    selectDate = (Date) => {
        this.setState({ selectedDate: Date }, () => {
            var daystring = (this.state.selectedDate).toString().slice(3, -24).split(" ")[3] + "-" + this.month2Number((this.state.selectedDate).toString().slice(3, -24).split(" ")[1]) + "-" + (this.state.selectedDate).toString().slice(3, -24).split(" ")[2];
            var urlstring = "https://m.tianqi.com/laohuangli/" + daystring + ".html";
            this.setState({ link: urlstring });
        });
    }

    month2Number(str) {
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        for (var j = 0; j < months.length; j++) {
            if (str == months[j]) {
                return j+1;
            }
        } 
        return -1;
    }

    render() {
        //Date.parse() return unixTimeStamp and .toString() return a readable string

        return (
            <View>
                <MyCalendar onDateSelect={this.selectDate} />
                <View style={{ width: '100%', height: '100%' }}>
                    {(this.state.link != null)?
                        <WebView source={{ uri: this.state.link }} />
                    : null}
                </View>
            </View>
        );
    }
}