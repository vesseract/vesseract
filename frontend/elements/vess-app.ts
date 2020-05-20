import {html} from 'lit-html';
import {VessElement} from './vess-element';

type VessAppState = {
};

const initialVessAppState: Readonly<VessAppState> = {};

class VessApp extends VessElement<VessAppState> {
    constructor() {
        super(initialVessAppState);
    }

    protected render(state: Readonly<VessAppState>) {
        return html`
            <canvas></canvas>
        `;
    }
}

window.customElements.define('vess-app', VessApp);