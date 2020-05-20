export type Player = {
    readonly color: string;
    readonly name: string;
    readonly id: string;
};

export type Players = {[playerId: string]: Player};