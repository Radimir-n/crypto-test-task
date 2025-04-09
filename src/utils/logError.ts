export const logError = (message: string, error: unknown) => {
  console.error(`[ExchangeError] ${message}`, error);
};
