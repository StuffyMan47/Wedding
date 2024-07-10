import { useQuery } from "@tanstack/react-query";
import instance from "./axios-conf";

export const GuestsKeys = {
    root: ['guests'],
    currentGuest: () => [...GuestsKeys.root, 'current-guest'],
}

export const useCurrentGuest = (id: number) => {
    return useQuery({
        queryKey: GuestsKeys.currentGuest(),
        queryFn: async () => {
            const { data } = await instance.get(
                `/api/Guests/get-current-guest`,
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