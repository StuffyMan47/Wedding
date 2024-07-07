import App from "../../pages/App";
import { QueryClientProvider } from "./query-client-provider";
import { BrowserRouter as Router, Route, Routes, useSearchParams } from 'react-router-dom';

export function Provider() {
    return (
        <QueryClientProvider>
            <Router>
                <Routes>
                    <Route path="/invite" element={<InvitePage />} />
                </Routes>
            </Router>
        </QueryClientProvider>
    )
}

function InvitePage() {
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');

    return <App id={ Number(id) } />;
}