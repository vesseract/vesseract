export type Minion = {
    readonly minionId: string;
    readonly playerId: string;
    readonly x: number;
    readonly y: number;
};

export type Minions = Readonly<{readonly [minionId: string]: Readonly<Minion>}>;
