import {html} from 'lit-html';
import {VessElement} from './vess-element';

type VessPlayerDisplayState = {};

const initialVessPlayerDisplayState: Readonly<VessPlayerDisplayState> = {};

class VessPlayerDisplay extends VessElement<VessPlayerDisplayState> {
    constructor() {
        super(initialVessPlayerDisplayState);
    }

    protected render(state: Readonly<VessPlayerDisplayState>) {
        return html`
            <style>
                :host {
                    display: block;
                    color: white;
                    height: 32px;
                    background-color: black;
                }
            </style>
            your player here
        `;
    }
}

window.customElements.define('vess-player-display', VessPlayerDisplay);