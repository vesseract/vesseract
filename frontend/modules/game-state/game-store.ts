import {Player, generateRandomUserPlayer} from "../player";
import {Minion} from "../minion";
import {createObjectStore} from "reduxular";
import {GameAction} from "./game-action";

export type GameState = {
    readonly minions: ReadonlyArray<Minion>;
    readonly user: Readonly<Player> | undefined;
    readonly players: {[playerId: string]: Player};
};

export const emptyGameState: Readonly<GameState> = {
    minions: [],
    user: undefined,
    players: {},
};

export const GameStore = createObjectStore<Readonly<GameState>, Readonly<GameAction>>(emptyGameState, () => {}, gameStoreReducer);

function gameStoreReducer(state: Readonly<GameState>, action: Readonly<GameAction>): Readonly<GameState> {
    switch (action.type) {
        case 'add-minion':
            return {
                ...state,
                minions: [
                    ...state.minions,
                    action.minion
                ],
            };
        case 'add-player':
            if (state.players.hasOwnProperty(action.player.id)) {
                throw new Error(`Player with id "${action.player.id}" already exists.`);
            }
            return {
                ...state,
                players: {
                    ...state.players,
                    [action.player.id]: action.player
                },
            };
        case 'create-user':
            const user = generateRandomUserPlayer();
            return {
                ...state,
                user: user,
                minions: [
                    ...state.minions,
                    // add a new minion for the player
                    {
                        x: 0,
                        y: 0,
                        playerId: user.id,
                    },
                ],
            };
    }
}