export type Minion = {
    readonly x: number,
    readonly y: number,
    readonly playerId: string,
    readonly minionId: string,
};

export type Minions = {[minionId: string]: Minion};