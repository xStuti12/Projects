import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import images from "../../assets";
import { useState } from "react";

export class FloatingButtonsProps{
    buttons: FloatingButtonElement[] = [];
    pressCallback: Function = () => {};
}

export class FloatingButtonElement{
    text: string = "";
    image: React.JSX.Element | null = null;
    name: string = "";
}

const { width, height } = Dimensions.get("screen");


const FloatingButton = (props: FloatingButtonsProps) => {

    const [isOpen, setIsOpen] = useState(false);

    const generateButtons = () => {
        let res = [];
        for(let i = 0; i < props.buttons.length; i++){
            res.push(
                <TouchableOpacity onPress={() => {
                                    props.pressCallback(props.buttons[i].name);
                                    setIsOpen(false);
                                }} 
                                style={styles.floatingButtonsWrapper} 
                                key={i}
                    >
                    {props.buttons[i].image}
                    <Text style={styles.buttonText}>{props.buttons[i].text}</Text>
                </TouchableOpacity>
            )
        }
        return res;
    }

    return(
        <View>
            {isOpen && <View style={styles.backdrop} onTouchStart={() => setIsOpen(false)}></View>}
            <View style={styles.wrapper}>
                {isOpen && 
                    <View style={styles.actionButtonsWrapper}>
                        {generateButtons()}
                    </View> 
                }
                <TouchableOpacity style={styles.mainButton} onPress={() => setIsOpen(prev => !prev)}>
                    <Image source={images.filter} style={styles.mainButtonImage}></Image>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        display: "flex",
        flexDirection: "row",
        position: "relative",
        marginLeft: 15,
        marginTop: 10

    },
    mainButton: {
        backgroundColor: "dodgerblue",
        width: 32,
        height: 32,
        borderRadius: 10,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 5
    },
    mainButtonImage: {
        width: 26,
        height: 26
    },
    actionButtonsWrapper: {
        height: 200,
        width: 32,
        position: "absolute",
        top: 32,
       // backgroundColor: "black",
        zIndex: 5,
        display: "flex",
    },
    backdrop: {
        position: "absolute",
        height: height + 100,
        width: width + 100,
        top: 0,
        left: 0,
        backgroundColor: "grey",
        opacity: .75,
        zIndex: 4
    },
    floatingButtonsWrapper: {
        marginTop: 15,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        width: 100,
    },
    buttonText: {
        marginLeft: 15,
        backgroundColor: "white",
        padding: 5,
        borderRadius: 10,
        fontWeight: "bold"
    }
})

export default FloatingButton;