export type Player = {
    readonly color: string;
    readonly id: string;
    readonly name: string;
};

export type Players = Readonly<{readonly [playerId: string]: Readonly<Player>}>;
