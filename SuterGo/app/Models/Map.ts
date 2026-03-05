import { StackNavigationProp } from "@react-navigation/stack";
import { Resource } from "./Resource";
import { Rock, RockName } from "./Rock";
import { Recipe } from "./Recipe";

export type RootStackParamList = {
  LoadingScreen: undefined;
  MainPage: undefined;
  Map: undefined;
  Detail: {item: Rock | Resource};
  Cave: undefined;
  RecipesViewer: undefined;
  Backpack: {showResources: boolean};
  BossFight: {cratfedRock: Rock, onReturn: Function},
  Profile: undefined;
  StonesGrid: undefined;
  Recipe: {recipe: Recipe}
}

export type LoadingScreenNavigationProp = StackNavigationProp<RootStackParamList, "LoadingScreen">;

export type MainPageNavigationProp = StackNavigationProp<RootStackParamList, "MainPage">;

export type MapScreenNavigationProp = StackNavigationProp<RootStackParamList, "Map">;

export type CaveScreenNavigationProp = StackNavigationProp<RootStackParamList, "Cave">;

export type BossFightScreenNavigationProp = StackNavigationProp<RootStackParamList, "BossFight">;

export type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, "Profile">;

export type StonesGridScreenNavigationProps = StackNavigationProp<RootStackParamList, "StonesGrid">;

export type RecipesViewerScreenNavigationProps = StackNavigationProp<RootStackParamList, "RecipesViewer">;

export type RecipeScreenNavigationProps = StackNavigationProp<RootStackParamList, "Recipe">;