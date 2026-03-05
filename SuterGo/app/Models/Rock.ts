import { ResourceName } from "./Resource";

/** ROCK NAMES BY TYPE - make sure these names are also presnet in index.js in assests folder */
export const COMMON_ROCK_NAMES = ["kremen", "hematite", "kalcit", "dolomite", "gypsum", "muscovit", "turmaline"] as const;

export const RARE_ROCK_NAMES = ["fluorite", "malachite", "azurite", "biotite", "opal"] as const;

export const EPIC_ROCK_NAMES = ["pyrite", "halit", "amfibol", "feldspat"] as const;

export const LEGENDARY_ROCK_NAMES = ["olivin", "serpentine", "garnet"] as const;

/** TYPES FOR ROCK NAMES */
export type CommonRockName = typeof COMMON_ROCK_NAMES[number];

export type RareRockName = typeof RARE_ROCK_NAMES[number];

export type EpicRockName = typeof EPIC_ROCK_NAMES[number];

export type LegendaryRockName = typeof LEGENDARY_ROCK_NAMES[number];

export type RockName = CommonRockName | RareRockName | EpicRockName | LegendaryRockName;

export const ROCK_RESOURCE_PRINT_NAMES: Record<RockName | ResourceName, string> = {
    //stones
    kremen: "Kremeň",
    fluorite: "Fluorit",
    pyrite: "Pyrit",
    hematite: "Hematít",
    malachite: "Malachit",
    azurite: "Azurit",
    kalcit: "Kalcit",
    dolomite: "Dolomit",
    gypsum: "Sádrovec",
    halit: "Halít",
    olivin: "Olivín",
    serpentine: "Seprentín",
    amfibol: "Amfibol",
    biotite: "Biotit",
    muscovit: "Muscovit",
    feldspat: "Živec",
    garnet: "Granát",
    turmaline: "Turmalín",
    opal: "Opál",

    //resource
    voda: "Voda",
    lavovy_kamen: "Lávový kameň",
    kyslik: "Kyslík",
    piesok: "Piesok",
    bor: "Bór",
    fluor: "Fluór",
    hlinik: "Hliník",
    horcik: "Horčík",
    kremik: "Kremík",
    med: "Meď",
    oxid_uhlicity: "Oxid uhličitý",
    sira: "Síra",
    sol: "Soľ",
    vapenec: "Vápenec",
    zelezo: "Železo"
};

export enum RockRarity{
    COMMON,
    RARE,
    EPIC,
    LEGENDARY
}

export class Rock{
    /** @property number[] -> longitude, latitude */
    coords: number[] = [];
    name: RockName = "kalcit";
    rarity: RockRarity = RockRarity.COMMON;

    setRarity(rarity: RockRarity){
        this.rarity = rarity;
    }

    setRockName(rockName: RockName){
        this.name = rockName;
    }
}

export const getCategoryName = (catIdx: number) => {
    switch(catIdx){
        case 0: return "Common";
        case 1: return "Rare";
        case 2: return "Epic";
        case 3: return "Legendary"
    }
}

export const getRarityByName = (name: string) => {
    if(COMMON_ROCK_NAMES.includes(name as typeof COMMON_ROCK_NAMES[number])) return RockRarity.COMMON
    if(RARE_ROCK_NAMES.includes(name as typeof RARE_ROCK_NAMES[number])) return RockRarity.RARE
    if(EPIC_ROCK_NAMES.includes(name as typeof EPIC_ROCK_NAMES[number])) return RockRarity.EPIC
    return RockRarity.LEGENDARY
}
