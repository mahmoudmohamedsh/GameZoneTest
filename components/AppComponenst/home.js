import React, { useState, useEffect } from 'react';
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
import AddTodo from './addTodo';
import 'firebase/firestore';


export default function Home({ navigation }) {
  const [isloading, setIsloading] = useState(false)
  const [get, setGet] = useState(true)
  const [loading, setLoading] = useState(false);
  const [todos, setTodos] = useState([]);

 
  
  useEffect(()=>{
    setIsloading(true)
    setTimeout(() => {
      setIsloading(false)
    },1000)
  })


  
 



  
 
  const PressUpdateHandler = (id, title) => {
    setTodos((prevTodos) => {
      return prevTodos.filter(todo => { if ((todo.id != id) == false) { todo.title = title } return true });
    })
  }
  function MyAsyncData(){
    
    
    firebase.firestore().collection("todos").onSnapshot((querySnapshot) => {
      const todosItem= []
      querySnapshot.forEach((doc) => {
          todosItem.push({
            title :doc.data().title,
            completed:doc.data().completed,
            id:doc.id
          })
          
      });
      
      setTodos(todosItem)
      console.log('todos ' ,todosItem)
  });
  }
  
   
  useEffect(() => {
    MyAsyncData()
  })
  
  const submitHandler = (titleName) => {
    if (titleName.length > 3) {
     console.log(titleName);
     
     firebase.firestore().collection('todos').add({
      title: titleName,
      completed: false
      
    }).then(()=>console.warn('done'))
    .catch((e)=>console.error(error))
      
      
    } else {
      Alert.alert('oppos', 'todo must be over 3 chars long', [
        { text: 'Understood', onPress: () => console.log('alert closed') }

      ]);
    }

  }
  
      
  

  
  const pressHandler = (id,title,completed) => {
    firebase.firestore().collection('todos').doc(id).update({
      title:title,
      completed:!completed
    }).then(()=>console.warn('completed change done'))
    
  }
  const ay5ra = (id) => {
    firebase.firestore().collection('todos').doc(`${id}`).delete().then(() => {
      console.log("Document successfully deleted!");
  }).catch(function(error) {
      console.error("Error removing document: ", error);
  });
    
  }

  return (
    
    <TouchableWithoutFeedback onPress={() => {
      Keyboard.dismiss();
      console.log("Dismissed");
    }}>
      
      {loading ?
        <ActivityIndicator style={styles.re} size="large" color="#0000ff" />
        :
        <View style={styles.container}>
          <View style={styles.content}>
            <AddTodo submitHandler={submitHandler} />

            <View style={styles.list}>
              <FlatList
                data={todos}
                
                renderItem={({ item }) => (
                  <View style={styles.item}>
                    <TouchableOpacity onPress={() => ay5ra(item.id)} style={{ flexDirection: 'row' }}>
                      <MaterialIcons name='delete' size={18} color={'#333'} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {!item.completed? navigation.navigate('Details', { item, PressUpdateHandler }):
                    console.log()}} style={{ flexDirection: 'row', flex: 1 }} >
                      <Text style={item.completed ? styles.t : styles.f}>{item.title}</Text>
                    </TouchableOpacity>
                    <CheckBox style={styles.c} value={item.completed} onChange={() => pressHandler(item.id,item.title,item.completed)} />

                  </View>
                )}
                keyExtractor={(item,index) => item.title}
              />
              
             

            </View>
            
                 

              
          </View>

        </View>
      }
    </TouchableWithoutFeedback>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#faf0e6',
  },
  content: {
    padding: 20,
    backgroundColor: 'white',
    flex: 1,
  },
  list: {
    flex: 1,
    marginTop: 10,

  },
  itemText: {
    marginLeft: 10,
  },
  item: {
    padding: 16,
    marginTop: 16,
    borderColor: '#bbb',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: 10,
    flexDirection: 'row',

  }, t: {
    marginLeft: 10,
    textDecorationLine: "line-through",
    flexShrink: 1
  }, f: {
    marginLeft: 10,
    textDecorationLine: "none",
    flexShrink: 1
  }, c: {
    marginLeft: 20,

  },
  re: {
    justifyContent: 'center',
    padding: 150
  },
  text: {
    backgroundColor: 'yellow'
  }
});

