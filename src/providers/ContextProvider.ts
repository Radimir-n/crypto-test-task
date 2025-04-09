import { createContext } from 'react';
import { AppStore } from '../store/AppStore.ts';

export const StoreContext = createContext<AppStore>({} as AppStore);
export const StoreProvider = StoreContext.Provider;
