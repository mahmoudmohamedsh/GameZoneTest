import React, { useState } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import Navigator from './routes/homeStack'
import AuthNav from './routes/drawer'
import ApiKeys from './constants/ApiKeys'
import * as firebase from 'firebase'
import 'firebase/firestore';
import {decode, encode} from 'base-64'
export default function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false)
  if (!firebase.apps.length) {
    firebase.initializeApp(ApiKeys.FirebaseConfig)
  }
  firebase.auth().onAuthStateChanged(function (user) {
    setIsAuthenticated(!!user)
  })
  
  if (!global.btoa) {  global.btoa = encode }

  if (!global.atob) { global.atob = decode }
  return (
    <TouchableWithoutFeedback>
      {(isAuthenticated) ? <AuthNav /> : <Navigator />}
    </TouchableWithoutFeedback>
  );
}


