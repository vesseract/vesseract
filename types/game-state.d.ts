import {Minion, Minions} from "./minion";
import {Player, Players} from "./player";

export type GameState = {
    readonly minions: Readonly<Minions>;
    readonly user: Readonly<Player> | undefined;
    readonly players: Readonly<Players>;
};