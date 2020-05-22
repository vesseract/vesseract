import {createObjectStore} from 'reduxular';

import {GameAction} from '../../types/game-action';
import {GameState} from '../../types/game-state';

import {generateRandomColorString} from './color';
import {getRandomString} from './string';

function createInitialGameState(): GameState {
    const user = {
        color: generateRandomColorString(),
        id: getRandomString(),
        name: 'empty name',
    };

    const firstUserMinion = {
        minionId: getRandomString(),
        playerId: user.id,
        x: 0,
        y: 0,
    };

    return {
        minions: {[firstUserMinion.minionId]: firstUserMinion},
        players: {[user.id]: user},
        user,
    };
}

export const GameStore = createObjectStore<
    Readonly<GameState>,
    Readonly<GameAction>
>(createInitialGameState(), () => {}, {}, gameStoreReducer);

//  for the debuggins
(window as any).GameStore = GameStore;
(window as any).addMinion = (x = 100, y = 100) => {
    const user = GameStore.getState().user;
    console.log(user);
    if (user) {
        GameStore.dispatch({
            minion: {
                minionId: getRandomString(),
                playerId: user.id,
                x,
                y,
            },
            type: 'ADD_MINION',
        });
    }
};

function gameStoreReducer(
    state: Readonly<GameState>,
    action: Readonly<GameAction>,
): Readonly<GameState> {
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
                throw new Error(
                    `Player with id "${action.player.id}" already exists.`,
                );
            }
            return {
                ...state,
                players: {
                    ...state.players,
                    [action.player.id]: action.player,
                },
            };

        case 'MOVE_MINION':
            const minion = state.minions[action.minionId];
            const newY =
                action.movementDirection === 'UP'
                    ? minion.y - 10
                    : action.movementDirection === 'DOWN'
                    ? minion.y + 10
                    : minion.y;
            const newX =
                action.movementDirection === 'RIGHT'
                    ? minion.x + 10
                    : action.movementDirection === 'LEFT'
                    ? minion.x - 10
                    : minion.x;

            return {
                ...state,
                minions: {
                    ...state.minions,
                    [minion.minionId]: {
                        ...minion,
                        x: newX,
                        y: newY,
                    },
                },
            };

        default:
            return state;
    }
}
