import App from './App'

import { createRoot } from 'react-dom/client'

import './index.scss'

const element = document.getElementById('root') as HTMLElement
const root = createRoot(element)

root.render(<App />)
