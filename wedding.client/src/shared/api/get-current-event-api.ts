import { useQuery } from "@tanstack/react-query";
import instance from "./axios-conf";

export const EventsKeys = {
    root: ['events'],
    currentEvent: () => [...EventsKeys.root, 'current-event'],
}

export const useCurrentEvent = (id : number) => {
    return useQuery({
        queryKey: EventsKeys.currentEvent(),
        queryFn: async () => {
            const { data } = await instance.get(
                `/api/Events/get-current-event`,
                {
                    params: {
                        id: id
                    }
                }
            );
            return data;
        },
    });
};