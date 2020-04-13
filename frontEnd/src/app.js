import React from 'react';
import Login from './login';
import Register from './register';
import Event from './event';
import Participation from './participation';
import Creation from './creation';
import Myinfo from './myinfo';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// const Tab = createBottomTabNavigator();

// function TabNavigator() {
//   return (
//       <Tab.Navigator>
//         <Tab.Screen name="Event" component={Event} />
//         <Tab.Screen name="Myinfo" component={Myinfo} />
//       </Tab.Navigator>
//   );
// }

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} options={{headerShown:false}}/>
        <Stack.Screen name="Register" component={Register} options={{headerShown:false}}/>
        <Stack.Screen name="Event" component={Event}  options={{headerShown:false}}/>
        <Stack.Screen name="Participation" component={Participation}  options={{headerShown:false}}/>
        <Stack.Screen name="Creation" component={Creation}  options={{headerShown:false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;