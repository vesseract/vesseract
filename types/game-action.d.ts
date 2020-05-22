import {Minion} from './minion';
import {Player} from './player';

export type GameAction = AddMinionAction | AddPlayerAction | MoveMinionAction;

export type AddMinionAction = {
    readonly minion: Readonly<Minion>;
    readonly type: 'ADD_MINION';
};

export type AddPlayerAction = {
    readonly player: Readonly<Player>;
    readonly type: 'ADD_PLAYER';
};

export type MoveMinionAction = {
    readonly minionId: string;
    readonly movementDirection: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
    readonly type: 'MOVE_MINION';
};
