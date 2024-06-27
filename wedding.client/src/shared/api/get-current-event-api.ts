import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const EventsKeys = {
    root: ['events'],
    currentEvent: () => [...EventsKeys.root, 'current-event'],
}

export const useCurrentEvent = (id : number) => {
    return useQuery({
        queryKey: EventsKeys.currentEvent(),
        queryFn: async () => {
            const { data } = await axios.get(
                `https://localhost:44333/api/Events/get-current-event`,
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