import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Icon, Input, Button } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from "./components/Login"
import Register from "./components/Register"

const ContactItem = ({ contact, onDelete }) => {
  return (
    <TouchableOpacity style={styles.contactItem} onPress={onDelete}>
      <Text style={styles.contactName}>{contact.name}</Text>
      <Text style={styles.contactPhone}>{contact.phone}</Text>
      <Icon name="delete" type="material" color="#f44336" />
    </TouchableOpacity>
  );
};

const AddContactScreen = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const navigation = useNavigation();

  const handleAddContact = async () => {
    try {
      const contact = { name, phone };
      const storedContacts = await AsyncStorage.getItem('contacts');
      const contacts = storedContacts ? JSON.parse(storedContacts) : [];
      contacts.push(contact);
      await AsyncStorage.setItem('contacts', JSON.stringify(contacts));
      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Input
        label="Nombre"
        value={name}
        onChangeText={setName}
        placeholder="Nombre"
        containerStyle={styles.inputContainer}
      />
      <Input
        label="Teléfono"
        value={phone}
        onChangeText={setPhone}
        placeholder="Teléfono"
        containerStyle={styles.inputContainer}
      />
      <Button title="Agregar" onPress={handleAddContact} />
    </View>
  );
};

const ContactsScreen = () => {
  const [contacts, setContacts] = useState([]);
  const navigation = useNavigation();

  const getContacts = async () => {
    try {
      const storedContacts = await AsyncStorage.getItem('contacts');
      if (storedContacts) {
        setContacts(JSON.parse(storedContacts));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getContacts();
  }, []);

  const handleDeleteContact = async (index) => {
    try {
      const storedContacts = await AsyncStorage.getItem('contacts');
      const contacts = JSON.parse(storedContacts);
      contacts.splice(index, 1);
      await AsyncStorage.setItem('contacts', JSON.stringify(contacts));
      setContacts(contacts);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={contacts}
        renderItem={({ item, index }) => (
          <ContactItem
            contact={item}
            onDelete={() => handleDeleteContact(index)}
          />
        )}
        keyExtractor={(item) => item.phone}
        ListEmptyComponent={() => (
          <Text style={styles.emptyList}>No hay contactos</Text>
        )}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddContact')}
      >
        <Icon name="add" type="material" color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const Stack = createStackNavigator();

const App = () => {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Contactos" component={ContactsScreen} />
        <Stack.Screen name="AddContact" component={AddContactScreen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  emptyList: {
    fontSize: 20,
    color: 'gray'
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ccc',
  },
  contactName: {
    fontSize: 19,
    fontWeight: 'bold',
  },
  contactPhone: {
    fontSize: 18,
    color: '#666',
  },
  inputContainer: {
    marginBottom: 10,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#0077b6',
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center'
  }
});

export default App;
