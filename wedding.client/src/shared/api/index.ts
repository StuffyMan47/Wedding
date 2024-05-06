import type {
    GetGuestsListModel,
} from './main'

import {
    main,
} from './main'
import type { ApiClient } from './types'

const mainClient = new main({
    BASE: import.meta.env.VITE_BASE_URL,
})

const mainApi: ApiClient = {
    main: mainClient,
}

export { mainApi };

export type {
    GetGuestsListModel,
}