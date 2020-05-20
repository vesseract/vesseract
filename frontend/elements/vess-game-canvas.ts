import {html} from 'lit-html';
import {VessElement} from './vess-element';
import {GameStore} from '../modules/game-store';
import {GameState} from '../../types/game-state';
import {Minion} from '../../types/minion';
import {pxToNumber} from '../modules/string';

type PressedKeys = {[keyName: string]: boolean};

type VessGameCanvasState = {
    paused: boolean;
    height: number;
    width: number;
    pressedKeys: PressedKeys;
};

const initialVessGameCanvasState: Readonly<VessGameCanvasState> = {
    paused: false,
    height: -1,
    width: -1,
    pressedKeys: {},
};


class VessGameCanvas extends VessElement<VessGameCanvasState> {
    private canvas: HTMLCanvasElement | undefined;
    private gameState: Readonly<GameState> = GameStore.getState();

    constructor() {
        super(initialVessGameCanvasState);
        GameStore.subscribe(() => {
            this.gameState = GameStore.getState();
        });

        this.tabIndex = -1;

        this.addEventListener('keydown', (event: KeyboardEvent) => {
            this.store.pressedKeys[event.key] = true;
        });

        this.addEventListener('keyup', (event: KeyboardEvent) => {
            this.store.pressedKeys[event.key] = false;
        });

        this.addEventListener('blur', () => this.resetPressedKeys());
    }

    private drawMinion(minion: Minion, color: string, context: CanvasRenderingContext2D) {
        context.fillStyle = color;
        context.fillRect(minion.x - 10, minion.y - 10, 20, 20);
    }

    private resetPressedKeys() {
        this.store.pressedKeys = {};
    }

    private drawToCanvas(gameState: GameState, context: CanvasRenderingContext2D, canvasState: VessGameCanvasState) {
        context.clearRect(0, 0, canvasState.width, canvasState.height);
        Object.keys(gameState.minions).forEach(minionId => {
            const minion = gameState.minions[minionId];
            const color = gameState.players[minion.playerId].color;
            this.drawMinion(minion, color, context);
        });
    }

    private updateCanvasSize() {
        if (!this.canvas) {
            return;
        }
        const state = this.store.getState();
        const styles = getComputedStyle(this);

        const height = pxToNumber(styles.height);
        const width = pxToNumber(styles.width);

        if (height !== state.height || width !== state.width) {
            this.store.height = height;
            this.store.width = width;
        }
    }

    private handleKeys(keys: PressedKeys) {
        if (keys.ArrowUp || keys.w) {
            GameStore.dispatch({type: 'MOVE_MINION', movementDirection: 'UP', minionId: Object.keys(GameStore.getState().minions)[0]});
        }
        if (keys.ArrowDown || keys.s) {
            GameStore.dispatch({type: 'MOVE_MINION', movementDirection: 'DOWN', minionId: Object.keys(GameStore.getState().minions)[0]});
        }
        if (keys.ArrowLeft || keys.a) {
            GameStore.dispatch({type: 'MOVE_MINION', movementDirection: 'LEFT', minionId: Object.keys(GameStore.getState().minions)[0]});
        }
        if (keys.ArrowRight || keys.d) {
            GameStore.dispatch({type: 'MOVE_MINION', movementDirection: 'RIGHT', minionId: Object.keys(GameStore.getState().minions)[0]});
        }
    }

    private animateCanvas(context?: CanvasRenderingContext2D): void {
        if (!context) {
            if (!this.canvas) {
                this.canvas = this.renderRoot.querySelector('canvas') || undefined;
            }
            if (this.canvas) {
                context = this.canvas.getContext('2d') || undefined;
            }
        }

        const state = this.store.getState();

        this.updateCanvasSize();
        this.handleKeys(state.pressedKeys);

        if (!state.paused && context) {
            this.drawToCanvas(this.gameState, context, state);
        }
        requestAnimationFrame(() => this.animateCanvas(context));
    }

    public connectedCallback() {
        this.animateCanvas();
        this.focus()
    }

    protected render(state: Readonly<VessGameCanvasState>) {

        return html`
            <style>
                :host {
                    display: block;
                    position: relative;
                    box-sizing: border-box;
                }
                
                :host(:focus) {
                    outline: none;
                }
                
                canvas {
                    position: absolute;
                    box-sizing: border-box;
                    border: 8px solid red;
                    height: 100%;
                    width: 100%;
                }
            </style>
            <canvas height=${state.height} width=${state.width}>Canvas not supported</canvas>
        `;
    }
}

window.customElements.define('vess-game-canvas', VessGameCanvas);