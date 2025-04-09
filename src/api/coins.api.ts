import { apiClient } from './apiClient.ts';
import { ICoin } from '../types/coins.ts';
import { IConversionRequest, IConversionResponse } from '../types/conversion.ts';

export const getCoins = async (): Promise<ICoin[]> => {
  const response = await apiClient.get<ICoin[]>('/coins');
  return response.data;
};

export const getConversion = async (params: IConversionRequest): Promise<IConversionResponse> => {
  const response = await apiClient.get<IConversionResponse>('/conversion', { params });
  return response.data;
};
