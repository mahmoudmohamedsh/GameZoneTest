import React ,{ useState }from 'react'
import { StyleSheet, Text, View, FlatList, Alert, TouchableWithoutFeedback, Keyboard , Dimensions,TextInput,Button } from 'react-native';

export default function Details({ navigation }) {
    const [text,setText] = useState(navigation.getParam('item').title)

    const changeHandle = ( val )=>{
        setText(val)
    }
    const h = navigation.getParam('PressUpdateHandler');
    return (
        
            
            <View style={styles.container}>
                 <View>
                <TextInput 
                style = {styles.input}
                // placeholder = 'new todo ....'
                value={text == '' ?navigation.getParam('item').title:text }
                onChangeText={(text)=>changeHandle(text)}
                multiline={true}
                />
                <Button  title='add todo' color='coral' 
                onPress={()=>{h(navigation.getParam('item' ).id,text)
                 navigation.navigate('Home')}}
                    />
                </View>
        </View>
    )
}


const styles = StyleSheet.create({
    input: {
        
        marginBottom: 10,
        paddingHorizontal: 8,
        paddingVertical: 6,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        
    
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
      }
    
    
    });
