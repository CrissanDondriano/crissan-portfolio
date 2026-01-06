import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Import CSS files
import './assets/styles/header.css';
import './assets/styles/footer.css';
import './assets/styles/scrollup.css';
import './assets/styles/home.css';
import './assets/styles/about.css';
import './assets/styles/portfolio.css';
import './assets/styles/contact.css';
import './assets/styles/experience.css';
import './assets/styles/capabilities.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
