import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import getText from "../../../utils/text";
import { getBackpack } from "../../../Services/Backpack.Service";
import { useEffect, useState } from "react";
import { PickedRocks } from "../../../Models/Backpack";
import { getImage } from "../../../assets";
import { RockName } from "../../../Models/Rock";
import { setProfilePicture } from "../../../Services/User.Service";
import assetsRives from "../../../assets/stoneRives";
import Rive from "rive-react-native";

export type SelectProfilePictureDialogProps = {
    isVisible: boolean;
    setIsVisible: Function;
}

const SelectProfilePictureDialog = (props: SelectProfilePictureDialogProps) => {

    const [rocksToRender, setRocksToRender] = useState<PickedRocks[]>([]);

    useEffect(() => {
        const pickedRocks = getBackpack().pickedRocks;
        setRocksToRender(pickedRocks);
    }, [])

    const setNewImage = (name: RockName | null) => {
        setProfilePicture(name);
        props.setIsVisible(false);
    }

    const getRockImage = (name: RockName, idx: number) => {
        if(Object.keys(assetsRives).includes(name)){
            let riveElementToReturn = <Rive autoplay={false} style={{ width: "100%", height: "100%", pointerEvents: "none" }} resourceName={assetsRives[name]} key={idx} />
            return (
                <View style={{width: 64, height: 64, borderRadius: 15, overflow: "hidden", marginLeft: 10, marginRight: 10}}>
                    {riveElementToReturn}
                </View>
            )
        }
        else{
            return getImage(name, styles.rockImage)
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
                    <Text style={styles.title}>{getText("editProfilePictureTitle")}</Text>
                    {rocksToRender.length === 0 && <Text style={styles.noRocksText}>{getText("editProfileNoRocksPicked")}</Text>}
                    {rocksToRender.length > 0 && 
                        <ScrollView horizontal showsHorizontalScrollIndicator>
                            <TouchableOpacity onPress={() => setNewImage(null)}>
                                {getImage("user_icon", styles.rockImage, 0)}
                            </TouchableOpacity>
                            {rocksToRender.map((r, idx) => <TouchableOpacity onPress={() => setNewImage(r.name)}>{getRockImage(r.name, idx)}</TouchableOpacity>)}
                        </ScrollView>
                    }
                    <Text style={styles.infoText}>{getText("editoProfilePictureInfo")}</Text>
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
    noRocksText: {
        fontFamily: "Poppins-Bold"
    },
    infoText: {
        fontFamily: "Poppins-Regular",
        fontSize: 14,
        marginTop: 15,
        textAlign: "center"
    },
    rockImage: {
        height: 64,
        width: 64,
        marginLeft: 10,
        marginRight: 10
    }
})

export default SelectProfilePictureDialog