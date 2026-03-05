import React from "react";
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { StonesGridScreenNavigationProps } from "../../Models/Map";
import Header from "../Header/Header";
import { getPickedRocks } from "../../Services/Backpack.Service";
import { getImage } from "../../assets";
import { Rock, ROCK_RESOURCE_PRINT_NAMES, RockName } from "../../Models/Rock";
import assetsRives from "../../assets/stoneRives";
import Rive from "rive-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";

const {width, height} = Dimensions.get("window");

const StonesGrid = ({navigation} : {navigation: StonesGridScreenNavigationProps}) => {
    
    const insets = useSafeAreaInsets();

    const navigateToDetail = (rock: Rock) => {
        navigation.navigate("Detail", {item: rock})
    }

    const generateImage = (name: RockName) => {
        if(Object.keys(assetsRives).includes(name)){
            let riveElementToReturn = <Rive autoplay={false} style={{ width: "100%", height: "100%", pointerEvents: "none" }} resourceName={assetsRives[name]} />
            return (
                <View style={{width: 150, height: 150, borderRadius: 25, overflow: "hidden"}}>
                    {riveElementToReturn}
                </View>
            )
        }
        else{
            return getImage(name, styles.rockImage)
        }
    }

    const generateGrid = () => {
        const pickedRocks = getPickedRocks();
        let res = [];
        for(let i = 0; i < pickedRocks.length; i++){
            let rock = pickedRocks[i];
            res.push(
                <View key={i}>
                    <TouchableOpacity style={styles.rockWrapper} onPress={() => navigateToDetail(rock.rock)}>
                        <View>
                            {generateImage(rock.name)}
                        </View>
                    </TouchableOpacity>
                    <Text style={{textAlign: "center", fontFamily: "Poppins-Bold", fontSize: 16}}>{ROCK_RESOURCE_PRINT_NAMES[rock.rock.name]}</Text>
                </View>
            )
        }
        return res
    }
    
    return(
        <View style={{backgroundColor: "#CE9DFC", flex: 1, paddingTop: insets.top, paddingBottom: insets.bottom, paddingLeft: insets.left, paddingRight: insets.right}}>
             <Svg
                            height={height}
                            width={width}
                            viewBox={`0 0 ${width} ${height}`}
                            style={StyleSheet.absoluteFill}
                        >
                            <Path
                              d={`
                                  M0,${height}
                                  L${width*0.05},${height*0.98}  
                                  C${width*0.05},${height*0.98} ${width*0.15},${height*0.9} ${width*0.2},${height}
                                  Z
                              `}
                              fill="#061C55"
                            />
                            <Path
                              d={`
                                  M${width*0.25},${height}
                                  L${width*0.25},${height*0.97}  
                                  L${width*0.35},${height*0.94}
                                  L${width*0.45},${height*0.94}
                                  L${width*0.53},${height*0.92}
                                  L${width*0.6},${height*0.92}
                                  L${width*0.85},${height}
                                  Z
                              `}
                              fill="#061C55"
                            />
                             
                            <Path
                              d={`
                                  M${width*0.11},${height}
                                  L${width*0.18},${height*0.96}  
                                  L${width*0.28},${height}
                                  L0,${height}
                                  Z
                              `}
                              fill="#051233"
                            />
                            <Path
                              d={`
                                  M${width*0.19},${height}
                                  L${width*0.22},${height*0.9}  
                                  L${width*0.3},${height}
                                  L0,${height}
                                  Z
                              `}
                              fill="#051233"
                            />
                            <Path
                              d={`
                                  M${width*0.29},${height}
                                  L${width*0.35},${height*0.94}  
                                  L${width*0.4},${height}
                                  L0,${height}
                                  Z
                              `}
                              fill="#051233"
                            />
                            <Path
                              d={`
                                  M${width*0.39},${height}
                                  L${width*0.47},${height*0.98}  
                                  L${width*0.5},${height*0.96}
                                  L${width*0.53},${height * 0.98}
                                  L${width*0.62},${height}
                                  Z
                              `}
                              fill="#051233"
                            />
                            <Path
                              d={`
                                  M${width*0.6},${height}
                                  L${width*0.65},${height*0.98}  
                                  L${width*0.7},${height}
                                  Z
                              `}
                              fill="#051233"
                            />
                            <Path
                              d={`
                                  M${width*0.68},${height}
                                  L${width*0.74},${height*0.9}  
                                  L${width*0.78},${height}
                                  L0,${height}
                                  Z
                              `}
                              fill="#051233"
                            />
                             <Path
                              d={`
                                  M${width*0.75},${height}
                                  L${width*0.75},${height*0.99}  
                                  L${width*0.8},${height*0.97}
                                  L${width*0.82},${height*0.94}
                                  L${width*0.95},${height}
                                  Z
                              `}
                              fill="#051233"
                            />
                            <Path
                              d={`
                                  M${width*0.7},${height}
                                  L${width*0.85},${height*0.99}  
                                  L${width*0.9},${height*0.985}
                                  L${width*0.95},${height*0.976}
                                  C${width},${height*0.956} ${width},${height*0.98} ${width},${height}
                                  Z
                              `}
                              fill="#061C55"
                            />
                        </Svg>
            
            <Header centerText="Kamene" nav={navigation} showGoBack showProfile showSettings />
            <ScrollView contentContainerStyle={styles.rocksGrid}> 
                {generateGrid()}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    rocksGrid: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        marginTop: 15,
        paddingBottom: 35
    },
    rockWrapper: {
        margin: 10,
        backgroundColor: "white",
        borderRadius: 15
    },
    rockImage: {
        width: Dimensions.get("screen").width / 2.5,
        height: Dimensions.get("screen").width / 2.5
    }
})

export default StonesGrid;