import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { StoreProvider } from './providers/ContextProvider';


import './styles/index.css'
import { initializeReactions } from './service/appService';
import { App } from './App';
import { AppStore } from './store/AppStore';

const store = new AppStore();
initializeReactions(store);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StoreProvider value={store}>
      <App />
    </StoreProvider>
  </StrictMode>,
);
