import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './LuanLHCE191099_App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import './LuanLHCE191099_index.css'
import { initData } from './services/LuanLHCE191099_dataService';

// Initialize mock data in localStorage
initData();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
