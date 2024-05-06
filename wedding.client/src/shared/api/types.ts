import { main } from "./main/main"
import { ApiResponseErrors } from "./main/models/api-response-errors"

export interface ApiClient {
    main: main
}
export interface BaseApiResponse<T> {
    data?: T
    errors?: ApiResponseErrors
}
