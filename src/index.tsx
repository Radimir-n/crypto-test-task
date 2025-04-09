import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AppStore } from './store/AppStore.ts';
import { StoreProvider } from './providers/ContextProvider';

import { App } from './App.tsx';
import './styles/index.css';
import { initializeReactions } from './service/appService';

const store = new AppStore();
initializeReactions(store);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StoreProvider value={store}>
      <App />
    </StoreProvider>
  </StrictMode>,
);
