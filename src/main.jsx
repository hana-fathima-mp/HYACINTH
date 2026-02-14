import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import HYACINTH from './HYACINTH.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HYACINTH />
  </StrictMode>,
)
