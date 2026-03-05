import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Rock, ROCK_RESOURCE_PRINT_NAMES } from "../../Models/Rock"; 
import images, { getImage } from "../../assets";
import { Resource } from "../../Models/Resource";
import { MapScreenNavigationProp } from "../../Models/Map";

export class BackpackItemComponentProps{
    itemToGenerate: Rock | Resource  = new Rock();
    count: number = -1;
    navigation: MapScreenNavigationProp | null = null;    
}

const BackpackItemComponent = (props: BackpackItemComponentProps) => {

    const capitalize = (str: string) => {
        return `${str[0].toUpperCase()}${str.slice(1)}`
    }

    const handleDetailPress = () => {
       // props.closeWholeModal();
        props.navigation?.navigate("Detail", {item: props.itemToGenerate})
    }

    return(
        <TouchableOpacity onPress={handleDetailPress}>
            <View style={styles.wrapper}>
                {getImage(props.itemToGenerate.name, styles.rockImage)}
                <View style={styles.textWrapper}>
                    <Text style={styles.rockName}>{ROCK_RESOURCE_PRINT_NAMES[props.itemToGenerate.name]}</Text>
                    <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores in fugiat blanditiis odit illum doloribus laboriosam atque neque nesciunt obcaecati.</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        padding: 10,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#9F9D9D",
        width: "85%",
        borderRadius: 23
    },
    rockImage: {
        width: 60,
        height: 64
    },
    infoButton: {
        width: 32,
        height: 32
    },
    textWrapper:{
        display: "flex",
        flexDirection: "column",
        width: "80%",
        marginLeft: 15,
    },
    rockName: {
        fontWeight: "bold",
        marginRight: 5
    }
})

export default BackpackItemComponent;