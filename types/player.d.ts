export type Player = {
    readonly color: string;
    readonly name: string;
    readonly id: string;
};

export type Players = Readonly<{readonly [playerId: string]: Readonly<Player>}>;