import { useQuery } from "@tanstack/react-query";
import instance from "./axios-conf";

export const PlaceKeys = {
    root: ['places'],
    currentPlace: () => [...PlaceKeys.root, 'current-place'],
}

export const useCurrentPlace = (id: number) => {
    return useQuery({
        queryKey: PlaceKeys.currentPlace(),
        queryFn: async () => {
            const { data } = await instance.get(
                `/api/Places/get-current-place`,
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