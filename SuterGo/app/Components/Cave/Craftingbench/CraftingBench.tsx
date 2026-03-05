import { StyleSheet, View } from "react-native"
import CraftingBenchPart from "./CraftingBenchPart";
import { useEffect, useState } from "react";
import SelectResource from "../../Modals/SelectResource/SelectResource";
import { getBackpack } from "../../../Services/Backpack.Service";
import { recipes } from "../../../assets/recipes";
import GridWithDrop from "./GridWithDrop";

export type CraftingBenchProps = {
    setMatchedRecipe: Function
    selectedItems: string[][]
    setSelectedItems: Function
}

const CraftingBench = (props: CraftingBenchProps) => {
    
    const [isModalVisible, setIsVisible]: [boolean, Function] = useState(false);
    
    const [selectedCell, setSelectedCell]: [number[], Function] = useState([0,0])
    const [backpack, setBackpack] = useState(getBackpack().pickedResource)

    const onCellPress = (i: number, j: number) => {
        setSelectedCell([i, j])
    }

    const generateCraftingBench = () => {
        let list = [];
        let key = 0;

        let rowIdxs = [0,1,2]

        for(let i = 0; i < 3; i++){
            list.push(
                <View style={styles.gridRow} key={i}>
                    {rowIdxs.map((_, j: number) => {
                        return <CraftingBenchPart xPos={i} yPos={j} key={key++} setIsVisible={setIsVisible} selectedItem={props.selectedItems[i][j]} onPress={() => onCellPress(i, j)} />
                    })
                    }
                </View>
            )
        }
        return list
    }

    useEffect(() => {
        isRecipeValid()
    }, [props.selectedItems])

    const isRecipeValid = () => {
        let filledCells = [];
        for(let i = 0; i < props.selectedItems.length; i++){
            for(let j = 0; j < props.selectedItems[i].length; j++){
                if(props.selectedItems[i][j].length > 0){
                    filledCells.push({xPos: i, yPos: j, resourceName: props.selectedItems[i][j]})
                }
            }
        }

        // monke way is the right way monke smort monke stronk
        for(let recipe of recipes){
            if(JSON.stringify(recipe.recipesPart) === JSON.stringify(filledCells)){
                props.setMatchedRecipe(recipe)
                return
            }
        }
        props.setMatchedRecipe(null)
    }

    return(
        <View style={styles.container}>
            {generateCraftingBench()}
            {isModalVisible && <SelectResource isVisible={isModalVisible} 
                                               setIsVisible={setIsVisible} 
                                               selectedCell={selectedCell} 
                                               resources={backpack}
                                               setSelectedItems={props.setSelectedItems}
                                               alreadySelectedItem={props.selectedItems[selectedCell[0]][selectedCell[1]]}
                                               setBackpack={setBackpack}/>
            }
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
    }
})

export default CraftingBench