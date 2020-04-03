import { createStackNavigator, HeaderTitle } from "react-navigation-stack";
import Profile from '../components/AppComponenst/Profile'
import Header from '../components/Header'
import React from 'react'
const screens = {
    Profile: {
        screen: Profile,
        navigationOptions: ({ navigation }) => {
            return {
                headerTitle: () => <Header navigation={navigation} title='Profile' />

            }
        }
    },

}

const ProfileStack = createStackNavigator(screens);

export default ProfileStack;