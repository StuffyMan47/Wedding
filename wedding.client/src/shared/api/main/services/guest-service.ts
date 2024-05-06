import { BaseHttpRequest } from "../core/base-http-request";
import { CancelablePromise } from "../core/cancelable-promise";
import { GetGuestsListModelApiResponseModel } from "../models/guest-model";

export class GuestService {
    constructor(public readonly httpRequest: BaseHttpRequest) { }

    public getApiGuestsList(
    ): CancelablePromise<GetGuestsListModelApiResponseModel> {
        console.log("запрос");
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/Guests/get-guest-list',
            mediaType: 'application/json',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }
}