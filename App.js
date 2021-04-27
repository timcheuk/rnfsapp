/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
//import type {Node} from 'react';
import {
  Image,
  View,
  Text,
  SafeAreaView,
  StyleSheet,
} from 'react-native';

//for react-native-elements
//import { SafeAreaProvider } from 'react-native-safe-area-context';

import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-google-signin/google-signin';

import UINavigator from './src/UINavigator';

import LoginScreen3 from './src/login/screen3';

//import { createStackNavigator } from '@react-navigation/stack';

/*const MyWebView = ({children, title}): Node => {
  return (
    <WebView originWhitelist={['*']} source={{ uri: 'http://192.168.0.42/colds/latest/h5root/' }} />
  );
};*/
//<MyWebView/>

//type Props = {};
//type State = { restarting: boolean; currentTest: Object };

//const Stack = createStackNavigator();

//default_web_client_id: 13179624366-m918g6op184edoq5jjb3f3lp3our49ra.apps.googleusercontent.com
//android client_id: 13179624366-n0br6ahevpve3ojgd1r57j6j423dfvgf.apps.googleusercontent.com
GoogleSignin.configure({
    webClientId: '13179624366-m918g6op184edoq5jjb3f3lp3our49ra.apps.googleusercontent.com',
    offlineAccess: true
})

export default class App extends Component {

    //to detect the change of state and update DOM view, if you change the state locally, use this.setState({isLogin: true});
    constructor(props) {
        super(props);
        this.state = {
            userGoogleInfo: {},
            isLogin: false,
            usersession: {
                firstname: '',
                lastname: '',
                birth: '',
                email: '',
                token: '',
            },
        };
    }

    signIn = async () => {
        console.log("Google sign in!");
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            this.setState({
                userGoogleInfo: userInfo,
                isLogin: true
            })
        }
        catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
                console.log(error.message);
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation (e.g. sign in) is in progress already
                console.log(error.message);
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // play services not available or outdated
                console.log(error.message);
            } else {
                // some other error happened
                console.log(error.message);
            }
            
        } 
    }

    signOut = async () => {
        try {
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
            this.setState({ user: null }); // Remember to remove the user from your app's state as well
        } catch (error) {
            console.error(error);
        }
    };

    HandleLoginSuccess = (_responsejson) => {
        let usersession = this.state.usersession;
        usersession.email = _responsejson.email;
        usersession.token = _responsejson.token;
        this.setState({ usersession: usersession }, console.log('Login Event handler called. email:', this.state.usersession.email, 'token', this.state.usersession.token));

        this.setState({ isLogin: true });
    };

    HandleLogout = () => {
        this.setState({ isLogin: false });
        console.log('Logout Event handler called');
    };

    render() {
        return (
            <SafeAreaView style={styles.container}>
                {this.state.isLogin ?
                    <UINavigator
                        usersession={this.state.usersession}
                        onLogout={this.HandleLogout}
                    />
                    :
                    <LoginScreen3
                        onLogin={this.HandleLoginSuccess}
                    />
                }


                {this.state.isLogin ? null : <GoogleSigninButton
                    style={{ width: 192, height: 48 }}
                    size={GoogleSigninButton.Size.Wide}
                    color={GoogleSigninButton.Color.Dark}
                    onPress={this.signIn} />}

                {this.state.isLogin ?
                    <View>
                        <Text>{this.state.userGoogleInfo.user.name}</Text>
                        <Text>{this.state.userGoogleInfo.user.email}</Text>
                        <Image
                            style={{ width: 100, height: 100 }}
                            source={{uri:this.state.userGoogleInfo.user.photo}}
                        />
                    </View> :
                    <Text>No Sign in</Text>
                }
            </SafeAreaView>
        );
    }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    padding: 8,
  },
  exampleContainer: {
    padding: 16,
    backgroundColor: '#FFF',
    borderColor: '#EEE',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    flex: 1,
  },
  exampleTitle: {
    fontSize: 18,
  },
  exampleDescription: {
    color: '#333333',
    marginBottom: 16,
  },
  exampleInnerContainer: {
    borderColor: '#EEE',
    borderTopWidth: 1,
    paddingTop: 10,
    flex: 1,
  },
  restartButton: {
    padding: 6,
    fontSize: 16,
    borderRadius: 5,
    backgroundColor: '#F3F3F3',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
  },
  closeKeyboardView: {
    width: 5,
    height: 5,
  },
  testPickerContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

//export default App;
