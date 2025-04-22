import React from 'react';
import ReactDOM from 'react-dom/client';

import { BrowserSourceDisplay } from './browserSourceDisplay';

import './scss/main.scss';
import './scss/custom.scss';

const root = ReactDOM.createRoot(
  document.getElementById('patreon-banner-offline') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserSourceDisplay />
  </React.StrictMode>
);

