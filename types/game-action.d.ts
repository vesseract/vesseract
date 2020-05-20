import {Minion} from "./minion";
import {Player} from "./player";

export type GameAction = AddMinionAction | AddPlayerAction | MoveMinionAction;

export type AddMinionAction = {
    readonly type: 'ADD_MINION',
    readonly minion: Readonly<Minion>,
};

export type AddPlayerAction = {
    readonly type: 'ADD_PLAYER',
    readonly player: Readonly<Player>,
};

export type MoveMinionAction = {
    readonly type: 'MOVE_MINION',
    readonly minionId: string,
    readonly movementDirection: 'up' | 'down' | 'left' | 'right';
};