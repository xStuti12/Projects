import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native"
import { Text } from "react-native-gesture-handler"
import { getImage } from "../../../assets"
import { RouteProp } from "@react-navigation/native"
import { ROCK_RESOURCE_PRINT_NAMES, RockName } from "../../../Models/Rock"
import { RecipeScreenNavigationProps } from "../../../Models/Map"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import Header from "../../Header/Header"
import assetsRives from "../../../assets/stoneRives"
import Rive from "rive-react-native"
import { RockInfo } from "../../../assets/descriptions"
import CraftingBenchViewer from "../CraftingBenchViewer/CraftingBenchViewer"
import { recipes } from "../../../assets/recipes"
import { Recipe as RecipeType} from "../../../Models/Recipe"

export type RecipeProps = {
    recipe: RecipeType
}

export type RootStackParamList = {
    Recipe: RecipeProps;
}

type RecipeScreenRouteProp = RouteProp<RootStackParamList, "Recipe">

const Recipe = ({ route, navigation }: {route: RecipeScreenRouteProp, navigation: RecipeScreenNavigationProps}) => {

    const insets = useSafeAreaInsets();
    
     const getRiveImage = () => {
        if(Object.keys(assetsRives).includes(route.params.recipe.recipeFor)){
            let riveElementToReturn = <Rive style={{ width: "100%", height: "100%", pointerEvents: "none" }} resourceName={assetsRives[route.params.recipe.recipeFor]} />
            return (
                <View style={{width: 150, height: 150, borderRadius: 20, overflow: "hidden"}}>
                    {riveElementToReturn}
                </View>
            )
        }
        else{
            return getImage(route.params.recipe.recipeFor)
        }
    }

    return (
        <View style={{flex: 1, backgroundColor: "#CE9DFC", paddingTop: insets.top, paddingBottom: insets.bottom, paddingLeft: insets.left, paddingRight: insets.right}}>
            <Header centerText="Recept" nav={navigation} showGoBack showProfile showSettings/>
            <View style={{display: "flex", alignItems: "center", marginVertical: 15}}>
                {getRiveImage()}
            </View>
            <View style={{flex: 1, backgroundColor: "white", borderTopRightRadius: 25, borderTopLeftRadius: 25, padding: 5}}>
                <Text style={styles.titles}>{ROCK_RESOURCE_PRINT_NAMES[route.params.recipe.recipeFor]}</Text>
                <Text style={styles.text}>{RockInfo[route.params.recipe.recipeFor].creationText}</Text>
                <Text style={styles.titles}>Postup</Text>
                <Text style={styles.text}>{RockInfo[route.params.recipe.recipeFor].steps}</Text>
                <Text style={styles.text}>Podmienky:</Text>
                <Text style={styles.text}>{RockInfo[route.params.recipe.recipeFor].conditions}</Text>

                <CraftingBenchViewer selectedRecipe={route.params.recipe} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    titles: {
        textAlign: "center", 
        fontFamily: "Poppins-Bold", 
        fontSize: 25
    },
    text: {
        textAlign: "center", 
        fontFamily: "Poppins-Regular"
    }
})

export default Recipe