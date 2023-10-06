import React, { useState, useEffect } from "react";
import {View,ScrollView,Text,SafeAreaView,TouchableOpacity,Image, TextInput, StyleSheet, Button, Alert} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login({ navigation }) {
const [userNew, setUserNew] = useState([]);
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');

useEffect(() => {
const obtenerUserstorage = async () => {
try {
const userStorage = await AsyncStorage.getItem('userNew');
console.log(userStorage, "Veamos el resultado")
if(userStorage) {
setUserNew(JSON.parse(userStorage))
}
} catch (error) {
console.log(error, "Error");
}
}
obtenerUserstorage();
}, []);

  const renderComponet = () => {
    console.log(userNew, "que ondas")
    const found = userNew.find((element) => (element.userName==email || element.email==email)&&element.password==password);
    if(found){
      navigation.navigate("Contactos");
    }else{
      Alert.alert(
'Error', // Titulo
'El Usuario no existe', // mensaje
[{
text: 'OK' // Arreglo de botones
}]
)
    }
};
 const registerComponet = () => {
    navigation.navigate("Register", {userNew, setUserNew});
};
  return (
    <SafeAreaView>
    <View style={{justifyContent:"center", alignItems:"center", height:500}}>
    <Text style={{fontWeight:"bold", fontSize:30}}>Login</Text>
    <TextInput
    placeholder=" Ingrese email o nombre de usuario"
    onChangeText={ texto => setEmail(texto) }
    style={styles.input}/>
    <TextInput
    placeholder=" Ingrese Password"
    onChangeText={ texto => setPassword(texto) }
    style={styles.input}/>
    <View style={styles.bottom}>
    <Button title="Login" onPress={renderComponet}/>
    </View>
    <View style={{flexDirection:"row", width:240, justifyContent:"space-around"}}>
    <Text>¿No tienes cuenta?</Text>
    <TouchableOpacity onPress={registerComponet}>
    <Text style={{color:"blue"}}>Registrate</Text>
    </TouchableOpacity>
    </View>
    </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
input: {
width:300,
marginTop: 10,
height: 50,
borderColor: '#e1e1e1',
borderWidth: 3,
borderStyle: 'solid',
borderBottomRightRadius:5,
borderBottomLeftRadius:5,
borderTopLeftRadius:5,
borderTopRightRadius:5,
},
bottom: {
width:300,
marginTop: 10,
height: 50,
borderBottomRightRadius:15,
borderBottomLeftRadius:15,
borderTopLeftRadius:15,
borderTopRightRadius:15
},
})