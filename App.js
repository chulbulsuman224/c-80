import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './screens/Home';
import IssLocationScreen from './screens/IssLocation';
import MeteorsScreen from './screens/Meteors';
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import UpdateScreen from './screens/Update'

const Stack=createStackNavigator()

function App() {
  return (
   <NavigationContainer>
     <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown:false}}>
       <Stack.Screen name="Home" component={HomeScreen}/>
       <Stack.Screen name="IssLocation" component={IssLocationScreen}/>
       <Stack.Screen name="Meteors" component={MeteorsScreen}/>
       <Stack.Screen name="Update" component={UpdateScreen}/>
     </Stack.Navigator>
   </NavigationContainer>
  );
}

export default App;
