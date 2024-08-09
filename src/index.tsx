import App from './App'

import { createRoot } from 'react-dom/client'

import './index.scss'
import { BrowserRouter } from 'react-router-dom'

const element = document.getElementById('root') as HTMLElement
const root = createRoot(element)

root.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
)
