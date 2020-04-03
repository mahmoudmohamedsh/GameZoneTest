import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert,TouchableWithoutFeedback,Keyboard } from 'react-native';
import * as firebase from "firebase";
export default function ForgetPassword({ navigation }) {
    const [email, setEmail] = useState('')
    const [reset, setReset] = useState(false)
    const OnRetrivePassword = () => {
        firebase.auth().sendPasswordResetEmail(email)
            .then(() => {
                setReset(true)

            }, (error) => {

                if (email == '') {
                    Alert.alert('ERROR', 'invalid credential!', [
                        { text: 'DISSMIS' }
                    ]);
                } else {
                    if (error.message == 'The email address is badly formatted.') {
                        Alert.alert('auth/invalid-email', error.message,
                            [{ text: 'Dismiss' }]);
                    } else if (error.message == 'There is no user record corresponding to this identifier. The user may have been deleted.') {
                        Alert.alert('auth/user-not-found', error.message,
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
                <Text style={styles.header}>Forget Password</Text>


                <TextInput style={styles.TextInput} placeholder="Your email"
                    value={email} onChangeText={(text) => setEmail(text)} underlineColorAndroid={'transparent'} />
                {reset ? <Text style={styles.txt}>Email was sent successfully. please follow instructions to reset your password.</Text> : console.log()}
                <TouchableOpacity style={styles.button} onPress={() => OnRetrivePassword()}>
                    <Text style={styles.btntext}>Reset Password</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Login')} >
                    <Text style={styles.btntext}>Back to Login</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Register')} >
                    <Text style={styles.btntext}>Back to Signup</Text>
                </TouchableOpacity>

            </View>
        </View>
        </TouchableWithoutFeedback>
    )
}
const styles = StyleSheet.create({
    txt: {
        color: 'white'
    },
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
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#36485f',
        paddingLeft: 60,
        paddingRight: 60,
    },
    btn: {
        alignSelf: 'stretch',
        alignItems: 'center',
        padding: 30,
        backgroundColor: 'red',
        marginTop: 30,
        borderRadius: 20,
    }
});