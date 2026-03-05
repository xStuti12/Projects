import { Button, Dimensions, StyleSheet, TouchableOpacity, View } from "react-native"
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { getImage } from "../../assets";
import { MapScreenNavigationProp } from "../../Models/Map";

type props = {
    navigation: MapScreenNavigationProp
}

const MapOverlay = (props: props) => {
    return(
        <View style={styles.mainCotainer}>
            <View style={styles.contentWrapper}>
                <View style={styles.circle}>
                    {getImage("placeholder", styles.imageInCircle)}
                </View>
                <View style={styles.filler}></View>
                <View style={styles.buttonsWrapper}>
                    <TouchableOpacity onPress={() => props.navigation.navigate("StonesGrid")}>
                        <MaterialIcons name="landscape" size={64} color={"black"} />
                    </TouchableOpacity>
                    
                    <TouchableOpacity onPress={() => props.navigation.navigate("Backpack", {showResources: true})}>
                        <MaterialIcons name="backpack" size={64} color={"black"} />
                    </TouchableOpacity>
                    
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainCotainer: {
        position: "absolute",
        top: 0,
        left: 0,
        width: Dimensions.get("screen").width,
        height: Dimensions.get("screen").height,
        backgroundColor: "transparent",
    },
    contentWrapper: {
        backgroundColor: "white",
        position: "absolute",
        left: 0,
        bottom: 0,
        overflow: "visible",
        height: 125,
        width: Dimensions.get("screen").width,
        zIndex: 80,
        display: "flex",
        flexDirection: "row",
    },
    circle: {
        height: Dimensions.get("screen").width / 2,
        width: Dimensions.get("screen").width / 2,
        position: "absolute",
        borderRadius: (Dimensions.get("screen").width / 2)/2,
        bottom: 0,
        left: -25,
        backgroundColor: "gray",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    imageInCircle:{
        height: 110,
        width: 110,
        
    },
    filler: {
        width: Dimensions.get("screen").width / 2,
    },
    buttonsWrapper: {
        height: 125,
        flexGrow: 1,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center", //not centering :) that explains that forbidden paddingBottom :)
        paddingBottom: 25,
    }
})

export default MapOverlay