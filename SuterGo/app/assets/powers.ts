export type Power = {
    name: string;
    damage: number;
    cooldownMs: number
    type: PowerType
}

export enum PowerType{
    ATTACK = "Attack",
    HEAL = "Heal"
}

export const powers: Power[] = [
    {
        name: "water",
        damage: 1,
        cooldownMs: 1000,
        type: PowerType.ATTACK
    },
    {
        name: "cloud",
        damage: 3,
        cooldownMs: 2500,
        type: PowerType.ATTACK
    },
    {
        name: "fire",
        damage: 10,
        cooldownMs: 10000,
        type: PowerType.ATTACK
    },
    {
        name: "nature",
        damage: 12,
        cooldownMs: 12000,
        type: PowerType.ATTACK
    },
    {
        name: "freeze",
        damage: 15,
        cooldownMs: 15000,
        type: PowerType.ATTACK
    },
    {
        name: "heal",
        damage: 20,
        cooldownMs: 20000,
        type: PowerType.HEAL
    }
]