import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Header } from '../Header';
//import LoginScreen2 from './screen2';
import LoginScreen3 from './screen3';

type LoginComponentProps = {};

const Login: React.FunctionComponent<LoginComponentProps> = () => {
  return (
    <>
      <View style={styles.container}>
        <ScrollView>
           <LoginScreen3/>
        </ScrollView>
      </View>
    </>
  );
};

//<LoginScreen2 />

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    position: 'relative'
  },
});

export default Login;
