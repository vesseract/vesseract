import { html, render as litRender } from 'lit-html';
import { createObjectStore } from 'reduxular';
import { State } from '../types/state.d';

const InitialState: Readonly<State> = {
    things: []
};

class VESSApp extends HTMLElement {

    readonly store = createObjectStore(InitialState, (state: Readonly<State>) => litRender(this.render(state), this), this);

    render(state: Readonly<State>) {
        return html`
            <h1>Welcome to the Himilayas!</h1>
        `;
    }
}

window.customElements.define('vess-app', VESSApp);