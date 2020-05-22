import {html} from 'lit-html';

import {VessElement} from './vess-element';
import './vess-game-canvas';
import './vess-player-display';

type VessAppState = {};

const initialVessAppState: Readonly<VessAppState> = {};

class VessApp extends VessElement<VessAppState> {
    constructor() {
        super(initialVessAppState);
    }

    protected render(state: Readonly<VessAppState>) {
        return html`
            <style>
                :host {
                    display: flex;
                    flex-direction: column;
                    position: fixed;
                    top: 0;
                    left: 0;

                    height: 100%;
                    width: 100%;
                }

                vess-player-display {
                    flex-shrink: 0;
                }

                vess-game-canvas {
                    display: block;
                    flex-grow: 1;
                    height: 100%;
                    width: 100%;
                }
            </style>
            <vess-player-display></vess-player-display>
            <vess-game-canvas></vess-game-canvas>
        `;
    }
}

window.customElements.define('vess-app', VessApp);
