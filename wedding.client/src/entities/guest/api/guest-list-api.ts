/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApiError } from "../../../shared/api/main/core/api-error"
import { mainApi } from "../../../shared/api/index"
import { GuestListModel } from "../model/guest-model"
import { useCustomInfiniteQuery } from "../../../shared/hooks/use-custom-infinite-query"

export const guestKeys = {
    root: ['guest'],
    guestList: () => [...guestKeys.root, 'guestList'],
}

export function useGuestList(options?: any) {
    return useCustomInfiniteQuery<GuestListModel[], ApiError>(
        {
            queryKey: guestKeys.guestList(),
            queryFn: async () =>
                await mainApi.main.guest.getApiGuestsList(),
            ...options,
        },
    )
}