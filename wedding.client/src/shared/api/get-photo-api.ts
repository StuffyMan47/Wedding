import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const PlaceKeys = {
    root: ['photo'],
    photo: (id: number) => [...PlaceKeys.root, 'photo', id],
}

export const usePhoto = (id: number) => {
    return useQuery({
        queryKey: PlaceKeys.photo(id),
        queryFn: async () => {
            const response = await axios.get(
                `https://localhost:44333/api/Events/get-photo`,
                {
                    params: {
                        GuestId: id
                    },
                    responseType: 'blob' // Set the response type to 'blob'
                }
            );
            const imageUrl = URL.createObjectURL(response.data); // Create a URL for the image
            return imageUrl;
        },
    });
};