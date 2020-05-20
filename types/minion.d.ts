export type Minion = {
    readonly x: number,
    readonly y: number,
    readonly playerId: string,
    readonly minionId: string,
};

export type Minions = Readonly<{readonly [minionId: string]: Readonly<Minion>}>;