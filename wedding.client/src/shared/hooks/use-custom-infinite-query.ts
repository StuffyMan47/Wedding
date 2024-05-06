/* eslint-disable @typescript-eslint/no-explicit-any */
import { useInfiniteQuery } from '@tanstack/react-query'
import { ApiResponseErrors } from '../api/main'

export interface QueryGet<QueryData> {
    errors: ApiResponseErrors
    data: QueryData[]
    cursor: number
}

export function useCustomInfiniteQuery<QueryData, ApiError>(pageSize?: number, options?: any, dataKey?: string) {
    const { ...query } = useInfiniteQuery<QueryGet<QueryData>, ApiError>({
        ...options,
        getNextPageParam: (lastPage) => {
            // @ts-expect-error fix
            const dataLength = dataKey ? lastPage.data[dataKey]?.length : lastPage.data?.length

            if (pageSize && dataLength < pageSize)
                return

            return lastPage.cursor
        },
        initialPageParam: 0,
    })

    const dataArr: any[] = []

    query.data?.pages.forEach((item) => {
        if (Array.isArray(item.data))
            dataArr.push(...item.data)
        else
            dataArr.push(item.data)
    })

    return { ...query, data: dataArr as QueryData }
}
