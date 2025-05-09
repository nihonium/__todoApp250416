import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const DATA = [];

if (localStorage.getItem('tasks') === null) {
  localStorage.setItem('tasks', JSON.stringify(DATA));
} else {
  const tasks = JSON.parse(localStorage.getItem('tasks'));
  for (let i = 0; i < tasks.length; i++) {
    DATA.push(tasks[i]);
  }
  localStorage.setItem('tasks', JSON.stringify(DATA));
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App tasks={DATA} />
  </StrictMode>,
)
