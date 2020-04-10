// import React from 'react';
// import Event from './event';
// import Creation from './creation';
// import {createAppContainer} from 'react-navigation';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import Participation from './participation';
// import Logout from './logout';

// export default const MainNavigator = () => {
//   const Tab = createBottomTabNavigator();
//   return (
//     <Tab.Navigator>
//       <Tab.Screen name="Event" component={Event} />
//       <Tab.Screen name="Logout" component={Logout} />
//     </Tab.Navigator>
//   )
// };

// // const MainNavigator = createAppContainer(createBottomTabNavigator({
// //         Event: {screen: Event}, 
// //         Creation: {screen: Creation}, 
// //         Participation: {screen: Participation}, 
// //         Logout: {screen: Logout} 
// //     }, {
// //         tabBarPosition: 'bottom', // 标签显示在底部
// //         tabBarOptions: {
// //             activeTintColor: 'white',
// //             style: {
// //                 backgroundColor: 'blue',
// //             },
// //             tabStyle: {
// //                 paddingTop: 8,
// //                 paddingBottom: 4,
// //             },
// //             labelStyle: {
// //                 marginTop: 0,
// //                 marginBottom: 0
// //             },
// //         }
// //     }
// // ));

// // export default MainNavigator;