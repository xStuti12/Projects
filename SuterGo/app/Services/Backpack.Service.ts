import { MMKV } from "react-native-mmkv"
import { COMMON_ROCK_NAMES, EPIC_ROCK_NAMES, getRarityByName, LEGENDARY_ROCK_NAMES, RARE_ROCK_NAMES, Rock, RockName, RockRarity } from "../Models/Rock";
import { Backpack, PickedResources, PickedRocks } from "../Models/Backpack";
import { COMMON_RESOURCE_NAMES, EPIC_RESOURCE_NAMES, LEGENDARY_RESOURCE_NAMES, RARE_RESOURCE_NAMES, Resource, ResourceName, ResourceRarity } from "../Models/Resource";
import { Recipe } from "../Models/Recipe";

const storage = new MMKV();
const BACKPACK_STORAGE_KEY = "backpack";

export const putRockToBackPack = (rock: Rock) => {
    let backpack = getBackpack();
    
    let found = false;
    backpack.pickedRocks = backpack.pickedRocks.map((picked: PickedRocks) => {
        if(picked.name === rock.name){
            picked.count++;
            found = true;
        }
        return picked;
    })

    if(!found){
        backpack.pickedRocks.push({count: 1, name: rock.name, rock})
    }
    
    storage.set(BACKPACK_STORAGE_KEY, JSON.stringify(backpack));
}


export const putResourceToBackPack = (resource: Resource) => {
    let backpack = getBackpack();

    /** AK NIECO ZMENIS VRAMCI STRUKTURY BACKPACKU (aj underlying triedy) tak odkomentuj tento riadok a pickni surovinu to ti premaze existujuci backpack + DAJ VEDIET NA DC*/
    //backpack = new Backpack();

    let found = false;
    backpack.pickedResource = backpack.pickedResource.map((picked: PickedResources) => {
        if(picked.name === resource.name){
            picked.count++;
            found = true;
        }
        return picked;
    })

    if(!found){
        backpack.pickedResource.push({count: 1, name: resource.name, resource});
    }

    //backpack = putAllRocksToBackPack_DEV(backpack);
    //backpack = putAllResourcesToBackPack_DEV(backpack);

    storage.set(BACKPACK_STORAGE_KEY, JSON.stringify(backpack));
}

const putAllRocksToBackPack_DEV = (backpack: Backpack) => {
    const ALL_ROCK_NAMES: RockName[] = [
        ...COMMON_ROCK_NAMES,
        ...RARE_ROCK_NAMES,
        ...EPIC_ROCK_NAMES,
        ...LEGENDARY_ROCK_NAMES,
    ];

    backpack.pickedRocks = [];

    for(let name of ALL_ROCK_NAMES){
        let rockToAdd = new Rock();
        rockToAdd.coords = [1,1];
        rockToAdd.name = name;
        rockToAdd.rarity = RockRarity.COMMON;
        backpack.pickedRocks.push({count: 1, name: name, rock: rockToAdd})
    }

    return backpack;
}

const putAllResourcesToBackPack_DEV = (backpack: Backpack) => {
    const ALL_RESOURCE_NAMES: ResourceName[] = [
        ...COMMON_RESOURCE_NAMES,
        ...RARE_RESOURCE_NAMES,
        ...EPIC_RESOURCE_NAMES,
        ...LEGENDARY_RESOURCE_NAMES
    ]

    backpack.pickedResource = [];

    for(let name of ALL_RESOURCE_NAMES){
        let resourceToAdd = new Resource();
        resourceToAdd.coords = [1,1];
        resourceToAdd.name = name;
        resourceToAdd.rarity = ResourceRarity.COMMON;
        backpack.pickedResource.push({count: 50, name, resource: resourceToAdd})
    }

    return backpack;
}

export const craftRock = (recipe: Recipe) => {
    let backpack = getBackpack()    

    for(let recipePart of recipe.recipesPart){
        for(let pickedResource of backpack.pickedResource){
            if(pickedResource.resource.name === recipePart.resourceName){
                pickedResource.count--
            }
        }
    }

    //save updated resources
    storage.set(BACKPACK_STORAGE_KEY, JSON.stringify(backpack))

    let craftedRock = new Rock()
    craftedRock.name = recipe.recipeFor
    craftedRock.rarity = getRarityByName(recipe.recipeFor)
    
    return craftedRock;
}

export const RemoveResourcesForRockCrafting = (recipe: Recipe) => {
    let backpack = getBackpack()    

    for(let recipePart of recipe.recipesPart){
        for(let pickedResource of backpack.pickedResource){
            if(pickedResource.resource.name === recipePart.resourceName){
                pickedResource.count--
            }
        }
    }
}

export const getBackpack = () => {
    const storedBackPack = storage.getString(BACKPACK_STORAGE_KEY);
    return storedBackPack ? (JSON.parse(storedBackPack) as Backpack) : new Backpack();
}

export const getRockByName = (name: RockName) => {
    const backpack = getBackpack();
    let validRocks = backpack.pickedRocks.filter(r => r.name === name)
    if(validRocks.length > 0) return validRocks[0].rock;
    return null;
}

export const getPickedRocks = () => {
    const backpack = getBackpack();
    return backpack.pickedRocks;
}

export const getPickedResources = () => {
    const backpack = getBackpack();
    return backpack.pickedResource;
}