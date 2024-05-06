import { ApiRequestOptions } from "./api-request-options";
import { CancelablePromise } from "./cancelable-promise";
import { OpenAPIConfig } from "./open-api";

export abstract class BaseHttpRequest {

    constructor(public readonly config: OpenAPIConfig) { }

    public abstract request<T>(options: ApiRequestOptions): CancelablePromise<T>;
}
