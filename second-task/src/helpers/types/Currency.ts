export interface CurrencyInputType {
  fromCurrency: string;
  toCurrency: string;
  amount: number;
}

export interface CurrencyData {
  currency: string;
  price: number;
  date: string;
}

export interface CurrencyPrices {
  [key: string]: number;
}
