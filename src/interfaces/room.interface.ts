export interface Room {
    created_at: string;
    id: number;
    name: string;
    play_state: null;
    players: Array<string>;
}

export interface RoomChange {
    commit_timestamp: string;
    errors: null;
    eventType: string;
    new: Room;
    old: {
        id: string;
    };
    schema: "public";
    table: "rooms";
};
