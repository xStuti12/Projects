import { Camera, MapView, MarkerView, RasterLayer, RasterSource } from "@maplibre/maplibre-react-native";
import Geolocation from "@react-native-community/geolocation";
import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, AppState, Dimensions, Image, Linking, PermissionsAndroid, SafeAreaView, StyleSheet, Text, View } from "react-native";
import images, { getImage } from "../../assets";
import SoundPlayer from "react-native-sound-player";
import PlayerModal from "../Modals/Player/Player.Modal";
import { putResourceToBackPack, putRockToBackPack } from "../../Services/Backpack.Service";
import PermissionNotGivenModal from "../Modals/PermissionNotGiven/PermissionNotGiven";
import { Resource } from "../../Models/Resource";
import generateResource from "../../Services/ResourceGeneration.Service";
import ResourcePickedModal from "../Modals/RockPicked/ResourcePicked.Modal";
import { MapScreenNavigationProp } from "../../Models/Map";
import { useFocusEffect } from "@react-navigation/native";
import MapOverlay from "./MapOverlay";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Header from "../Header/Header";

const Map = ({ navigation }: {navigation: MapScreenNavigationProp}) => {
    
    const [locationPermissionGiven, setLocationPermissionGiven] = useState(true);
    const [showPermissionModal, setShowPermissionModal] = useState(false);
    const [dontAskAgainPermission, setDontAskAgainPermission] = useState(false);
    const [appState, setAppState] = useState(AppState.currentState);

    const [center, setCenter]: [number[], Function] = useState([17.1077, 48.1486]); // Začiatočný stred mapy (Bratislava)
    
    const [locLoaded, setLocLoaded] = useState(false);
    

    const [resources, setResources]: [Resource[], Function] = useState([]);
    const [showPickedResource, setShowPickedResource] = useState(false);
    const [pickedResource, setPickedResource]: [Resource, Function] = useState(new Resource());
    const [pickedResourceIdx, setPickedResourceIdx] = useState(-1); 

    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const [cameraSettled, setCameraSettled] = useState(false);

    const TIMEOUT_BETWEEN_ROCK_GEN = 5000;
    const insets = useSafeAreaInsets();
    let centerRef = useRef(center);

    const handleResourceMarkerTouch = (resourceIdx: number) => {
        setPickedResource(resources[resourceIdx]);
        setPickedResourceIdx(resourceIdx);
        setShowPickedResource(true);
    }

    const handleDestroyResourceButton = (resourceIdx: number) => {
      setShowPickedResource(false);
      setResources((prevResources: Resource[]) => prevResources.filter((r: Resource, i: number) => i !== resourceIdx))
    }

    const handlePickResource = (resourceIdx: number) => {
      setShowPickedResource(false);
      putResourceToBackPack(resources[resourceIdx]);
      setResources((prevResources: Resource[]) => prevResources.filter((r: Resource, i: number) => i !== resourceIdx))
    }

    const askPermission = async () => {
      const permission = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
      setLocationPermissionGiven(permission === PermissionsAndroid.RESULTS.GRANTED);
      setShowPermissionModal(permission !== PermissionsAndroid.RESULTS.GRANTED);
      setDontAskAgainPermission(permission === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN);
    } 

    const openSettingsForAppPermissions = () => {
      const open = async () => {
        let res = await Linking.openSettings();
        console.log(res)
      }
      open()
    }

    const checkPermissions = async () => {
      let location = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
      setLocationPermissionGiven(location);
      setShowPermissionModal(!location);
    }

    const handleMapSettled = () => {
      setTimeout(() => setCameraSettled(true), 2500);
    }

    useEffect(() => {  
        checkPermissions();
        
        if(!locationPermissionGiven){
          return;
        }

        Geolocation.getCurrentPosition(position => {
            const {longitude, latitude} = position.coords;
            setCenter([longitude, latitude]);
            setLocLoaded(true);
        }); 

        const watchId = Geolocation.watchPosition(position => {
            const {longitude, latitude} = position.coords;
            setCenter([longitude, latitude]);

        }, error => {
            console.log("error :(")
            console.log(error)
        }, {
            enableHighAccuracy: true,
            distanceFilter: 20,
            maximumAge: 10000,
            timeout: 15000
        })

        return () => {
            Geolocation.clearWatch(watchId);
        }
    }, [locationPermissionGiven])

    useEffect(() => {
        if(!locationPermissionGiven){
          if(intervalRef.current != null){
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
          return;
        }

        if(intervalRef.current != null){
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }

        let long = center[0];
        let lat = center[1];

        intervalRef.current = setInterval(() => {
            let r = generateResource(long, lat);
            console.log(r)
            if(r != null){ //for some awesome reason I need to check for null value if(r) is just not enough :)
              console.log("beheheheheheh")
                SoundPlayer.playSoundFile("rock_spawn", "mp3");
                setResources((prevResources: Resource[]) => [...prevResources, r]);
                
            }
        }, TIMEOUT_BETWEEN_ROCK_GEN);

        return () => {
            if(intervalRef.current != null){
              clearInterval(intervalRef.current);
              intervalRef.current = null;
            }
                
        }

    }, [center, locationPermissionGiven])

    useEffect(() => {
      const subscription = AppState.addEventListener("change", (nextAppState) => {
        if(appState.match(/inactive|background/) && nextAppState === "active"){
          checkPermissions();
        }

        setAppState(nextAppState);
      })

      return () => {
        subscription.remove();
      }
    }, [appState])

    const generateResourcePins = () => {
      let res = [];
      for(let i = 0; i < resources.length; i++){
        let resource = resources[i];
        res.push(
          <MarkerView coordinate={resource.coords} anchor={{x: 0.5, y: 1}} onTouchStart={() => handleResourceMarkerTouch(i)} key={i}>
            <View style={styles.marker}>
              {getImage(resource.name, styles.rockMarker)}
            </View>
          </MarkerView>
        )
      }
      return res;
    }

    useFocusEffect(
      React.useCallback(() => {
        return () => {
          if(intervalRef.current){
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
        };
      }, [])
    );
    

  return (
    <View style={[styles.appWrapper, {paddingTop: insets.top, paddingBottom: insets.bottom, paddingLeft: insets.left, paddingRight: insets.right}]}>
      <View style={styles.container}>
        {/* <PlayerModal isVisible={showPlayerMenu} setIsVisible={setShowPlayerMenu} navigation={navigation} /> */}

         <Header centerText="" 
                nav={navigation} 
                showGoBack 
                showProfile 
                showSettings={false}
                wrapperStyle={{position: "absolute", top: 0, left: 0, width: Dimensions.get("screen").width, marginTop: 0}}
        />

        <ResourcePickedModal isVisible={showPickedResource} 
                            setIsVisible={setShowPickedResource} 
                            pickedResource={pickedResource} 
                            resourceIdx={pickedResourceIdx}
                            destroyResourceCallback={handleDestroyResourceButton}
                            takeResourceCallback={handlePickResource}
        />

        <PermissionNotGivenModal isVisible={showPermissionModal}
                                dontAskAgain={dontAskAgainPermission} 
                                openSettings={openSettingsForAppPermissions}
                                setIsVisible={setShowPermissionModal}
                                requestPermission={askPermission}  />

        {((!locLoaded || !cameraSettled) && locationPermissionGiven) && 
            <View style={styles.overlay}>
              <Text>Loading map</Text>
              <ActivityIndicator size="large"/>
            </View>   
        }
       
          <MapView style={styles.map} attributionEnabled={false} onDidFinishRenderingMapFully={() => handleMapSettled()} >
            <Camera
              minZoomLevel={16}
              maxZoomLevel={18}
              centerCoordinate={center}

            />
            <RasterSource
              id="osm"
              tileUrlTemplates={["https://b.tile.openstreetmap.org/{z}/{x}/{y}.png"]}
              tileSize={256}
            >
              <RasterLayer id="osmLayer" sourceID="osm" />
            </RasterSource>
            <MarkerView coordinate={center} 
                        /* onTouchStart={handlePlayerMarkerTouch} */
                        anchor={{x: 0.5, y: 1}}>
              <View style={styles.marker}>
                <Image style={styles.playerPin} source={images.user_pin}></Image>
              </View>
            </MarkerView>
            {resources.length > 0 && generateResourcePins()}
          </MapView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    overlay: {
      flex: 1,
      position: "absolute",
      top: 0,
      left: 0,
      height: Dimensions.get("screen").height,
      width:  Dimensions.get("screen").width,
      zIndex: 999,
      backgroundColor: "white",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    },
    appWrapper: {
      position: "relative",
      backgroundColor: "white",
      height: Dimensions.get("screen").height,
      width:  Dimensions.get("screen").width,
      flex: 1,
      margin: 0
    },
    container: { flex: 1 },
    map: { flex: 1 },
    marker: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'transparent',
      borderRadius: 50,
      width: 40,
      height: 40,
    },
    markerText: {
      fontSize: 10,
    },
    playerPin: {
        width: 36,
        height: 63
    },
    rockMarker: {
      width: 60,
      height: 64
    }
});

export default Map;