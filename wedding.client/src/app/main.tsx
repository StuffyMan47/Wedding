import ReactDOM from 'react-dom/client'
import '../app/styles/index.css'
import { Provider } from './Providers/index.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
    // <React.StrictMode>
    <Provider />
    ,
    // </React.StrictMode>,
)
