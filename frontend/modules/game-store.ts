import {createObjectStore} from "reduxular";
import {GameAction} from "../../types/game-action";
import {GameState} from "../../types/game-state";
import {Player} from "../../types/player";
import {getRandomString} from "./string";
import {generateRandomColorString} from "./color";

// placeholder until user can pick their own color and name
export function generateRandomUserPlayer(): Player {


    return {
        color: generateRandomColorString(),
        name: '',
        id: getRandomString(),
    };
}

export const emptyGameState: Readonly<GameState> = {
    minions: [],
    user: undefined,
    players: {},
};

export const GameStore = createObjectStore<Readonly<GameState>, Readonly<GameAction>>(emptyGameState, () => {}, gameStoreReducer);

function gameStoreReducer(state: Readonly<GameState>, action: Readonly<GameAction>): Readonly<GameState> {
    switch (action.type) {
        case 'ADD_MINION':
            return {
                ...state,
                minions: [
                    ...state.minions,
                    action.minion
                ],
            };
        case 'ADD_PLAYER':
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
        case 'CREATE_USER':
            const user = generateRandomUserPlayer();
            return {
                ...state,
                user,
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