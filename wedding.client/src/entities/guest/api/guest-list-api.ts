/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "@tanstack/react-query"
import axios from "axios";

export const guestKeys = {
    root: ['guests'],
    guestList: () => [...guestKeys.root, 'guest-list'],
}

export const useGuestList = () => {
    return useQuery({
        queryKey: guestKeys.guestList(),
        queryFn: async () => {
            const { data } = await axios.get(
                `https://localhost:44333/api/Guests/get-guest-list`,
            );
            return data;
        },
    });
};