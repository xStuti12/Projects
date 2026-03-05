import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native"
import { Text } from "react-native-gesture-handler";
import getText from "../../../utils/text";
import { useCallback, useEffect, useState } from "react";
import { RockName } from "../../../Models/Rock";
import { getFavoriteRocks } from "../../../Services/User.Service";
import { getImage } from "../../../assets";
import { ProfileScreenNavigationProp } from "../../../Models/Map";
import { getRockByName } from "../../../Services/Backpack.Service";
import { useFocusEffect } from "@react-navigation/native";
import CustomScrollView from "../../CustomScrollView/CustomScrollView";
import assetsRives from "../../../assets/stoneRives";
import Rive from "rive-react-native";

export type FavoriteRocksListProps = {
    navigation: ProfileScreenNavigationProp
}

const FavoriteRocksList = (props: FavoriteRocksListProps) => {

    const [favoriteRocks, setFavoriteRocks] = useState<RockName[]>([]);

    useFocusEffect(
          useCallback(() => {
            const favoriteRocks = getFavoriteRocks();
            if(favoriteRocks) setFavoriteRocks(favoriteRocks);
          }, [])
    )

    const openDetail = (rockName: RockName) => {
        let rock = getRockByName(rockName);
        if(!rock) return;
        props.navigation.navigate("Detail", {item: rock});
    }

    const getRockImage = (name: RockName, idx: number) => {
        if(Object.keys(assetsRives).includes(name)){
            let riveElementToReturn = <Rive autoplay={false} style={{ width: "100%", height: "100%", pointerEvents: "none" }} resourceName={assetsRives[name]} key={idx}/>
            return (
                <View style={{width: 96, height: 96, borderRadius: 20, overflow: "hidden", marginLeft: 10, marginRight: 10}}>
                    {riveElementToReturn}
                </View>
            )
        }
        else{
            return getImage(name, styles.rockImage, idx)
        }
    }

    return(
        <View style={styles.wrapper}>
            <Text style={styles.title}>{getText("favoriteRocksTitle")}</Text>
            {favoriteRocks.length === 0 && <Text style={styles.noFavRocksText}>{getText("noFavoriteRocks")}</Text>}
           <View>
                <ScrollView horizontal 
                            showsHorizontalScrollIndicator={true} 
                            persistentScrollbar={true} 
                            indicatorStyle={"black"}
                            scrollIndicatorInsets={{ right: 1, bottom: -10 }}>
                    {favoriteRocks.map((r, idx) => <TouchableOpacity onPress={() => openDetail(r)}>{getRockImage(r, idx)}</TouchableOpacity>)}
                </ScrollView>
            </View>
           {/*  <CustomScrollView>
                {favoriteRocks.map((r, idx) => <TouchableOpacity onPress={() => openDetail(r)}>{getImage(r, styles.rockImage, idx)}</TouchableOpacity>)}
            </CustomScrollView> */}
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        marginTop: 15,
        marginHorizontal: 25,
        padding: 15,
        backgroundColor: "#B566FF",
        borderRadius: 10
    },
    title: {
        fontFamily: "Poppins-Bold",
        fontSize: 22
    },
    noFavRocksText: {
        fontFamily: "Poppins-Regular",
        fontSize: 18,
        marginTop: 10
    },
    rockImage: {
        height: 96,
        width: 96,
        marginLeft: 10,
        marginRight: 10
    }
});

export default FavoriteRocksList