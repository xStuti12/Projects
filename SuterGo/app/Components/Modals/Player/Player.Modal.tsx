import { Image, StyleSheet, TouchableOpacity, View } from "react-native"
import ReactNativeModal from "react-native-modal"
import images from "../../../assets";
import { MapScreenNavigationProp } from "../../../Models/Map";

export class PlayerModalProps{
    isVisible: boolean = false;
    setIsVisible: Function = () => {};
    navigation: MapScreenNavigationProp | null = null;
}

const PlayerModal = (props: PlayerModalProps) => {

    return(
        <View>
            <ReactNativeModal style={styles.view} 
                              isVisible={props.isVisible} 
                              onBackdropPress={() => props.setIsVisible(false)}
                              hideModalContentWhileAnimating={true}
                              backdropTransitionOutTiming={0}
                              backdropOpacity={0.5}
                              animationIn={"fadeInUp"}
                              animationOut={"fadeOutDown"}
            >
                <View style={styles.contentWrapper}>
                    <View style={styles.content}>
                        <Image source={images.user} style={styles.image}></Image>
                        <TouchableOpacity onPress={() => {props.navigation?.navigate("Backpack", {showResources: false}); props.setIsVisible(false)}}>
                            <Image source={images.backpack} style={styles.image}></Image>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {props.navigation?.navigate("Cave"); props.setIsVisible(false)}}>
                            <Image source={images.cave} style={styles.image}></Image>
                        </TouchableOpacity>
                        <Image source={images.settings} style={styles.image}></Image>
                    </View>
                </View>
            </ReactNativeModal>
        </View>
    )
}

const styles = StyleSheet.create({
    view: {
      justifyContent: 'flex-end',
      margin: 0,
    },
    contentWrapper: {
        backgroundColor: 'white',
    },
    content: {
        padding: 22,
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
        display: "flex",
        flexDirection: "row"
    },
    contentTitle: {
        fontSize: 20,
        marginBottom: 12,
    },
    image: {
        width: 32,
        height: 32
    },
    expandedData: {
        marginTop: 25
    }
});

export default PlayerModal;