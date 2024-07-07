import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from '../pages/App';

function AppRouter() {
    return (
        <Router>
            <Routes>
                <Route path="/invite" element={<App />} />
            </Routes>
        </Router>
    );
}

export default AppRouter;