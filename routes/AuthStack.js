import { createStackNavigator } from "react-navigation-stack";
import React from 'react'
import Home from "../components/AppComponenst/home";
import Details from "../components/AppComponenst/details";
import Header from '../components/Header'
const screens = {
    Home: {
        screen: Home,
        navigationOptions: ({ navigation }) => {
            return {
                headerTitle: () => <Header navigation={navigation} title='Home' />

            }
        }
    },
    Details: {
        screen: Details
    },
}

const AuthStack = createStackNavigator(screens);

export default AuthStack;