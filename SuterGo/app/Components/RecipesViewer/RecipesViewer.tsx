import { StyleSheet, View, ScrollView, Text, TouchableOpacity, Dimensions  } from "react-native"
import { recipes } from "../../assets/recipes"
import CraftingBenchViewer from "./CraftingBenchViewer/CraftingBenchViewer"
import { useState } from "react"
import { Recipe as RecipeType } from "../../Models/Recipe"
import Header from "../Header/Header"
import { RecipesViewerScreenNavigationProps } from "../../Models/Map"
import { ROCK_RESOURCE_PRINT_NAMES, RockName } from "../../Models/Rock"
import assetsRives from "../../assets/stoneRives"
import Rive from "rive-react-native"
import { getImage } from "../../assets"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import Svg, { Path } from "react-native-svg"
import { RockInfo } from "../../assets/descriptions"

const {width, height} = Dimensions.get("window");

const RecipesViewer = ({navigation} : {navigation: RecipesViewerScreenNavigationProps}) => {

    const [selectedRecipe, setSelectedRecipe]: [RecipeType | null, Function] = useState(null)
    const insets = useSafeAreaInsets();

     const generateImage = (name: RockName) => {
        if(Object.keys(assetsRives).includes(name)){
            let riveElementToReturn = <Rive autoplay={false} style={{ width: "100%", height: "100%", pointerEvents: "none" }} resourceName={assetsRives[name]} />
            return (
                <View style={{aspectRatio: 1, height: "100%", borderRadius: 20, overflow: "hidden", backgroundColor: "white"}}>
                    {riveElementToReturn}
                </View>
            )
        }
        else{
            return getImage(name, styles.rockImage)
        }
    }

    const generateGrid = () => {
        let res = [];
        for(let i = 0; i < recipes.length; i++){
            let recipe = recipes[i];
            res.push(
                <TouchableOpacity style={styles.rockWrapper} onPress={() => navigation.navigate("Recipe", {recipe: recipe})} key={i}>
                    <View style={{flexDirection: "row", alignItems: "stretch"}}>
                        {generateImage(recipe.recipeFor)}
                        <View style={{marginLeft: 10, flexShrink: 1}}>
                            <Text style={{fontFamily: "Poppins-Bold", fontSize: 20}}>{ROCK_RESOURCE_PRINT_NAMES[recipe.recipeFor]}</Text>
                            <Text style={{flexShrink: 1}}>{getFormattedText(RockInfo[recipe.recipeFor].creationText)}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            )
        }
        return res;
    }

    const getFormattedText = (text: string) => {
        if(text.length > 60){
            return text.slice(0, 60).concat("...")
        }
        return text
    }
        

    return (
        <View style={{flex: 1, backgroundColor: "#CE9DFC", paddingTop: insets.top, paddingBottom: insets.bottom, paddingLeft: insets.left, paddingRight: insets.right}}>
              <Svg
                            height={height}
                            width={width}
                            viewBox={`0 0 ${width} ${height}`}
                            style={[StyleSheet.absoluteFill, {zIndex: 999, pointerEvents: "none"}]}
                        >
                            <Path
                              d={`
                                  M0,${height}
                                  L${width*0.05},${height*0.98}  
                                  C${width*0.05},${height*0.98} ${width*0.15},${height*0.9} ${width*0.2},${height}
                                  Z
                              `}
                              fill="#061C55"
                            />
                            <Path
                              d={`
                                  M${width*0.25},${height}
                                  L${width*0.25},${height*0.93}  
                                  L${width*0.35},${height*0.9}
                                  L${width*0.45},${height*0.9}
                                  L${width*0.53},${height*0.88}
                                  L${width*0.6},${height*0.88}
                                  L${width*0.85},${height}
                                  Z
                              `}
                              fill="#061C55"
                            />
                             
                            <Path
                              d={`
                                  M${width*0.11},${height}
                                  L${width*0.18},${height*0.94}  
                                  L${width*0.28},${height}
                                  L0,${height}
                                  Z
                              `}
                              fill="#051233"
                            />
                            <Path
                              d={`
                                  M${width*0.19},${height}
                                  L${width*0.22},${height*0.85}  
                                  L${width*0.3},${height}
                                  L0,${height}
                                  Z
                              `}
                              fill="#051233"
                            />
                            <Path
                              d={`
                                  M${width*0.29},${height}
                                  L${width*0.35},${height*0.92}  
                                  L${width*0.4},${height}
                                  L0,${height}
                                  Z
                              `}
                              fill="#051233"
                            />
                            <Path
                              d={`
                                  M${width*0.39},${height}
                                  L${width*0.47},${height*0.96}  
                                  L${width*0.5},${height*0.94}
                                  L${width*0.53},${height * 0.96}
                                  L${width*0.62},${height}
                                  Z
                              `}
                              fill="#051233"
                            />
                            <Path
                              d={`
                                  M${width*0.6},${height}
                                  L${width*0.65},${height*0.96}  
                                  L${width*0.7},${height}
                                  Z
                              `}
                              fill="#051233"
                            />
                            <Path
                              d={`
                                  M${width*0.68},${height}
                                  L${width*0.74},${height*0.85}  
                                  L${width*0.78},${height}
                                  L0,${height}
                                  Z
                              `}
                              fill="#051233"
                            />
                             <Path
                              d={`
                                  M${width*0.75},${height}
                                  L${width*0.75},${height*0.97}  
                                  L${width*0.8},${height*0.95}
                                  L${width*0.82},${height*0.92}
                                  L${width*0.95},${height}
                                  Z
                              `}
                              fill="#051233"
                            />
                            <Path
                              d={`
                                  M${width*0.7},${height}
                                  L${width*0.85},${height*0.97}  
                                  L${width*0.9},${height*0.965}
                                  L${width*0.95},${height*0.956}
                                  C${width},${height*0.956} ${width},${height*0.98} ${width},${height}
                                  Z
                              `}
                              fill="#061C55"
                            />
                        </Svg>
            <Header centerText="Recepty" nav={navigation} showGoBack showProfile showSettings  />
             <ScrollView contentContainerStyle={styles.rocksGrid}> 
                {generateGrid()}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    listWrapper: {
        marginTop: 20,
        flex: 1,
        display: "flex"
    },
    listTitle: {
        fontWeight: "bold",
        fontSize: 26,
        textAlign: "center"
    },
    rocksGrid: {
        justifyContent: "center",
        marginTop: 15,
        paddingBottom: width * 0.33
    },
    rockWrapper: {
        margin: 15,
        backgroundColor: "#FFC266",
        borderRadius: 20,
        marginHorizontal: 20,
        flex: 1
    },
    rockImage: {
        width: Dimensions.get("screen").width / 10,
        height: Dimensions.get("screen").width / 10
    }
})

export default RecipesViewer