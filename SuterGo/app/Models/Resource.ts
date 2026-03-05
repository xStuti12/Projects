/** RESOURCE NAMES BY TYPE - make sure these names are also presnet in index.js in assests folder */
export const COMMON_RESOURCE_NAMES = ["lavovy_kamen", "kyslik", "piesok", "voda"] as const;

export const RARE_RESOURCE_NAMES = ["fluor", "hlinik", "horcik", "oxid_uhlicity"] as const;

export const EPIC_RESOURCE_NAMES = ["zelezo", "bor", "med", "sol", "vapenec"] as const;

export const LEGENDARY_RESOURCE_NAMES = ["kremik", "sira"] as const;

/** TYPES FOR RESOURCE NAMES */
export type CommonResourceName = typeof COMMON_RESOURCE_NAMES[number];

export type RareResourceName = typeof RARE_RESOURCE_NAMES[number];

export type EpicResourceName = typeof EPIC_RESOURCE_NAMES[number];

export type LegendaryResourceName = typeof LEGENDARY_RESOURCE_NAMES[number];

export type ResourceName = CommonResourceName | RareResourceName | EpicResourceName | LegendaryResourceName;

export enum ResourceRarity{
    COMMON,
    RARE,
    EPIC,
    LEGENDARY
}

export class Resource{
    /** @property number[] -> longitude, latitude */
    coords: number[] = [];
    name: ResourceName = "lavovy_kamen";
    rarity: ResourceRarity = ResourceRarity.COMMON;

    setRarity(rarity: ResourceRarity){
        this.rarity = rarity;
    }

    setResourceName(ResourceName: ResourceName){
        this.name = ResourceName;
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
