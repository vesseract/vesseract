import {Minion} from "./minion";
import {Player} from "./player";

export type GameAction = AddMinionAction | AddPlayerAction | CreateUserAction;

export type AddMinionAction = {
    readonly type: 'ADD_MINION',
    readonly minion: Readonly<Minion>,
};

export type AddPlayerAction = {
    readonly type: 'ADD_PLAYER',
    readonly player: Readonly<Player>,
};

export type CreateUserAction = {
    readonly type: 'CREATE_USER',
};