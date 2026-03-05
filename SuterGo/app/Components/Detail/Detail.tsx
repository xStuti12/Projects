import { Dimensions, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { getCategoryName, Resource } from "../../Models/Resource"
import { Rock, ROCK_RESOURCE_PRINT_NAMES, RockName } from "../../Models/Rock"
import { RouteProp } from "@react-navigation/native";
import images, { getImage } from "../../assets";
import { MapScreenNavigationProp } from "../../Models/Map";
import { ItemDescriptions, RockInfo } from "../../assets/descriptions";
import Header from "../Header/Header";
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import { getFavoriteRocks, isRockFavorite, toggleFavoriteRock } from "../../Services/User.Service";
import { useEffect, useRef, useState } from "react";
import assetsRives from "../../assets/stoneRives";
import Rive, { RiveRef } from "rive-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export class DetailProps{
    item: Rock | Resource = new Rock();
}

export type RootStackParamList = {
    Detail: DetailProps;
}

type DetailScreenRouteProp = RouteProp<RootStackParamList, "Detail">

const Detail = ({ route, navigation }: {route: DetailScreenRouteProp, navigation: MapScreenNavigationProp}) => {
    
    const [heartColor, setHeartColor] = useState<"red" | "gray">("gray");

    const riveRef = useRef<RiveRef>(null);

    const insets = useSafeAreaInsets();

    const rock = route.params.item as Rock;

    const getStyleForRarityText = (idx: number) => {
        switch(getCategoryName(idx)){
            case "Common": return styles.commonRarity;
            case "Rare": return styles.rareRarity;
            case "Epic": return styles.epicRarity;
            case "Legendary": return styles.legendaryRarity;
        }
    }

    useEffect(() => {
        setHeartColor(isRockFavorite(route.params.item.name as RockName) ? "red" : "gray");
    }, [])

    const handleToggleFavorite = () => {
        const added = toggleFavoriteRock(route.params.item.name as RockName);
        setHeartColor(added ? "red" : "gray")
    }

    const generateImage = () => {
        if(Object.keys(assetsRives).includes(route.params.item.name)){
            let riveElementToReturn = <Rive ref={riveRef} style={{ width: "100%", height: "100%" }} resourceName={assetsRives[route.params.item.name]} />
            return (
                <View style={{width: 200, height: 200, borderRadius: 25, overflow: "hidden"}}>
                    {riveElementToReturn}
                </View>
            )
        }
        else{
            return getImage(route.params.item.name, styles.imageStyle)
        }
    }

    return(
        <View style={{flex: 1, backgroundColor: "#CE9DFC", paddingTop: insets.top, paddingBottom: insets.bottom, paddingLeft: insets.left, paddingRight: insets.right}}>
            <Header centerText="Kamene" nav={navigation} showGoBack showProfile showSettings />
            <View style={styles.imageWrapper}>
                {generateImage()}
            </View>
            <View style={styles.nameWrapper}>
                <Text style={styles.itemName}>{ROCK_RESOURCE_PRINT_NAMES[route.params.item.name]}</Text>
                <TouchableOpacity style={{marginRight: 5}} onPress={() => handleToggleFavorite()}>
                    <MaterialIcons name="favorite" size={30} color={heartColor}/>
                </TouchableOpacity>
            </View>
            <View style={{flex: 1, borderTopLeftRadius: 20, borderTopRightRadius: 20, backgroundColor: "white"}}>
                <ScrollView style={{flex: 1}} contentContainerStyle={{flexGrow: 1, paddingBottom: 20, paddingTop: 20}}>
                    <Text style={{textAlign: "center", fontFamily: "Poppins-Bold", fontSize: 17}}>Prvky: {RockInfo[rock.name].steps}</Text>
                    <Text style={styles.description}>{ItemDescriptions[route.params.item.name]}</Text>
                    <View style={styles.realImageWrapper}>
                        {getImage(`real_${rock.name}`, styles.realImage)}
                    </View>
                </ScrollView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    headerImage: {
        width: 24,
        height: 24,
        margin: 15
    },
    itemName: {
        fontSize: 26,
        fontFamily: "Poppins-Regular",
    },
    rarityName: {
        textAlign: "center",
        marginTop: 10,
        fontSize: 18
    },
    imageWrapper: {
        display: "flex",
        alignItems: "center"
    },
    imageStyle: {
        width: 128,
        height: 128
    },
    commonRarity: {},
    rareRarity: {
        color: "dodgerblue",
        fontWeight: "500"
    },
    epicRarity: {
        color: "#9365B8",
        fontWeight: "700"
    },
    legendaryRarity: {
        color: "#FAC51C",
        fontWeight: "900"
    },
    description: {
        padding: 25,
        textAlign: "justify",
        fontFamily: "Poppins-Regular"
    },
    nameWrapper: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20
    },
    realImageWrapper:{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center"
    },  
    realImage: {
        width: Dimensions.get("screen").width / 3,
        height: Dimensions.get("screen").width / 3
    }
})

export default Detail;