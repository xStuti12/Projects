import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import CraftingBench from "./Craftingbench/CraftingBench";
import { CaveScreenNavigationProp } from "../../Models/Map";
import { useEffect, useRef, useState } from "react";
import { Recipe } from "../../Models/Recipe";
import { getImage } from "../../assets";
import { craftRock, RemoveResourcesForRockCrafting } from "../../Services/Backpack.Service";
import RockCrafted from "../Modals/RockCrafted/RockCrafted";
import { Rock, RockRarity } from "../../Models/Rock";
import PlayerDefeated from "../Modals/PlayerDefeated/PlayerDefeated";
import GridWithDrop from "./Craftingbench/GridWithDrop";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Cave = ({navigation} : {navigation: CaveScreenNavigationProp}) => {

    const [matchedRecipe, setMatchedRecipe] = useState<Recipe | null>(null)

    const [isRockCraftedModalVisible, setRockCraftedModalVisible]: [boolean, Function] = useState(false);
    const [isPlayerDefeated, setPlayerDefeated]: [boolean, Function] = useState(false);

    const insets = useSafeAreaInsets();

    const onReturnFromBossFight = (battleResult: boolean) => {
        if(battleResult){
            setRockCraftedModalVisible(true);
        }
        else{
            setPlayerDefeated(true);
        }
    }

    useEffect(() => {
        console.log("mame recept")
    }, [matchedRecipe])

    return(
        <View style={{flex: 1,backgroundColor: "#CE9DFC", paddingTop: insets.top, paddingBottom: insets.bottom, paddingLeft: insets.left, paddingRight: insets.right}}>
             <View style={styles.wrapper}>
               <GridWithDrop navigation={navigation} onReturnFromBossFight={onReturnFromBossFight} globalSetMatchedRecipe={setMatchedRecipe} />
            </View>
            {isRockCraftedModalVisible && <RockCrafted
                isVisible={isRockCraftedModalVisible}
                setIsVisible={setRockCraftedModalVisible}
                rockName={matchedRecipe?.recipeFor}
            />}
            {isPlayerDefeated && <PlayerDefeated
                isVisible={isPlayerDefeated}
                setIsVisible={setPlayerDefeated}
            />}
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1
    },
    wrapper: {
        flex: 1
    },
    leftButtonWrapper: {
        marginRight: 15
    },
    righButtonWrapper: {
        marginLeft: 15
    },
    recipeResultContainer:{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center"
    },
    recipeResultWrapper:{
        borderWidth: 2,
        borderBlockColor: "black",
        width: 60,
        height: 60,
        marginTop: 15,
        marginRight: 5,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    recipeImage: {
        width: 48,
        height: 48
    }
})

export default Cave