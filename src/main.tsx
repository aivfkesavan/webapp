import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import ClientWrapper from './components/common/client-wrapper';
import App from './index.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ClientWrapper>
      <App />
    </ClientWrapper>
  </StrictMode>,
)
