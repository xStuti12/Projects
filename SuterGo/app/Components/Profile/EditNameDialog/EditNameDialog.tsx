import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import getText from "../../../utils/text";
import { useState } from "react";
import { setNewUserName } from "../../../Services/User.Service";

export type EditNameDialogProps = {
    isVisible: boolean;
    setIsVisible: Function;
}

const EditNameDialog = (props: EditNameDialogProps) => {

    const [newName, setNewName] = useState("");
    const [isError, setError] = useState(false);

    const getErrorTextStyle = () => {
        if(isError){
            return styles.errorTextVisible
        }
        return styles.errorTextHidden
    }

    const saveName = () => {
        if(!newName.length){
            setError(true);
            return;
        }
        setNewUserName(newName);
        props.setIsVisible(false);
    }

    return (
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
                    <Text style={styles.title}>{getText("editNameDialogHeader")}</Text>
                    <TextInput
                        style={styles.input}
                        value={newName}
                        onChangeText={setNewName}
                    />
                    <Text style={[styles.errorText, getErrorTextStyle()]}>{getText("editNameError")}</Text>
                    <TouchableOpacity style={styles.saveButton} onPress={saveName}>
                        <Text style={styles.saveButtonText}>{getText("saveButton")}</Text>
                    </TouchableOpacity>
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
        backgroundColor: 'white',
        padding: 22,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
        display: "flex",
    },
    title: {
        fontFamily: "Poppins-Bold",
        fontSize: 18
    },
    input: {
        height: 40,
        margin: 12,
        width: "100%",
        borderWidth: 1,
        padding: 10,
        borderRadius: 15,
    },
    saveButton: {
        marginLeft: "auto"
    },
    saveButtonText: {
        fontFamily: "Poppins-Bold",
        backgroundColor: "gray",
        paddingBottom: 5,
        paddingTop: 5,
        paddingRight: 15,
        paddingLeft: 15,
        borderRadius: 15,
        color: "white"
    },
    errorText: {
        fontFamily: "Poppins-Bold",
        padding: 10,
    },
    errorTextHidden: {
        color: "white"
    },
    errorTextVisible: {
        color: "red"
    }
})

export default EditNameDialog;