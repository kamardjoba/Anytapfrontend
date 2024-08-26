import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './Js/App';
import { BrowserRouter } from "react-router-dom";
import { TonConnectUIProvider } from '@tonconnect/ui-react';

const container = document.getElementById('root');
const root = createRoot(container);

const manifestUrl = 'https://anytap.org/tonconnect-manifest.json';

root.render(
  <React.StrictMode>
    <TonConnectUIProvider manifestUrl={manifestUrl}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </TonConnectUIProvider>
  </React.StrictMode>
);

