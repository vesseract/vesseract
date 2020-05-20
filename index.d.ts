export type VESSClient = {
    readonly address: string;
    readonly client: Readonly<WebSocket>;
};