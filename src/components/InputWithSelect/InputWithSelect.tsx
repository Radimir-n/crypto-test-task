import { ChangeEvent, useMemo, useState } from 'react';
import { Flex, Input, Select, Spin, Typography } from 'antd';
import { observer } from 'mobx-react-lite';
import { IOption } from '../../types/common.ts';
import styled from 'styled-components';

const { Text } = Typography;

const StyledCurrencySelect = styled(Select)`
  && {
    background-color: #36324a;
    width: 121px;
    border: none;
    color: white;
    border-radius: 0 5px 5px 0;

    .ant-select-selector {
      background-color: #36324a;
      border: none !important;
    }

    .ant-select-arrow {
      color: rgba(255, 255, 255, 0.5);
    }

    .ant-select-selection-placeholder,
    .ant-select-selection-item {
      color: white;
    }
  }
`;

const StyledInput = styled(Input)`
  && {
    background-color: #2b2e44;
    color: white;
    border: none;
    border-radius: 5px 0 0 5px;

    .ant-input {
      background-color: #2b2e44;
      color: white;
      border: none;
      box-shadow: none !important;

      &:focus,
      &:hover {
        border: none;
        box-shadow: none;
      }
    }

    .ant-input-group-addon {
      background-color: transparent;
      border: none;
    }

    .ant-input-affix-wrapper {
      border: none;
      background-color: #2b2e44;

      &:hover,
      &:focus {
        border: none;
        box-shadow: none;
      }
    }
  }
`;

interface InputWithSelectProps<T extends IOption> {
  inputValue: string;
  onInputChange: (value: string) => void;
  selectValue: number | null;
  onSelectChange: (value: number) => void;
  filterFunc: (item: T, searchValue: string) => boolean;
  options: T[];
  disabled: boolean;
  secondaryInfo?: keyof T;
}

export const InputWithSelect = observer(
  <T extends IOption>({
    inputValue,
    onInputChange,
    selectValue,
    onSelectChange,
    filterFunc,
    options,
    disabled,
    secondaryInfo,
  }: InputWithSelectProps<T>) => {
    const [search, setSearch] = useState<string>('');

    const filteredOptions: T[] = useMemo(() => {
      if (!search) return options;
      return options.filter((option) => filterFunc(option, search));
    }, [search, options, filterFunc]);

    const onDropdownVisibleChange = (open: boolean) => {
      if (!open) {
        setSearch('');
      }
    };

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
      onInputChange(event.target.value);
    };

    const renderOption = (option: { data: T }) => {
      const secondaryValue = secondaryInfo ? option.data[secondaryInfo] : null;
      const isValidReactNode =
        typeof secondaryValue === 'string' || typeof secondaryValue === 'number';
      return (
        <Flex vertical justify="space-between">
          <Text>{option.data.label}</Text>
          {isValidReactNode && <Text type="secondary">{secondaryValue}</Text>}
        </Flex>
      );
    };

    const CurrencySelect = (
      <StyledCurrencySelect<string, T>
        value={selectValue}
        options={filteredOptions}
        disabled={disabled}
        showSearch
        filterOption={false}
        onSearch={setSearch}
        onDropdownVisibleChange={onDropdownVisibleChange}
        optionRender={secondaryInfo ? renderOption : undefined}
        onChange={onSelectChange}
      />
    );

    return (
      <StyledInput
        value={disabled ? '' : inputValue}
        addonAfter={CurrencySelect}
        addonBefore={disabled && <Spin size={'small'} />}
        disabled={disabled}
        onChange={handleInputChange}
      />
    );
  },
);
