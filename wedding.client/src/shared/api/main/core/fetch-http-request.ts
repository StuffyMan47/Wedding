import { ApiRequestOptions } from "./api-request-options";
import { BaseHttpRequest } from "./base-http-request";
import { CancelablePromise } from "./cancelable-promise";
import { OpenAPIConfig } from "./open-api";
import { request as __request } from './request';

export class FetchHttpRequest extends BaseHttpRequest {

    constructor(config: OpenAPIConfig) {
        super(config);
    }

    /**
     * Request method
     * @param options The request options from the service
     * @returns CancelablePromise<T>
     * @throws ApiError
     */
    public override request<T>(options: ApiRequestOptions): CancelablePromise<T> {
        return __request(this.config, options);
    }
}