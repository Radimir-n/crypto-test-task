export interface IConversionRequest {
  from: number;
  to: number;
  fromAmount?: number;
  toAmount?: number;
}

export interface IConversionResponse {
  rate: number;
  estimatedAmount: number;
}
