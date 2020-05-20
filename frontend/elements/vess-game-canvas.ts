import {html} from 'lit-html';
import {VessElement} from './vess-element';

type VessGameCanvasState = {};

const initialVessGameCanvasState: Readonly<VessGameCanvasState> = {};

class VessGameCanvas extends VessElement<VessGameCanvasState> {
    constructor() {
        super(initialVessGameCanvasState);
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
            
            <canvas></canvas>
        `;
    }
}

window.customElements.define('vess-game-canvas', VessGameCanvas);