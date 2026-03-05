import { Resource } from "./Resource";
import { Rock, RockName } from "./Rock";

export class Backpack{
    pickedRocks: PickedRocks[] = [];
    pickedResource: PickedResources[] = [];
}

export class PickedRocks{
    name: RockName = "amfibol";
    count: number = 0;
    rock: Rock = new Rock();
}

export class PickedResources{
    name: string = "";
    count: number = 0;
    resource: Resource = new Resource();
}