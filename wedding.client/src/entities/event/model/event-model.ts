export type EventModel = {
    id: number;
    date: Date;
    description: string;
    newlyweds: string;
    place: PlaceModel;
};

export type PlaceModel = {
    name: string;
    url: string;
    address: string;
    width: number;
    longitude: number;
}