import App from "../../pages/App";
import { QueryClientProvider } from "./query-client-provider";
import { BrowserRouter } from "react-router-dom";

export function Provider() {
    return (
        <QueryClientProvider>
            <BrowserRouter>
            <App/>
            </BrowserRouter>
        </QueryClientProvider>
    )
}