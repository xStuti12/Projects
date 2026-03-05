import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Alert, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';
import MapLibreGL, { MarkerView, PointAnnotation } from '@maplibre/maplibre-react-native';
import Geolocation from '@react-native-community/geolocation';
import Map from './app/Components/Map/Map';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Detail from './app/Components/Detail/Detail';
import { Rock } from './app/Models/Rock';
import { Resource } from './app/Models/Resource';
import Cave from './app/Components/Cave/Cave';
import { RootStackParamList } from './app/Models/Map';
import RecipesViewer from './app/Components/RecipesViewer/RecipesViewer';
import BackpackComponent from './app/Components/Backpack/Backpack';
import BossFight from './app/Components/BossFight/BossFight';
import LoadingScreen from './app/Components/LoadingScreen/LoadingScreen';
import MainPage from './app/Components/MainPage/MainPage';
import Profile from './app/Components/Profile/Profile';
import StonesGrid from './app/Components/StonesGrid/StonesGrid';
import Recipe from './app/Components/RecipesViewer/Recipe/Recipe';

MapLibreGL.setAccessToken(null); // Netreba žiadny API kľúč

/* type RootStackParamList = {
  Map: undefined;
  Detail: { item: Rock | Resource };
  Cave: undefined
};
 */
const Stack = createStackNavigator<RootStackParamList>();

const App = () => {

  Geolocation.setRNConfiguration({
    skipPermissionRequests: false,
    authorizationLevel: "whenInUse",
    enableBackgroundLocationUpdates: false,
    locationProvider: "android"
  })

  return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false, detachPreviousScreen: false}}>
          <Stack.Screen name="LoadingScreen" component={LoadingScreen} />
          <Stack.Screen name="MainPage" component={MainPage} />
          <Stack.Screen name="Map" component={Map} />
          <Stack.Screen name="Backpack" component={BackpackComponent} />
          <Stack.Screen name="Detail" component={Detail} />
          <Stack.Screen name="Cave" component={Cave} />
          <Stack.Screen name="RecipesViewer" component={RecipesViewer} />
          <Stack.Screen name="BossFight" component={BossFight} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="StonesGrid" component={StonesGrid} />
          <Stack.Screen name="Recipe" component={Recipe} />
        </Stack.Navigator>
      </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  
})


export default App;
