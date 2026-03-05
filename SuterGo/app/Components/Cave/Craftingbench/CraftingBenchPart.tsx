import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export type CraftingBenchPartProps = {
    xPos: number;
    yPos: number;
    setIsVisible: Function,
    selectedItem: string,
    onPress: Function
}

const CraftingBenchPart = (props: CraftingBenchPartProps) => {

    const getStyle = () => {
        let res: any = [style.container, style.rightCol, style.bottomRow];
        if(props.xPos == 0){
            res.push(style.topRow);
        }       
        if(props.yPos == 0){
            res.push(style.leftCol)
        }
        return res
    }

    const handlePress = () => {
        props.onPress();
        props.setIsVisible(true);
    }

    return(
        <TouchableOpacity onPress={() => handlePress()} style={getStyle()}>
            <View>
                {props.selectedItem && <Text>{props.selectedItem}</Text>}
            </View>
        </TouchableOpacity>
    )
}

const style = StyleSheet.create({
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: 60,
        height: 60
    },
    topRow: {
        borderTopWidth: 2
    },
    bottomRow: {
        borderBottomWidth: 2
    },
    leftCol: {
        borderLeftWidth: 2
    },
    rightCol: {
        borderRightWidth: 2
    },
    selectedItemImage: {
        width: 32,
        height: 32
    }

})

export default CraftingBenchPart