import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './Js/App';
import { BrowserRouter } from "react-router-dom";
import { TonConnectUIProvider } from '@tonconnect/ui-react'; // Импортируем провайдер

const container = document.getElementById('root');
const root = createRoot(container);

const manifestUrl = 'https://gleaming-semifreddo-896ccf.netlify.app/tonconnect-manifest.json'; // URL к манифесту

root.render(
  <React.StrictMode>
    <TonConnectUIProvider manifestUrl={manifestUrl}> {/* Оборачиваем приложение в провайдер */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </TonConnectUIProvider>
  </React.StrictMode>
);
