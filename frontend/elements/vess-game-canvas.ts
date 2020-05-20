import {html} from 'lit-html';
import {VessElement} from './vess-element';
import {GameStore} from '../modules/game-store';
import {GameState} from '../../types/game-state';
import {Minion} from '../../types/minion';
import {pxToNumber} from '../modules/string';

type VessGameCanvasState = {
    paused: boolean;
    height: number;
    width: number;
};

const initialVessGameCanvasState: Readonly<VessGameCanvasState> = {
    paused: false,
    height: -1,
    width: -1,
};


class VessGameCanvas extends VessElement<VessGameCanvasState> {
    private canvas: HTMLCanvasElement | undefined;
    private gameState: Readonly<GameState> = GameStore.getState();

    constructor() {
        super(initialVessGameCanvasState);
        GameStore.subscribe(() => {
            this.gameState = GameStore.getState();
        });
    }

    private drawMinion(minion: Minion, color: string, context: CanvasRenderingContext2D) {
        context.fillStyle = color;
        context.fillRect(minion.x - 10, minion.y - 10, 20, 20);
    }

    private drawToCanvas(gameState: GameState, context: CanvasRenderingContext2D) {
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
            this.canvas.height = height;
            this.canvas.width = width;
            this.store.height = height;
            this.store.width = width;
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

        this.updateCanvasSize();

        if (!this.store.getState().paused && context) {
            this.drawToCanvas(this.gameState, context);
        }
        requestAnimationFrame(() => this.animateCanvas(context));
    }

    public connectedCallback() {
        this.animateCanvas();
    }

    protected render(state: Readonly<VessGameCanvasState>) {

        return html`
            <style>
                :host {
                    display: block;
                    position: relative;
                    box-sizing: border-box;
                }
                
                canvas {
                    position: absolute;
                    box-sizing: border-box;
                    border: 8px solid red;
                    height: 100%;
                    width: 100%;
                }
            </style>
            <canvas>Canvas not supported</canvas>
        `;
    }
}

window.customElements.define('vess-game-canvas', VessGameCanvas);