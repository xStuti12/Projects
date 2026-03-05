/**
 * @format
 */

import {AppRegistry, BackHandler} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

/*
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
This project is using react-native-modal library to show animated modals. Latest version is not stable and its crashing the build.
Current version (13.0.1) is using old way of cleanup and its calling BackHandler.removeEventListener, RN removed this function :).
To prevent crashes we define this function. This is very bad fix, and I am not proud of it. But it works. Monkey patch at its finest.
*/
if(!BackHandler.removeEventListener){
    BackHandler.removeEventListener = () => {}; // noop
}

AppRegistry.registerComponent(appName, () => App);
