import { ApiResponseErrors } from "./api-response-errors";
import { GetGuestsListModel } from "./get-guest-list-model";

export type GetGuestsListModelApiResponseModel = {
    errors?: ApiResponseErrors;
    data?: Array<GetGuestsListModel> | null;
    cursor?: number;
};
