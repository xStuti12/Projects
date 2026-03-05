import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-gesture-handler";
import { getImage } from "../../../assets";
import { PickedResources } from "../../../Models/Backpack";

export type PlayerDefeatedProps = {
    isVisible: boolean;
    setIsVisible: Function;
}

const PlayerDefeated = (props: PlayerDefeatedProps) => {

    const handleClose = () => {
        props.setIsVisible(false);
    }

    return (
        <View style={[styles.view, StyleSheet.absoluteFill]}>
            <TouchableOpacity style={styles.backdrop} onPress={handleClose}></TouchableOpacity>
            <View style={styles.contentWrapper}>
                <Text style={styles.textStyle}>Obor ťa porazil a stratil si suroviny</Text>
                <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
                    <Text style={styles.closeButtonText}>Odísť</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    view: {
        justifyContent: "center",
        alignItems: "center",
        zIndex: 99999
    },
    backdrop: {
        backgroundColor: "rgba(163,162,162,0.8)",
        flex: 1,
        position: "absolute",
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
    },
    contentWrapper: {
        backgroundColor: '#CE9DFC',
        width: Dimensions.get("window").width / 1.2,
        height: Dimensions.get("window").height / 5,
        borderRadius: 15
    },
    image: {
        width: 32,
        height: 32,
        marginRight: 5
    },
    resourceWrapper:{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        margin: 10
    },
    textStyle: {
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 20,
        marginTop: 10
    },
    closeButton: {
        flex: 1,
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center"
    },
    closeButtonText: {
        backgroundColor: "white",
        paddingVertical: 5,
        paddingHorizontal: 15,
        color: "black",
        borderRadius: 8,
        marginBottom: 15,
        fontFamily: "Poppins-Bold"
    }
})

export default PlayerDefeated