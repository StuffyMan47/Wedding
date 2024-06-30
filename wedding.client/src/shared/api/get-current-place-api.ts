import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const PlaceKeys = {
    root: ['places'],
    currentPlace: () => [...PlaceKeys.root, 'current-place'],
}

export const useCurrentPlace = (id: number) => {
    return useQuery({
        queryKey: PlaceKeys.currentPlace(),
        queryFn: async () => {
            const { data } = await axios.get(
                `https://localhost:44333/api/Places/get-current-place`,
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