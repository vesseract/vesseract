import {html} from 'lit-html';
import {State} from '../types/state.d';
import {VessElement} from './vess-element';

const InitialState: Readonly<State> = {
    things: []
};

class VessApp extends VessElement<State> {
    constructor() {
        super(InitialState);
    }

    protected render(state: Readonly<State>) {
        return html`
            <h1>Welcome to the Himilayas!</h1>
        `;
    }
}

window.customElements.define('vess-app', VessApp);