import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-gesture-handler";
import { getImage } from "../../../assets";
import { PickedResources } from "../../../Models/Backpack";

export type SelectResourceProps = {
    isVisible: boolean;
    setIsVisible: Function,
    selectedCell: number[],
    resources: PickedResources[],
    setSelectedItems: Function,
    alreadySelectedItem: string,
    setBackpack: Function
}

const SelectResource = (props: SelectResourceProps) => {
    
    const handlePress = (resourceName: string) => {
        let remove = true;
        props.setSelectedItems((prev: string[][]) => {
            let res = []
            for(let i = 0; i < prev.length; i++){
                let row = [];
                for(let j = 0; j < prev[i].length; j++){
                    if(i === props.selectedCell[0] && j === props.selectedCell[1]){
                        if(resourceName === props.alreadySelectedItem){
                            row.push("")
                            remove = false;
                        }
                        else{
                            row.push(resourceName)
                        }
                    }
                    else{
                        row.push(prev[i][j])
                    }
                }
                res.push(row)
            }
            return res;
        })
        props.setIsVisible(false);
        props.setBackpack((prev: PickedResources[]) => {
            let res = [];
            for(let resource of prev){
                if(resource.name === resourceName){
                    if(remove) resource.count--
                    else resource.count++
                }
                if(resource.name === props.alreadySelectedItem){
                    if(remove) resource.count++
                }
                res.push(resource)
            }
            return res
        })
    }

    const generateResources = () => {
        let res = [];
        let idx = 0;
        for(let resource of props.resources){
            if(resource.count > 0 || resource.name === props.alreadySelectedItem){
                res.push(
                    <TouchableOpacity key={idx++} style={styles.resourceWrapper} onPress={() => handlePress(resource.name)}>
                        {getImage(resource.name, styles.image)}
                        <Text>{resource.name}</Text>
                    </TouchableOpacity>
                )
            }
        }
        return res
    }


    return (
        <View style={[styles.view, StyleSheet.absoluteFill]}>
            <TouchableOpacity style={styles.backdrop} onPress={() => props.setIsVisible(false)}></TouchableOpacity>
            <View style={styles.contentWrapper}>
                {generateResources()}
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
        backgroundColor: 'white',
        width: Dimensions.get("window").width / 1.5,
        height: Dimensions.get("window").height / 1.5,
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
    }
})

export default SelectResource