import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import images, { getImage } from "../../assets";
import React, { useEffect, useInsertionEffect, useRef, useState } from "react";
import { Backpack, PickedResources, PickedRocks } from "../../Models/Backpack";
import { getBackpack, getPickedResources } from "../../Services/Backpack.Service";
import BackpackItemComponent from "./BackpackItem";
import FloatingButton, { FloatingButtonElement } from "../FloatingButton/FloatingButton";
import { getCategoryName, Rock, ROCK_RESOURCE_PRINT_NAMES, RockRarity } from "../../Models/Rock";
import getText from "../../utils/text";
import { MapScreenNavigationProp } from "../../Models/Map";
import { Resource, ResourceRarity } from "../../Models/Resource";
import { RouteProp } from "@react-navigation/native";
import Header from "../Header/Header";
import { ItemDescriptions, ResourceDescriptions } from "../../assets/descriptions";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");

export class BackpackProps{    
    showResources: boolean = false;
}

export type RootStackParamList = {
    Backpack: BackpackProps;
}

type DetailScreenRouteProp = RouteProp<RootStackParamList, "Backpack">

const BackpackComponent = ({ route, navigation }: {route: DetailScreenRouteProp, navigation: MapScreenNavigationProp}) => {

    const [pickedResource, setPickedResource] = useState<Resource | null>(null);
    const insets = useSafeAreaInsets();

    const getReourceDescriptionText = () => {
        if(!pickedResource) return "";
        const text = ResourceDescriptions[pickedResource?.name]
        if(text.length > 70){
            return text.slice(0, 70).concat("...")
        }
        return text
    }

    const getStylesForOneFiled = (resource: Resource) => {
        if(resource.name === pickedResource?.name){
            return [styles.field, styles.selectedField]
        }
        return styles.field
    }

    const generateGrid = () => {
        const pickedResources = getPickedResources();
        let numberOfFields = 32;
        let res = [];


        for(let i = 0; i < numberOfFields; i++){
            if(pickedResources[i] != null){
                res.push(
                    <TouchableOpacity style={getStylesForOneFiled(pickedResources[i].resource)} key={i} onPress={() => setPickedResource(pickedResources[i].resource)}>
                        {getImage(pickedResources[i].name, styles.image)}
                        <Text style={styles.resourceCount}>{pickedResources[i].count}x</Text>
                    </TouchableOpacity>
                )
            }
            else{
                res.push(<View style={styles.field} key={i}></View>)
            }
        }
        return res;
    }

    return (
        <View style={{flex: 1, backgroundColor: "#D8EFEF", paddingTop: insets.top, paddingBottom: insets.bottom, paddingLeft: insets.left, paddingRight: insets.right}}>
            <Header centerText="Batoh" nav={navigation} showGoBack showProfile showSettings/>
            <View style={styles.wrapper}>
                <View style={styles.gridWrapper}>
                    <View style={styles.itemsWrapper}>
                        {generateGrid()}
                    </View>
                    {pickedResource && 
                        <View style={styles.infoWrapper}>
                            {getImage(pickedResource.name, styles.infoImage)}
                            <View style={styles.infoTextWrapper}>
                                <Text style={styles.resourceBottomText}>{ROCK_RESOURCE_PRINT_NAMES[pickedResource.name]}</Text>
                                <Text style={styles.resourceDescriptionText}>{getReourceDescriptionText()}</Text>
                            </View>
                        </View>
                    }
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
        height: Dimensions.get("screen").height * 0.85,
    },
    gridWrapper: {
        backgroundColor: "#061C55",
        width: Dimensions.get("screen").width * 0.85,
        height: "100%",
        borderRadius: 15,
        display: "flex",
    },
    itemsWrapper: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        marginTop: 5
    },
    field: {
        width: (Dimensions.get("screen").width * 0.85) * 0.2,
        height: (Dimensions.get("screen").height * 0.85) * 0.1,
        backgroundColor: "rgba(104, 114, 255, 1)",
        margin: 5,
        borderRadius: 10,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
    },
    selectedField: {
        backgroundColor: "#CE9DFC"
    },
    image: {
        width: ((Dimensions.get("screen").width * 0.85) * 0.21) * 0.65,
        height: ((Dimensions.get("screen").width * 0.85) * 0.21) * 0.65,
    },
    resourceCount: {
        position: "absolute",
        bottom: 0,
        right: 1,
        zIndex: 10,
        color: "white"
    },
    resourceBottomText: {
        color: "white",
        fontFamily: "Poppins-Bold"
    },
    resourceDescriptionText: {
        color: "white"
    },
    infoWrapper: {
        backgroundColor: "#42DDA2",
        marginTop: 20,
        padding: 5,
        borderRadius: 10,
        color: "white",
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
    },
    infoImage: {
        width: 36,
        height: 36
    },
    infoTextWrapper: {
        marginLeft: 15
    }
})

export default BackpackComponent;