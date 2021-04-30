/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';

//import type {Node} from 'react';
import {
  Image,
  View,
  Text,
  SafeAreaView,
  StyleSheet,
} from 'react-native';

import MyCalendar from './src/calendar/MyCalendar';

//for react-native-elements
//import { SafeAreaProvider } from 'react-native-safe-area-context';

import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-google-signin/google-signin';

import UINavigator from './src/UINavigator';

import LoginScreen3 from './src/login/screen3';

import { Settings, LoginButton, AccessToken, LoginManager, GraphRequest, GraphRequestManager } from 'react-native-fbsdk-next';

// Ask for consent first if necessary
// Possibly only do this for iOS if no need to handle a GDPR-type flow
Settings.initializeSDK();

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
            userFacebookInfo: {},
            isLogin: false,
            usersession: {
                platform: '',
                photourl:'',
                firstname: '',
                lastname: '',
                birth: '',
                email: '',
                token: '',
            },
        };
    }

    getInfoFromToken = token => {
        const PROFILE_REQUEST_PARAMS = {
            fields: {
                string: 'id, name, first_name, last_name, email, picture',
            },
        };
        const profileRequest = new GraphRequest(
            '/me',
            { token, parameters: PROFILE_REQUEST_PARAMS },
            (error, result) => {
                if (error) {
                    console.log('login info has error: ' + error);
                } else {
                    this.setState({
                        userFacebookInfo: result,
                        isLogin: true
                    });
                    let usersession = this.state.usersession;
                    usersession.email = result.email;
                    usersession.photourl = result.picture.data.url;
                    this.setState({ usersession: usersession }, console.log('Facebook Login Event handler called. email:', this.state.usersession.email, 'photo', this.state.usersession.photourl));
                    console.log('result:', result);
                }
            },
        );
        new GraphRequestManager().addRequest(profileRequest).start();
    };

    signInGoogle = async () => {
        console.log("Google sign in!");
        try {
            await GoogleSignin.hasPlayServices();
            const userGoogleInfo = await GoogleSignin.signIn();
            this.setState({
                userGoogleInfo: userGoogleInfo,
                isLogin: true
            })
            let usersession = this.state.usersession;
            usersession.email = userGoogleInfo.user.email;
            usersession.photourl = userGoogleInfo.user.photo;
            this.setState({ usersession: usersession }, console.log('Google Login Event handler called. email:', this.state.usersession.email, 'photo', this.state.usersession.photourl));
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

    /*
     * signInFacebook = (error, result) => {
        if (error) {
            console.log("login has error: " + result.error);
        } else if (result.isCancelled) {
            console.log("login is cancelled.");
        } else {
            AccessToken.getCurrentAccessToken().then(data => {
                const accessToken = data.accessToken.toString();
                this.getInfoFromToken(accessToken);
            });
        }
    }*/

    //if you need access to facebook email, change the login like this.
    signInFacebook = async () => {
        console.log("Facebook sign in Pressed");
        LoginManager.logInWithPermissions(["public_profile","email"]).then(
            (result)=> {
                if (result.isCancelled) {
                    console.log("Login cancelled");
                } else {
                    console.log(
                        "Login success with permissions: " +
                        result.grantedPermissions.toString()
                    );
                    AccessToken.getCurrentAccessToken().then(data => {
                        const accessToken = data.accessToken.toString();
                        this.getInfoFromToken(accessToken);
                    });
                }
            },
            (error)=> {
                console.log("Login fail with error: " + error);
            }
        );
    }

    // Attempt a login using the Facebook login dialog asking for default permissions.

    signOutGoogle = async () => {
        try {
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
            this.setState({ user: null }); 
            this.setState({ userGoogleInfo: null });
        } catch (error) {
            console.error(error);
        }
    };

    signOutFacebook = async () => {
        try {
            LoginManager.logOut();
            this.setState({ user: null }); 
            this.setState({ userFacebookInfo: {} })
        } catch (error) {
            console.error(error);
        }
    };

    HandleLoginSuccess = (_responsejson) => {
        let usersession = this.state.usersession;
        usersession.email = _responsejson.email;
        usersession.token = _responsejson.token;
        this.setState({ usersession: usersession }, console.log('Email Login Event handler called. email:', this.state.usersession.email, 'token', this.state.usersession.token));

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
                    <View style={{ flex: 6, justifyContent: 'flex-start' }}>
                        <UINavigator
                            usersession={this.state.usersession}
                            onLogout={this.HandleLogout}
                        />
                    </View>
                    :
                    <View style={{ flex: 6, justifyContent: 'flex-start' }}>
                        <LoginScreen3
                            onLogin={this.HandleLoginSuccess}
                        /></View>
                }

                {this.state.isLogin ?
                    <View style={{ flex: 1 }}>
                        <Text>{this.state.usersession.email}</Text>
                        <Image
                            style={{ width: 50, height: 50 }}
                            source={this.state.usersession.photourl ? { uri: this.state.usersession.photourl } : null}
                        />
                    </View> :
                    <View style={styles.buttoncontainer}>
                        <View style={styles.buttonContainer2}>
                            <GoogleSigninButton
                                style={{ width: 192, height: 48 }}
                                size={GoogleSigninButton.Size.Wide}
                                color={GoogleSigninButton.Color.Dark}
                                onPress={this.signInGoogle} />
                        </View>
                        <View style={styles.buttonContainer2}>
                            <LoginButton
                                style={{ width: 192, height: 41 }}
                                onLoginFinished={this.signInFacebook}
                                onLogoutFinished={this.signOutFacebook} />
                        </View>
                    </View>
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
    buttoncontainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContainer2: {
        flex: 1,
    }
});

//export default App;
