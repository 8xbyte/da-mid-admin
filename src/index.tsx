import App from '@/App'
import store from '@store/store'

import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import './index.scss'

const element = document.getElementById('root') as HTMLElement
const root = createRoot(element)

root.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
)
