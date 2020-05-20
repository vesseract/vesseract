import {getRandomString} from "./string";
import {generateRandomColorString} from "./color";

export type Player = {
    readonly color: string;
    readonly name: string;
    readonly id: string;
};

export function generateRandomUserPlayer(): Player {
    return {
        color: generateRandomColorString(),
        name: '',
        id: getRandomString(),
    };
}