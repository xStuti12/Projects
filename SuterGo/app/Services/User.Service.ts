import { MMKV } from "react-native-mmkv"
import "react-native-get-random-values"
import { v4 as uuidv4 } from 'uuid';
import { COMMON_ROCK_NAMES, EPIC_ROCK_NAMES, LEGENDARY_ROCK_NAMES, RARE_ROCK_NAMES, Rock, RockName } from "../Models/Rock";
import { getBackpack } from "./Backpack.Service";

export type User = {
    name: string,
    favoriteRocks: RockName[];
    profilePicture: RockName | null;
}

const userStorage = new MMKV({id: "user"})
const USER_OBJECT_STORAGE_KEY = "user"

export const getUserName = () => {
    const storedUser = userStorage.getString(USER_OBJECT_STORAGE_KEY)
    if(!storedUser){
        let newUserName = uuidv4().slice(0, 18);
        setNewUserName(newUserName);
        return newUserName;
    }

    let user = JSON.parse(storedUser) as User;
    return user.name;
}

export const setNewUserName = (userName: string) => {
    const storedUser = userStorage.getString(USER_OBJECT_STORAGE_KEY);
    if(!storedUser){
        let newUser: User = {
            name: userName,
            favoriteRocks: [],
            profilePicture: null
        };
        userStorage.set(USER_OBJECT_STORAGE_KEY, JSON.stringify(newUser));
        return;
    }

    let user = JSON.parse(storedUser) as User;
    user.name = userName;
    userStorage.set(USER_OBJECT_STORAGE_KEY, JSON.stringify(user));
}

export const getProfilePicture = () => {
    const storedUser = userStorage.getString(USER_OBJECT_STORAGE_KEY);
    if(!storedUser) return null;
    let user = JSON.parse(storedUser) as User;
    return user.profilePicture;
}

export const setProfilePicture = (pictureKey: RockName | null) => {
    const storedUser = userStorage.getString(USER_OBJECT_STORAGE_KEY);
    if(!storedUser) return;
    let user = JSON.parse(storedUser) as User;
    user.profilePicture = pictureKey;
    userStorage.set(USER_OBJECT_STORAGE_KEY, JSON.stringify(user));
}

export const getFavoriteRocks = () => {
    const storedUser = userStorage.getString(USER_OBJECT_STORAGE_KEY);
    if(!storedUser) return null;
    let user = JSON.parse(storedUser) as User;
    return user.favoriteRocks;
}

export const toggleFavoriteRock = (rock: RockName) => {
    const storedUser = userStorage.getString(USER_OBJECT_STORAGE_KEY);
    let added = false;
    if(!storedUser) return added;
    let user = JSON.parse(storedUser) as User;
    let rockIndex = user.favoriteRocks.indexOf(rock);
    if(rockIndex >= 0){
        user.favoriteRocks.splice(rockIndex, 1)
    }
    else{
        user.favoriteRocks.push(rock)
        added = true
    }
    userStorage.set(USER_OBJECT_STORAGE_KEY, JSON.stringify(user));

    return added;
}

export const isRockFavorite = (rock: RockName) => {
    const storedUser = userStorage.getString(USER_OBJECT_STORAGE_KEY);
    if(!storedUser) return false;
    let user = JSON.parse(storedUser) as User;
    let rockIndex = user.favoriteRocks.indexOf(rock);
    return rockIndex >= 0;
}

export const getStats = () => {
    const backpack = getBackpack();
    const allAvailableRocksCount = COMMON_ROCK_NAMES.length + RARE_ROCK_NAMES.length + EPIC_ROCK_NAMES.length + LEGENDARY_ROCK_NAMES.length;
    const allResourcesCount = backpack.pickedResource.map(p => p.count).reduce((curr, prev) => curr + prev)
    return {rockStats: `${backpack.pickedRocks.length}/${allAvailableRocksCount}`, resourcesCount: allResourcesCount}
}