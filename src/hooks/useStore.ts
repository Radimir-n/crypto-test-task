import { useContext } from 'react';
import { StoreContext } from '../providers/ContextProvider';

export const useStore = () => {
  const store = useContext(StoreContext);
  if (!store) {
    throw new Error('No store');
  }
  return store;
};
