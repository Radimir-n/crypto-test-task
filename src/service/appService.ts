import { reaction, when } from 'mobx';

import { getCoins, getConversion } from '../api/coins.api';
import { AppStore } from '../store/AppStore';
import { IConversionRequest, IConversionResponse } from '../types/conversion';

import { debounce } from '../utils/debounce';
import { logError } from '../utils/logError';

export const initializeReactions = ({ coinStore, exchangeStore }: AppStore) => {
  when(
    () => coinStore.coins.length === 0,
    async () => {
      try {
        const coinsList = await getCoins();
        coinStore.setCoins(coinsList);

        if (coinsList.length > 2) {
          exchangeStore.from.setId(coinsList[0].id);
          exchangeStore.to.setId(coinsList[1].id);
        }
      } catch (err) {
        logError('Conversion failed', err);
      }
    },
  );

  reaction(
    () => [exchangeStore.from.id, exchangeStore.from.amount],
    async ([fromId, amount]) => {
      const { from, to } = exchangeStore;
      if (from.status.isLoading || !fromId || !to.id || !amount) return;

      to.status.start();
      debouncedRequest(
        {
          from: Number(fromId),
          to: to.id,
          fromAmount: Number(amount),
        },
        (res: IConversionResponse) => {
          to.setAmount(String(res.estimatedAmount));
          exchangeStore.setRate(res.rate);
        },
        () => to.status.finish(),
      );
    },
  );

  reaction(
    () => [exchangeStore.to.id, exchangeStore.to.amount],
    async ([toId, amount]) => {
      const { from, to } = exchangeStore;
      if (to.status.isLoading || !toId || !from.id || !amount) return;

      from.status.start();
      debouncedRequest(
        {
          from: from.id,
          to: Number(toId),
          toAmount: Number(amount),
        },
        (res: IConversionResponse) => {
          from.setAmount(String(res.estimatedAmount));
          exchangeStore.setRate(res.rate);
        },
        () => from.status.finish(),
      );
    },
  );

  reaction(
    () => exchangeStore.swap.isLoading,
    (isSwapping) => {
      if (!isSwapping) return;
      const { from, to, swap } = exchangeStore;

      if (!from.id || !to.id) return;

      if (from.amount) {
        to.status.start();
      }

      const tempId = to.id;
      to.setId(from.id);
      from.setId(tempId);

      swap.finish();
    },
  );

  const requestConversion = async (
    data: IConversionRequest,
    onSuccess: (res: IConversionResponse) => void,
    onComplete?: () => void,
  ) => {
    try {
      const response = await getConversion(data);
      onSuccess(response);
    } catch (err) {
      logError('Conversion failed', err);
    } finally {
      onComplete?.();
    }
  };

  const debouncedRequest = debounce(requestConversion, 500);
};
