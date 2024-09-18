import axios from "axios";
import { CurrencyData, CurrencyPrices } from "@/helpers/types/Currency";
import { API } from "@/helpers/constants/api";

export const fetchPrices = async (): Promise<CurrencyPrices> => {
  const { data } = await axios.get(API.Currency);
  const pricesMap: CurrencyPrices = {};

  data.forEach((currency: CurrencyData) => {
    pricesMap[currency.currency] = currency.price;
  });

  return pricesMap;
};
