import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert,TouchableWithoutFeedback,Keyboard } from 'react-native';
import * as firebase from 'firebase'

export default function Register({ navigation }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const OnSignUp = () => {
        if (password !== passwordConfirm) {
            Alert.alert('Passwords do not match')
            return;
        }
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(() => {

            }, (error) => {

                if (email == '' && password == '' && passwordConfirm == '') {
                    Alert.alert('ERROR', 'invalid credential!', [
                        { text: 'DISSMIS' }
                    ]);
                } else {
                    if (error.message == 'The email address is already in use by another account.') {
                        Alert.alert('auth/email-already-in-use', error.message, [
                            { text: 'DISMISS' }
                        ])
                    }else if (error.message == 'The email address is badly formatted.') {
                        Alert.alert('auth/invalid-email', error.message,
                            [{ text: 'Dismiss' }]);
                    } else {
                        Alert.alert('auth/network-request-failed', error.message, [
                            { text: 'DISMISS' }
                        ])
                    }
                }
            })
    }

    return (
        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss()
        }}>
        <View style={styles.container}>
            <View style={styles.register}>
                <Text style={styles.header}>Registration</Text>

                <TextInput style={styles.TextInput} placeholder="Your email"
                    value={email} onChangeText={(text) => setEmail(text)} underlineColorAndroid={'transparent'} />
                <TextInput style={styles.TextInput} placeholder="Your password"
                    value={password} onChangeText={(text) => setPassword(text)} secureTextEntry={true} underlineColorAndroid={'transparent'} />
                <TextInput style={styles.TextInput} placeholder="Password confirm"
                    value={passwordConfirm} onChangeText={(text) => setPasswordConfirm(text)} secureTextEntry={true} underlineColorAndroid={'transparent'} />
                <TouchableOpacity style={styles.button} onPress={() => OnSignUp()}>
                    <Text style={styles.btntext}>Sign Up</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('ForgetPassword')}>
                    <Text style={styles.btntext}>Forget Password...</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.btntext}>if you already have an account</Text>
                </TouchableOpacity>

            </View>
        </View>
        </TouchableWithoutFeedback>
    )
}
const styles = StyleSheet.create({
    register: {
        alignSelf: 'stretch',

    },
    header: {
        fontSize: 24,
        color: '#fff',
        paddingBottom: 10,
        marginBottom: 40,
        borderBottomColor: '#199187',
        borderBottomWidth: 1,
    },
    TextInput: {
        alignSelf: 'stretch',
        height: 40,
        marginBottom: 30,
        color: '#fff',
        borderBottomColor: '#f8f8f8',
        borderBottomWidth: 1,
    },
    button: {
        alignSelf: 'stretch',
        alignItems: 'center',
        padding: 30,
        backgroundColor: '#59cbbd',
        marginTop: 30,
        borderRadius: 20,
    },
    btntext: {
        color: '#fff',
        fontWeight: 'bold',

    },
    btn: {
        alignSelf: 'stretch',
        alignItems: 'center',
        padding: 30,
        backgroundColor: 'red',
        marginTop: 30,
        borderRadius: 20,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#36485f',
        paddingLeft: 60,
        paddingRight: 60,
        paddingBottom: 30,
    }
});
