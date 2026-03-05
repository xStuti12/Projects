import { COMMON_RESOURCE_NAMES, EPIC_RESOURCE_NAMES, LEGENDARY_RESOURCE_NAMES, RARE_RESOURCE_NAMES, Resource, ResourceRarity } from "../Models/Resource";

const generateResource = (long: number, lat: number): Resource | null => {
    const rng = getRandomNumberFloored(1, 100);
    if(rng < 100 && rng % 2 === 0){
        let resource = new Resource();
        resource.setRarity(getRarity())
        let rockName = getRockName(resource.rarity);
        resource.setResourceName(rockName);

        const upDown = getRandomNumberFloored(1, 100);
        if(upDown <= 50){
            resource.coords[0] = long + getRandomNumber(0.00005, 0.0001);
        }
        else{
            resource.coords[0] = long - getRandomNumber(0.00005, 0.0001);
        }

        const leftRight = getRandomNumberFloored(1,100);
        if(leftRight <= 50){
            resource.coords[1] = lat + getRandomNumber(0.00005, 0.0001);
        }
        else{
            resource.coords[1] = lat - getRandomNumber(0.00005, 0.0001);
        }
        
        return resource;
    }
    return null;
}

const getRarity = () => {
    const num = getRandomNumberFloored(1, 100);
    if(num <= 2){
        return ResourceRarity.LEGENDARY;
    }
    else if(num <= 10){
        return ResourceRarity.EPIC;
    }
    else if(num <= 25){
        return ResourceRarity.RARE;
    }
    else{
        return ResourceRarity.COMMON;
    }
}

const getRockName = (resourceRarity: ResourceRarity) => {
    let options;
    if(resourceRarity === ResourceRarity.COMMON){
        options = COMMON_RESOURCE_NAMES;
    }
    else if(resourceRarity === ResourceRarity.RARE){
        options = RARE_RESOURCE_NAMES; 
    }
    else if(resourceRarity === ResourceRarity.EPIC){
        options = EPIC_RESOURCE_NAMES;
    }
    else{
        options = LEGENDARY_RESOURCE_NAMES;
    }
    
    return options[Math.floor(Math.random() * options.length)];
}

export const getRandomNumberFloored = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min) + min);
}

const getRandomNumber = (min: number, max: number): number => {
    return Math.random() * (max - min) + min;
}

export default generateResource;