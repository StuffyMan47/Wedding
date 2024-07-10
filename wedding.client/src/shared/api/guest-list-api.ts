/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "@tanstack/react-query"
import instance from "./axios-conf";

export const guestKeys = {
    root: ['guests'],
    guestList: () => [...guestKeys.root, 'guest-list'],
}

export const useGuestList = () => {
    return useQuery({
        queryKey: guestKeys.guestList(),
        queryFn: async () => {
            const { data } = await instance.get(
                `/api/Guests/get-guest-list`,
            );
            return data;
        },
    });
};