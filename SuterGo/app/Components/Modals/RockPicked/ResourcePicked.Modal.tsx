import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import { Rock, ROCK_RESOURCE_PRINT_NAMES, RockRarity } from "../../../Models/Rock";
import getText from "../../../utils/text";
import { getImage } from "../../../assets";
import { Resource, ResourceRarity } from "../../../Models/Resource";

export class ResourceModalProps{
    isVisible: boolean = false;
    setIsVisible: Function = () => {};
    pickedResource: Resource = new Resource();
    resourceIdx: number = -1;

    takeResourceCallback: Function = () => {};
    destroyResourceCallback: Function = () => {};
}

const ResourcePickedModal = (props: ResourceModalProps) => {

    const getRarityName = () => {
        switch(props.pickedResource.rarity){
            case ResourceRarity.COMMON: return "common";
            case ResourceRarity.RARE: return "rare";
            case ResourceRarity.EPIC: return "epic";
            case ResourceRarity.LEGENDARY: return "legendary";
        }
    }

    const getStyleForRarityText = () => {
        switch(props.pickedResource.rarity){
            case ResourceRarity.COMMON: return styles.commonRarity;
            case ResourceRarity.RARE: return styles.rareRarity;
            case ResourceRarity.EPIC: return styles.epicRarity;
            case ResourceRarity.LEGENDARY: return styles.legendaryRarity;
        }
    }

    return(
        <View>
            <Modal style={styles.view} 
                              isVisible={props.isVisible} 
                              onBackdropPress={() => props.setIsVisible(false)}
                              hideModalContentWhileAnimating={true}
                              backdropTransitionOutTiming={0}
                              backdropOpacity={0.5}
                              animationIn={"fadeInRight"}
                              animationOut={"fadeOutLeft"}>
                <View style={styles.content}>
                    <Text style={styles.contentTitle}>{getText("resourcePickedTitle", {"resourceName": ROCK_RESOURCE_PRINT_NAMES[props.pickedResource.name]})}</Text>
                    {getImage(props.pickedResource.name, styles.rockImage)}
                    
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} onPress={() => props.takeResourceCallback(props.resourceIdx)}>
                            <Text style={styles.buttonText}>{getText("resourcePickedTake")}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => props.destroyResourceCallback(props.resourceIdx)}>
                            <Text style={styles.buttonText}>{getText("resourcePickedDestroy")}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    view: {
      justifyContent: 'center',
      margin: 25,
    },
    content: {
        backgroundColor: '#D8EFEF',
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
    },
    button: {
        backgroundColor: "#CE9DFC",
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 10
    },
    buttonText: {
        fontFamily: "Poppins-Bold",
        
    }
});

export default ResourcePickedModal;