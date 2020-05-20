import {Minion} from "../minion";
import {Player} from "../player";

export type GameAction = AddMinionAction | AddPlayerAction | CreateUserAction;

export type AddMinionAction = {
    type: 'add-minion',
    minion: Minion,
};

export type AddPlayerAction = {
    type: 'add-player',
    player: Player,
};

export type CreateUserAction = {
    type: 'create-user',
};