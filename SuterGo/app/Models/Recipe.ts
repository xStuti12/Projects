/**
 * Crafting bench with indexes (x,y):
 * 
 *             +---------+---------+---------+
 *             |   0,0   |   0,1   |   0,2   |
 *             +---------+---------+---------+
 *             |   1,0   |   1,1   |   1,2   |
 *             +---------+---------+---------+
 *             |   2,0   |   2,1   |   2,2   |
 *             +---------+---------+---------+
 *
 */

import { ResourceName } from "./Resource";
import { RockName } from "./Rock";

export type RecipeData = {
    xPos: 0 | 1 | 2;
    yPos: 0 | 1 | 2;
    resourceName: ResourceName
}

export type Recipe = {
    recipeFor: RockName;
    recipesPart: RecipeData[];
}
