import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const GuestsKeys = {
    root: ['guests'],
    currentGuest: () => [...GuestsKeys.root, 'current-guest'],
}

export const useCurrentGuest = (id: number) => {
    return useQuery({
        queryKey: GuestsKeys.currentGuest(),
        queryFn: async () => {
            const { data } = await axios.get(
                `https://localhost:44333/api/Guests/get-current-guest`,
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