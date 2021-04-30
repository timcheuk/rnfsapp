import React, { Component } from 'react';

import {
  Alert,
  Dimensions,
  View,
  ImageBackground,
  Text,
  UIManager,
  StyleSheet,
  LayoutAnimation,
} from 'react-native';

import { Input, Button, Icon } from 'react-native-elements';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const BG_IMAGE = require('../../assets/images/bg_screen3.jpg');

// Enable LayoutAnimation on Android
if (Platform.OS === 'android') {
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

type TabSelectorProps = {
  selected: boolean;
};

const TabSelector: React.FunctionComponent<TabSelectorProps> = ({
  selected,
}) => {
  return (
    <View style={styles.selectorContainer}>
      <View style={selected && styles.selected} />
    </View>
  );
};

type LoginScreen2State = {
  selectedCategory: any;
  isLoading: boolean;
  isEmailValid: any;
  isPasswordValid: any;
  email: string;
  password: string;
  isConfirmationValid: boolean;
  passwordConfirmation: string;
};

export default class LoginScreen2 extends Component<{}, LoginScreen2State> {
  emailInput: any;
  passwordInput: any;
  confirmationInput: any;
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      selectedCategory: 0,
      isLoading: false,
      isEmailValid: true,
      isPasswordValid: true,
      isConfirmationValid: true,
      passwordConfirmation: '',
    };
    this.selectCategory = this.selectCategory.bind(this);
    this.checkSignUp = this.checkSignUp.bind(this);
  }

  selectCategory(selectedCategory) {
    LayoutAnimation.easeInEaseOut();
    this.setState({
      selectedCategory,
      isLoading: false,
    });
  }

  validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

    checkLogin = () => {
        const { email, password } = this.state;
        this.setState({ isLoading: true });
        // Simulate an API call

        LayoutAnimation.easeInEaseOut();
        this.setState({
            isLoading: false,
            isEmailValid: this.validateEmail(email) || this.emailInput.shake(),
            isPasswordValid: password.length >= 8 || this.passwordInput.shake(),
        }, async() => {
                if (this.state.isEmailValid &&
                    this.state.isPasswordValid) {

                    let response = await fetch('http://192.168.0.30/mytestapp/login', {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            email: this.state.email,
                            password: this.state.password
                        })
                    });

                    let json = await response.json();

                    if (response.ok) {
                        console.log('response json:', json);
                        this.props.onLogin(json);
                    } else {
                        let error = new Error(response.statusText);
                        //error.response = response;
                        alert(error + json.error);
                        //throw error;
                    }
                }
                
        });
  }

  checkSignUp() {
    const { email, password, passwordConfirmation } = this.state;
    this.setState({ isLoading: true });
    // Simulate an API call

    LayoutAnimation.easeInEaseOut();
    this.setState({
        isLoading: false,
        isEmailValid: this.validateEmail(email) || this.emailInput.shake(),
        isPasswordValid: password.length >= 8 || this.passwordInput.shake(),
        isConfirmationValid:
        password === passwordConfirmation || this.confirmationInput.shake(),
    }, async() => {
            if (this.state.isEmailValid &&
                this.state.isPasswordValid &&
                this.state.isConfirmationValid) {

                let response = await fetch('http://192.168.0.30/mytestapp/reguser', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: this.state.email,
                        password: this.state.password
                    })
                });

                let json = await response.json();

                if (response.ok) {
                    this.props.onLogin(json);
                }else {
                    let error = new Error(response.statusText);
                    //error.response = response;
                    alert(error + json.error);
                    //throw error;
                }
            }
    });
  }

  render() {
    const {
      selectedCategory,
      isLoading,
      isEmailValid,
      isPasswordValid,
      isConfirmationValid,
      email,
      password,
      passwordConfirmation,
    } = this.state;
    const isLoginPage = selectedCategory === 0;
    const isSignUpPage = selectedCategory === 1;


    return (
      <View style={styles.container}>
        <ImageBackground source={BG_IMAGE} style={styles.bgImage}>
          <View>
            <View style={styles.titleContainer}>
              <View>
                <Text style={styles.titleText}>風水命理</Text>
              </View>
              <View style={{ marginLeft: 10 }}>
                <Text style={styles.titleText}>升運佈局助您走出困境</Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Button
                disabled={isLoading}
                type="clear"
                activeOpacity={0.7}
                onPress={() => this.selectCategory(0)}
                containerStyle={{ flex: 1 }}
                titleStyle={[
                  styles.categoryText,
                  isLoginPage && styles.selectedCategoryText,
                ]}
                title={'登錄'}
              />
              <Button
                disabled={isLoading}
                type="clear"
                activeOpacity={0.7}
                onPress={() => this.selectCategory(1)}
                containerStyle={{ flex: 1 }}
                titleStyle={[
                  styles.categoryText,
                  isSignUpPage && styles.selectedCategoryText,
                ]}
                title={'註冊'}
              />
            </View>
            <View style={styles.rowSelector}>
              <TabSelector selected={isLoginPage} />
              <TabSelector selected={isSignUpPage} />
            </View>
            <View style={styles.formContainer}>
              <Input
                leftIcon={
                  <Icon
                    name="envelope-o"
                    type="font-awesome"
                    color="rgba(0, 0, 0, 0.38)"
                    size={25}
                    style={{ backgroundColor: 'transparent' }}
                  />
                }
                value={email}
                keyboardAppearance="light"
                autoFocus={false}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                returnKeyType="next"
                inputStyle={{ marginLeft: 10, color: 'grey'}}
                placeholder={'電郵'}
                containerStyle={{
                  borderBottomColor: 'rgba(0, 0, 0, 0.38)',
                }}
                ref={(input) => (this.emailInput = input)}
                onSubmitEditing={() => this.passwordInput.focus()}
                onChangeText={(text) => this.setState({ email: text })}
                errorMessage={
                  isEmailValid ? null : '請輸入有效電郵'
                }
              />
              <Input
                leftIcon={
                  <Icon
                    name="lock"
                    type="simple-line-icon"
                    color="rgba(0, 0, 0, 0.38)"
                    size={25}
                    style={{ backgroundColor: 'transparent' }}
                  />
                }
                value={password}
                keyboardAppearance="light"
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={true}
                returnKeyType={isSignUpPage ? 'next' : 'done'}
                blurOnSubmit={true}
                containerStyle={{
                  marginTop: 16,
                  borderBottomColor: 'rgba(0, 0, 0, 0.38)',
                }}
                inputStyle={{ marginLeft: 10, color: 'grey' }}
                placeholder={'密碼'}
                ref={(input) => (this.passwordInput = input)}

                //onSubmitEditing={isSignUpPage ? () => this.confirmationInput.focus() : () =>this.props.onLogin(this.state.email,this.state.password)}
                onSubmitEditing={isSignUpPage ? () => this.confirmationInput.focus() : this.checkLogin}
                onChangeText={(text) => this.setState({ password: text })}
                errorMessage={
                  isPasswordValid
                  ? null
                  : '密碼最少為8位字符'
                }
              />
              {isSignUpPage && (
                <Input
                  leftIcon={
                    <Icon
                      name="lock"
                      type="simple-line-icon"
                      color="rgba(0, 0, 0, 0.38)"
                      size={25}
                      style={{ backgroundColor: 'transparent' }}
                    />
                  }
                  value={passwordConfirmation}
                  secureTextEntry={true}
                  keyboardAppearance="light"
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="default"
                  returnKeyType={'done'}
                  blurOnSubmit={true}
                  containerStyle={{
                    marginTop: 16,
                    borderBottomColor: 'rgba(0, 0, 0, 0.38)',
                  }}
                  inputStyle={{ marginLeft: 10, color: 'grey' }}
                  placeholder={'重覆密碼'}
                  ref={(input) => (this.confirmationInput = input)}
                  onSubmitEditing={this.checkSignUp}
                  //onSubmitEditing={() => this.props.onSignUp(this.state.email, this.state.password)}
                  onChangeText={(text) =>
                    this.setState({ passwordConfirmation: text })
                  }
                  errorMessage={
                    isConfirmationValid
                      ? null
                      : '請輸入相同的字符'
                  }
                />
              )}
              <Button
                buttonStyle={styles.loginButton}
                containerStyle={{ marginTop: 32, flex: 0 }}
                activeOpacity={0.8}
                title={isLoginPage ? '登錄' : '註冊'}
                //onPress={isLoginPage ? () => this.props.onLogin(this.state.email, this.state.password) : () => this.props.onSignUp(this.state.email, this.state.password)}
                onPress={isLoginPage ? this.checkLogin : this.checkSignUp}
                titleStyle={styles.loginTextButton}
                loading={isLoading}
                disabled={isLoading}
              />
            </View>
            <View style={styles.helpContainer}>
              <Button
                title={'客戶支援'}
                titleStyle={{ color: 'floralwhite' }}
                buttonStyle={{ backgroundColor: 'transparent' }}
                onPress={() => Alert.alert('🤔', '忘記密碼')}
              />
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingBottom: 20,
    width:"100%",
    height: SCREEN_HEIGHT,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  rowSelector: {
    height: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectorContainer: {
    flex: 1,
    alignItems: 'center',
  },
  selected: {
    position: 'absolute',
    borderRadius: 50,
    height: 0,
    width: 0,
    top: -5,
    borderRightWidth: 70,
    borderBottomWidth: 70,
    borderColor: 'white',
    backgroundColor: 'white',
  },
  loginTextButton: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  loginButton: {
      backgroundColor: 'rgba(30, 139, 195, 1)',
    borderRadius: 10,
    height: 50,
    width: 200,
  },
  titleContainer: {
    height: 150,
    backgroundColor: 'transparent',
    justifyContent: 'center',
  },
  formContainer: {
    backgroundColor: 'white',
    width: SCREEN_WIDTH - 30,
    borderRadius: 10,
    paddingTop: 32,
    paddingBottom: 32,
    alignItems: 'center',
  },
  loginText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  bgImage: {
    flex: 1,
    top: 0,
    left: 0,
    width:"100%",
    height: SCREEN_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 24,
    fontFamily: 'light',
    backgroundColor: 'transparent',
    opacity: 0.54,
  },
  selectedCategoryText: {
    opacity: 1,
  },
  titleText: {
    color: 'white',
    fontSize: 30,
    fontFamily: 'regular',
    textAlign: 'center',
  },
  helpContainer: {
    height: 50,
    alignItems: 'center',
  },
});
