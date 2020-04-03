import React from 'react'
import {
    StyleSheet
    , Text
    , TouchableOpacity
    , View
    , FlatList
    , Alert
    , TouchableWithoutFeedback
    , Keyboard
    , CheckBox
    , AsyncStorage
    , Button
    , ActivityIndicator
    , Image
} from 'react-native';
import * as firebase from 'firebase'
import { MaterialIcons } from '@expo/vector-icons';
export default function Header({ navigation, title }) {
    const openMenu = () => {
        navigation.openDrawer();
    }
    const SignOut = () => {
        firebase.auth().signOut();
    }
    return (
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center',}}>
          <MaterialIcons  name='menu' size={28} onPress={openMenu} />
           <View>
            <Text style={{fontWeight: 'bold', fontSize: 20, letterSpacing: 1,}}>{title}</Text>
            </View>
            <TouchableOpacity style={{marginLeft:180,}} onPress={()=>SignOut()}>
                <Text style={{fontWeight:'bold',fontSize:20}}>SignOut</Text>
            </TouchableOpacity>
        </View>
    )
}
