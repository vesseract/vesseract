import {render as litRender, TemplateResult} from 'lit-html';
import {ReduxularElement, ReduxularListener} from 'reduxular';

export abstract class VessElement<State> extends ReduxularElement<State> {
    constructor(
        initialState: State,
        listener?: ReduxularListener<State>,
    ) {
        super(initialState, state => {
            listener && listener(state);
            litRender(this.render(state), this);
        });
    }

    protected abstract render(state: Readonly<State>): TemplateResult;
}