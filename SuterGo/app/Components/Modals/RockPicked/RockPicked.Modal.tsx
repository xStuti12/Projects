/**@deprecated */
import { Button, StyleSheet, Text, View } from "react-native";
import ReactNativeModal from "react-native-modal";
import { Rock, RockRarity } from "../../../Models/Rock";
import getText from "../../../utils/text";
import { getImage } from "../../../assets";

export class RockModalProps{
    isVisible: boolean = false;
    setIsVisible: Function = () => {};
    pickedRock: Rock = new Rock();
    rockIdx: number = -1;

    takeRockCallback: Function = () => {};
    destroyRockCallback: Function = () => {};
}

const RockPickedModal = (props: RockModalProps) => {

    const getRarityName = () => {
        switch(props.pickedRock.rarity){
            case RockRarity.COMMON: return "common";
            case RockRarity.RARE: return "rare";
            case RockRarity.EPIC: return "epic";
            case RockRarity.LEGENDARY: return "legendary";
        }
    }

    const getStyleForRarityText = () => {
        switch(props.pickedRock.rarity){
            case RockRarity.COMMON: return styles.commonRarity;
            case RockRarity.RARE: return styles.rareRarity;
            case RockRarity.EPIC: return styles.epicRarity;
            case RockRarity.LEGENDARY: return styles.legendaryRarity;
        }
    }

    return(
        <View>
            <ReactNativeModal style={styles.view} 
                              isVisible={props.isVisible} 
                              onBackdropPress={() => props.setIsVisible(false)}
                              hideModalContentWhileAnimating={true}
                              backdropTransitionOutTiming={0}
                              backdropOpacity={0.5}
                              animationIn={"fadeInRight"}
                              animationOut={"fadeOutLeft"}>
                <View style={styles.content}>
                    <Text style={styles.contentTitle}>{getText("rockPickedTitle", {"rockName": props.pickedRock.rockName})}</Text>
                    {getImage(props.pickedRock.rockName, styles.rockImage)}
                    <View style={styles.rarityContainer}>
                        <Text>{getText("rockRarity")}</Text>
                        <Text style={getStyleForRarityText()}>{getRarityName()}</Text>
                    </View>
                    
                    <View style={styles.buttonContainer}>
                        <Button title={getText("rockPickedTake")} onPress={() => props.takeRockCallback(props.rockIdx)}></Button>
                        <Button title={getText("rockPickedDestroy")} onPress={() => props.destroyRockCallback(props.rockIdx)}></Button>
                    </View>
                </View>
            </ReactNativeModal>
        </View>
    )
}

const styles = StyleSheet.create({
    view: {
      justifyContent: 'center',
      margin: 25,
    },
    content: {
        backgroundColor: 'white',
        padding: 22,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
        display: "flex",
    },
    contentTitle: {
        fontSize: 24,
        marginBottom: 12,
        fontWeight: "bold"
    },
    rarityContainer: {
        display: "flex",
        flexDirection: "row"
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
    image: {
        width: 32,
        height: 32
    },
    buttonContainer: {
        marginTop: 35,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "80%"
    },
    rockImage: {
        width: 60,
        height: 64
    }
});

export default RockPickedModal;