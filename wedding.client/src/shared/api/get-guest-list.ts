import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGuests = () => {
    return useQuery({
        queryKey: ["guests"],
        queryFn: async () => {
            const { data } = await axios.get(
                `https://localhost:44333/api/Guests/get-guest-list`,
            );
            return data;
        },
    });
};