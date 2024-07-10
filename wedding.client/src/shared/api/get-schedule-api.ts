import { useQuery } from "@tanstack/react-query";
import instance from "./axios-conf";

export const scheduleKeys = {
    root: ['schedules'],
    currentSchedule: () => [...scheduleKeys.root, 'current-schedule'],
}

export const useCurrentSchedule = (id: number) => {
    return useQuery({
        queryKey: scheduleKeys.currentSchedule(),
        queryFn: async () => {
            const { data } = await instance.get(
                `/api/Events/get-schedule-list`,
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