/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "@tanstack/react-query"
import axios from "axios";

export const guestKeys = {
    root: ['guest'],
    guestList: () => [...guestKeys.root, 'guestList'],
}


export function useGuestList() {
    const resp = useQuery({
        queryKey: guestKeys.guestList(),
        queryFn: async () => {
            const { data } = await axios.get(
                `https://localhost:44333/api/Guests/get-guest-list`,
            );
            return data;
        },
    })
    return resp;
}