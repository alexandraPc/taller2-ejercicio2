import React, { useState, useEffect } from "react";
import {View,ScrollView,Text,SafeAreaView,TouchableOpacity,Image, TextInput, StyleSheet, Button, Alert} from "react-native";
import { CheckBox } from '@rneui/themed';
import shortid from "react-id-generator";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Register({ navigation, route}) {
  const { userNew, setUserNew } = route.params;
  const [checked, setChecked] = React.useState(false);
  //variables para el formulario
  const [userName, setUSerName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepearPassword] = useState('');
  const [mostrarform, guardarMostrarForm] = useState(false);

  const toggleCheckbox = () => setChecked(!checked);

// Muestra u oculta el Formulario
const mostrarFormulario = () => {
guardarMostrarForm(!mostrarform);
}
// Almacenar las citas en storage
const guardarusuarios = async (userJson) => {
try {
await AsyncStorage.setItem('userNew', userJson);
await navigation.navigate("Contactos");
} catch (error) {
console.log(error);
}
}

// Muestra la alerta si falla la validación
const mostrarAlerta = () => {
Alert.alert(
'Error', // Titulo
'Todos los campos son obligatorios', // mensaje
[{
text: 'OK' // Arreglo de botones
}]
)
}
// Crear nuevo usuario
const createNewUser = async() => {
  const storedData = await AsyncStorage.getItem('userNew');
  console.log('Valor recuperado de AsyncStorage:', storedData);
// Validar
if(userName.trim() === '' ||
email.trim() === '' ||
password.trim() === '' ||
repeatPassword.trim() === '')
{
// Falla la validación
mostrarAlerta();
return;
}
// Crear un nuevo usuario
const user = { email, password, repeatPassword, userName};
user.id = shortid();
console.log(user);
// Agregar al state
const userNuevo = [...userNew, user];
setUserNew(userNuevo);
// Pasar las nuevas citas a storage
guardarusuarios(JSON.stringify(userNuevo));
// Ocultar el formulario
guardarMostrarForm(false);
// Resetear el formulario
setUSerName('');
setEmail('');
setRepearPassword('');
setPassword('');
}
  return (
    <SafeAreaView>
    <View style={{justifyContent:"center", alignItems:"center", height:"100%"}}>
    <Text style={{fontWeight:"bold", fontSize:30}}>Registrarse</Text>
    <TextInput
    placeholder=" Ingrese nombre de usuario"
    onChangeText={ texto => setUSerName(texto) }
    style={styles.input}/>
    <TextInput
    placeholder=" Ingrese email"
    onChangeText={ texto => setEmail(texto) }
    style={styles.input}/>
    <TextInput
    placeholder=" Ingrese Password"
    onChangeText={ texto => setPassword(texto) }
    style={styles.input}/>
    <TextInput
    placeholder="Repita el password"
    onChangeText={ texto => setRepearPassword(texto) }
    style={styles.input}/>
    <View style={{flexDirection:"row", justifyContent:"center", alignItems:"center", width:400}}>
    <CheckBox
           checked={checked}
           onPress={toggleCheckbox}
           // Use ThemeProvider to make change for all checkbox
          iconType="material-community"
           checkedIcon="checkbox-marked"
           uncheckedIcon="checkbox-blank-outline"
           checkedColor="red"
         />
    <Text>Acepto los terminos y condiciones</Text>
  </View>
  <View style={styles.bottom}>
    <Button title="Registrarse" onPress={createNewUser}/>
    </View>
    </View>
    </SafeAreaView>
  )
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