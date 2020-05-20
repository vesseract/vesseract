import {Minion} from "./minion";
import {Player, Players} from "./player";

export type GameState = {
    readonly minions: ReadonlyArray<Minion>;
    readonly user: Readonly<Player> | undefined;
    readonly players: Readonly<Players>;
};