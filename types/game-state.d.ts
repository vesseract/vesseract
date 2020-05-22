import {Minions} from './minion';
import {Player, Players} from './player';

export type GameState = {
    readonly minions: Readonly<Minions>;
    readonly players: Readonly<Players>;
    readonly user: Readonly<Player> | undefined;
};
