import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { RequestsProvider } from './pages/Requests/RequestsContext.jsx';

const root = createRoot(document.getElementById('root'));
root.render(

    <RequestsProvider>
        <App />
    </RequestsProvider>
);