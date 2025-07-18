import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ProjectProvider } from './Components/context/ProjectContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ProjectProvider>
      <App />
    </ProjectProvider>
  </StrictMode>,
)
