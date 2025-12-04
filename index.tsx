import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // <--- ESTA LINHA É A CHAVE DE TUDO
import './index.css'; // <--- ADICIONE ISSO AGORA!

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);