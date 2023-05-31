import React from 'react'
import ReactDOM from 'react-dom/client'
// import { reportWebVitals } from 'web-vitals'
// import ReactGA from 'react-ga';
import App from './App'
import './index.css';


// ReactGA.initialize(process.env.REACT_APP_GA_TRACKING_ID);
// reportWebVitals(({ name, value}) => {
//   ReactGA.event({
//     category: 'Web Vitals',
//     action: name,
//     value: Math.round(name === 'CLS' ? value * 1000 : value),
//     nonInteraction: true,
//   });
// });

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
