import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import getText from "../../../utils/text";

export class PermissionNotGivenModalProps{
    isVisible: boolean = true;
    dontAskAgain: boolean = false;

    setIsVisible: Function = () => {};
    requestPermission: Function = () => {};
    openSettings: Function = () => {};
}

const PermissionNotGivenModal = (props: PermissionNotGivenModalProps) => {

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
                    <Text style={styles.contentTitle}>{props.dontAskAgain ? getText("permissionDontAskAgainMessage") : getText("permissionNotGivenMessage")}</Text>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} onPress={() => props.dontAskAgain ? props.openSettings() : props.requestPermission()}>
                            <Text style={styles.buttonText}>{getText("permissionNotGivenOkButton")}</Text>
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
        fontSize: 20,
        marginBottom: 12,
        fontWeight: "bold"
    },
    buttonContainer: {
        marginTop: 35,
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        width: "80%"
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

export default PermissionNotGivenModal;