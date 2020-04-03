import {createDrawerNavigator,DrawerItems } from 'react-navigation-drawer'
import { createAppContainer } from 'react-navigation';
import React from 'react'
import {ScrollView,SafeAreaView} from 'react-native'
import ProfileStack from './ProfileStack'
import AuthStack from './AuthStack'
import Header from '../components/Header'
import * as firebase from 'firebase'
import { Button } from 'react-native';
const SignOut = () => {
    firebase.auth().signOut()
}
const DrawerWithLogoutButton = (props) => (
    <ScrollView>
      <SafeAreaView >
        <DrawerItems {...props} />
      </SafeAreaView>
      <Button
        onPress={()=>SignOut()}
        title="SignOut"
        />
    </ScrollView>
  );
const RootDrawerNavigator = createDrawerNavigator({
    Home: {
        screen: AuthStack,
    },
    Profile: {
        screen: ProfileStack,
    }
},{
    contentComponent: DrawerWithLogoutButton
})
const NavigationDrawer = createAppContainer(RootDrawerNavigator);
export default NavigationDrawer;