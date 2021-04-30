import React, {Component} from 'react';
import {View, Text, Alert, TextInput, Button} from 'react-native';
import WebView from 'react-native-webview';

const localHtmlFile = require('../assets/test.html');
/* add this back to render if need to use localfile <WebView source={localHtmlFile}/> */


export default class LocalPageLoad extends Component<Props, State> {
    render() {
      return (
        <View style={{ height: 200 }}>
            <View style={{ width: '100%', height: '100%' }}>
                  <WebView source={{ uri: 'http://192.168.0.42/colds/latest/h5root/main.php?mobile=3&lang=zh-cn&playerid=timcheuk&LoginTokenID=3edC%3A4rfV1619511265&currency=CNY&OperatorCode=1235&vip=1&CSRFToken=FS5CnQztg1C5UjKHL8BWaMYBhtbQCvHs2ei3bu8EJiNalvH9L2J6087c7d7befa1' }} />
          </View>
        </View>
      );
    }
  }