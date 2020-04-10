// GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest
import React from 'react';
import {View, Text, AppRegistry} from 'react-native';
import Root from './src/root';

AppRegistry.registerComponent('frontEnd', () => Root);