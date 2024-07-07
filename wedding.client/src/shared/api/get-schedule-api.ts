import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const scheduleKeys = {
    root: ['schedules'],
    currentSchedule: () => [...scheduleKeys.root, 'current-schedule'],
}

export const useCurrentSchedule = (id: number) => {
    return useQuery({
        queryKey: scheduleKeys.currentSchedule(),
        queryFn: async () => {
            const { data } = await axios.get(
                `https://localhost:44333/api/Events/get-schedule-list`,
                {
                    params: {
                        eventId: id
                    }
                }
            );
            return data;
        },
    });
};