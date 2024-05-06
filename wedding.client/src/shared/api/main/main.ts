import { BaseHttpRequest } from "./core/base-http-request";
import { FetchHttpRequest } from "./core/fetch-http-request";
import { OpenAPIConfig } from "./core/open-api";
import { GuestService } from "./services/guest-service";

type HttpRequestConstructor = new (config: OpenAPIConfig) => BaseHttpRequest;

export class main {

    public readonly guest: GuestService;

    public readonly request: BaseHttpRequest;

    constructor(config?: Partial<OpenAPIConfig>, HttpRequest: HttpRequestConstructor = FetchHttpRequest) {
        this.request = new HttpRequest({
            BASE: config?.BASE ?? '',
            VERSION: config?.VERSION ?? 'main',
            WITH_CREDENTIALS: config?.WITH_CREDENTIALS ?? false,
            CREDENTIALS: config?.CREDENTIALS ?? 'include',
            TOKEN: config?.TOKEN,
            USERNAME: config?.USERNAME,
            PASSWORD: config?.PASSWORD,
            HEADERS: config?.HEADERS,
            ENCODE_PATH: config?.ENCODE_PATH,
        });

        this.guest = new GuestService(this.request);

    }
}