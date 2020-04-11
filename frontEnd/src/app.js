import React from 'react';
import Login from './login';
import Register from './register';
import Event from './event';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { View, Text, Button } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

function DetailsScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
    </View>
  );
}

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Event" component={Event} options={{headerShown:false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
