import { StyleSheet, View } from "react-native"
import { Recipe } from "../../../Models/Recipe"
import { getImage } from "../../../assets"
import { Text } from "react-native-gesture-handler"

export type CraftingBenchViewerProps = {
    selectedRecipe: Recipe | null
}

const CraftingBenchViewer = (props: CraftingBenchViewerProps) => {

    const getItemImage = (xPos: number, yPos: number) => {
        if(!props.selectedRecipe) return null
        let element = props.selectedRecipe.recipesPart.filter(p => p.xPos === xPos && p.yPos === yPos)
        if(element.length === 0){
            return null
        }
        return getImage(element[0].resourceName, styles.resourceImage)
    }

    const generateCraftingBench = () => {
        let list = [];
        let key = 0;

        let rowIdxs = [0,1,2]

        for(let i = 0; i < 3; i++){
            list.push(
                <View style={styles.gridRow} key={i}>
                    {rowIdxs.map((_, j: number) => {
                        return (
                            <View key={key++} style={[styles.container, styles.cell]}>{getItemImage(i, j)}</View>
                        )
                    })
                    }
                </View>
            )
        }
        return list
    }

    return (
        <View style={styles.container}>
            <View style={styles.benchWrapper}>
                {generateCraftingBench()}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    gridRow: {
        display: "flex",
        flexDirection: "row"
    },
    cell: {
        width: 50,
        height: 50,
        backgroundColor: "white",
        margin: 5,
        borderRadius: 10
    },
    resourceImage: {
        width: 32,
        height: 32
    },
    benchWrapper: {
        backgroundColor: "#92e8fc",
        padding: 20,
        marginTop: 20,
        borderRadius: 20
    },
})

export default CraftingBenchViewer