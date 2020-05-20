import { html, render as litRender } from 'lit-html';
import { createObjectStore } from 'reduxular';

type State = {};

const InitialState: Readonly<State> = {};

class VESSApp extends HTMLElement {

    readonly store = createObjectStore(InitialState, (state: Readonly<State>) => litRender(this.render(state), this), this);

    render(state: Readonly<State>) {
        return html`
            <h1>Welcome to the Himilayas!</h1>
        `;
    }
}

window.customElements.define('vess-app', VESSApp);