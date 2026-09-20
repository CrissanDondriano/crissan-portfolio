import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Import CSS files
import './assets/styles/header.css';
import './assets/styles/footer.css';
import './assets/styles/scrollup.css';
import './assets/styles/home.css';
import './assets/styles/about.css';
import './assets/styles/portfolio.css';
import './assets/styles/contact.css';
import './assets/styles/experience.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
