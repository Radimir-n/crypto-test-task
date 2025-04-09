import { observer } from 'mobx-react-lite';

import styled from 'styled-components';
import { Button } from 'antd';

import { SwapOutlined } from '@ant-design/icons';

import { InputWithSelect } from '../index';
import { useStore } from '../../hooks/useStore';
import { ExchangerCurrencyKeys } from '../../store/ExchangeStore';
import { ICoinOption } from '../../types/coins';

const ExchangerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 15px;
  padding: 20px;
  max-width: 300px;
  min-width: 100px;
  margin: 0 auto;
  background: #1f2235;
`;

const Panel = styled.div`
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  font-size: 0.7rem;
  color: white;
`;

const SwapButton = styled(Button)`
  && {
    background-color: #36324a;
    border: none;
    color: green;
    border-radius: 8px;

    &:not(:disabled):not(.ant-btn-disabled):hover {
      background-color: #36324a;
      color: green;
      transform: translateY(-1px);

      .anticon {
        transform: rotate(180deg);
      }
    }

    &:not(:disabled):not(.ant-btn-disabled):active {
      background-color: #36324a;
      transform: translateY(0);
    }

    .anticon {
      transition: transform 0.3s ease;
    }
  }
`;

export const CurrencyConverter = observer(() => {
  const { exchangeStore, coinStore } = useStore();
  const { from, to } = exchangeStore;

  const handleInputChange = (value: string, targetCurrency: ExchangerCurrencyKeys) => {
    const isValidNumber = /^\d*\.?\d*$/.test(value);
    if (isValidNumber) {
      exchangeStore.setAmount(value, targetCurrency);
    }
  };

  const handleCurrencySelect = (selectedId: number, targetCurrency: ExchangerCurrencyKeys) => {
    exchangeStore.setId(selectedId, targetCurrency);
  };

  const filterCoinOptions = (coin: ICoinOption, searchQuery: string) => {
    const normalizedSearch = searchQuery.toLowerCase();
    return (
      coin.name.toLowerCase().includes(normalizedSearch) ||
      coin.label.toLowerCase().includes(normalizedSearch)
    );
  };

  return (
    <ExchangerWrapper>
      <InputWithSelect
        inputValue={from.amount}
        onInputChange={(value) => handleInputChange(value, 'from')}
        selectValue={from.id}
        onSelectChange={(value) => handleCurrencySelect(value, 'from')}
        disabled={from.status.isLoading}
        options={coinStore.coinsOptions}
        filterFunc={filterCoinOptions}
      />
      <Panel>
        <div>{exchangeStore.rate && <span>Rate: {exchangeStore.rate} </span>}</div>
        <SwapButton
          disabled={exchangeStore.isBusy}
          onClick={() => exchangeStore.startSwap()}
          icon={<SwapOutlined rotate={90} />}
        />
      </Panel>
      <InputWithSelect
        inputValue={to.amount}
        onInputChange={(value) => handleInputChange(value, 'to')}
        selectValue={to.id}
        onSelectChange={(value) => handleCurrencySelect(value, 'to')}
        disabled={to.status.isLoading}
        options={coinStore.coinsOptions}
        filterFunc={filterCoinOptions}
      />
    </ExchangerWrapper>
  );
});
