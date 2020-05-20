import {createObjectStore} from "reduxular";
import {GameAction} from "../../types/game-action";
import {GameState} from "../../types/game-state";
import {getRandomString} from "./string";
import {generateRandomColorString} from "./color";


function createInitialGameState(): GameState {
    const user = {
        color: generateRandomColorString(),
        name: 'empty name',
        id: getRandomString(),
    };

    const firstUserMinion = {
        minionId: getRandomString(),
        playerId: user.id,
        x: 0,
        y: 0,
    }

    return {
        minions: {
            [firstUserMinion.minionId]: firstUserMinion
        },
        user,
        players: {[user.id]: user},
    };
}


export const GameStore = createObjectStore<Readonly<GameState>, Readonly<GameAction>>(createInitialGameState(), () => {}, gameStoreReducer);

function gameStoreReducer(state: Readonly<GameState>, action: Readonly<GameAction>): Readonly<GameState> {
    switch (action.type) {
        case 'ADD_MINION':
            return {
                ...state,
                minions: {
                    ...state.minions,
                    [action.minion.minionId]: action.minion,
                },
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

        case 'MOVE_MINION':
            const minion = state.minions[action.minionId];
            const nextCoords = {
                x: minion.x,
                y: minion.y,
            };

            switch (action.movementDirection) {
                case 'up':
                    nextCoords.y += 10;
                    break;
                case 'down':
                    nextCoords.y -= 10;
                    break;
                case 'right':
                    nextCoords.x += 10;
                    break;
                case 'left':
                    nextCoords.x -= 10;
                    break;
            }

            return {
                ...state,
                minions: {
                    ...state.minions,
                    [minion.minionId]: {
                        ...minion,
                        ...nextCoords,
                    }
                },
            };
    }
}