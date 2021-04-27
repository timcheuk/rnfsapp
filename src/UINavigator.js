import React, { Component } from 'react';

import Alerts from '../src/Alerts';
import Uploads from '../src/Uploads';
import Messaging from '../src/Messaging';
import LocalPageLoad from '../src/LocalPageLoad';
import { Header, SubHeader } from '../src/Header';

import {
    Platform,
    StyleSheet,
    View,
} from 'react-native';

import {
    Button,
    Text,
} from 'react-native-elements';

/*For react navigation draw manu*/
import { NavigationContainer } from '@react-navigation/native';
//import { createStackNavigator } from '@react-navigation/stack';
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
} from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

class UINavigator extends Component {
    state = {};

    HomeScreen = () => {

        console.log('HomeScreen:', this.props.usersession);

        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start' }}>
                <Header title="Home" /> 
                <SubHeader title="Sub title home" />
                <Text>Welcome! {this.props.usersession.email}</Text>
            </View>
        );
    }

    NotificationsScreen = ({ navigation }) => {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start' }}>
                <Header title="Notification" />
                <SubHeader title="Standard Notification" />
                <Button onPress={() => navigation.goBack()} title="Go back home" />
            </View>
        );
    }

    AlertsScreen({ navigation }) {
        return (
            <View
                testID='example-alerts'
                key='Alerts'
                style={{ flex: 1, justifyContent: 'flex-start' }}>
                <Header title="Alerts" />
                <SubHeader title="Standard Alerts" />
                <Text style={styles.exampleTitle}>Alerts</Text>
                <Text style={styles.exampleDescription}>Alerts tests</Text>
                <View style={styles.exampleInnerContainer}>
                    <Alerts />
                </View>
            </View>
        );
    }

    UploadsScreen({ navigation }) {
        return (
            <View
                testID='example-uploads'
                key='Uploads'
                style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start' }}>
                <Header title="Upload File" />
                <SubHeader title="Android Upload" />
                <Text style={styles.exampleTitle}>Uploads</Text>
                <Text style={styles.exampleDescription}>Upload test</Text>
                <View style={styles.exampleInnerContainer}>
                    <Uploads />
                </View>
            </View>
        );
    }

    LoadWebScreen({ navigation }) {
        return (
            <View
                testID='example-localPageLoad'
                key='LocalPageLoad'
                style={{ flex: 1, justifyContent: 'flex-start' }}>
                <Header title="Load Web View" />
                <SubHeader title="Standard Web View" />
                <Text style={styles.exampleTitle}>Load webview</Text>
                <Text style={styles.exampleDescription}>Web view load test</Text>
                <View style={styles.exampleInnerContainer}>
                    <LocalPageLoad />
                </View>
            </View>
        );

    }

    MessagingScreen({ navigation }) {
        return (
            <View
                testID='example-messaging'
                key='Messaging'
                style={{ flex: 1, justifyContent: 'flex-start' }}>
                <Header title="Message" />
                <SubHeader title="JS POST" />
                <Text style={styles.exampleTitle}>Messaging</Text>
                <Text style={styles.exampleDescription}>js-webview postMessage messaging test</Text>
                <View style={styles.exampleInnerContainer}>
                    <Messaging />
                </View>
            </View>
        );
    }

    CustomDrawerContent = (props) => {
        return (
            <DrawerContentScrollView {...props}>
                <DrawerItemList {...props} />
                <DrawerItem label="Logout" onPress={this.props.onLogout} />
            </DrawerContentScrollView>
        );
    }

    render() {

        return (
            <NavigationContainer>
                <Drawer.Navigator initialRouteName="Home" drawerContent={props => <this.CustomDrawerContent {...props} />}>
                    <Drawer.Screen name="Home" component={this.HomeScreen} />
                    <Drawer.Screen name="Notifications" component={this.NotificationsScreen} />
                    <Drawer.Screen name="Alerts" component={this.AlertsScreen} />
                    {Platform.OS === 'android' && (
                        <Drawer.Screen name="Uploads" component={this.UploadsScreen} />
                    )}
                    <Drawer.Screen name="Load Web" component={this.LoadWebScreen} />
                    <Drawer.Screen name="Messaging" component={this.MessagingScreen} />
                </Drawer.Navigator>
            </NavigationContainer>
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

export default UINavigator;