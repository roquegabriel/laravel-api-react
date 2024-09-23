import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import AppProvider, { AppContext } from './Context/AppContext.jsx'

createRoot(document.getElementById('root')).render(
    <AppProvider>
        <App />
    </AppProvider>
)
