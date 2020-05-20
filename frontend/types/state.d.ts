export type State = {
    readonly things: ReadonlyArray<Thing>;
};

type Thing = {
    readonly x: number;
    readonly y: number;
};