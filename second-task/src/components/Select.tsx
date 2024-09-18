import { ICONS_URL } from "@/helpers/api/icons";
import { FORM_ENTRIES } from "@/helpers/constants/API";
import { CurrencyInputType, CurrencyPrices } from "@/helpers/types/Currency";
import React, { ChangeEvent, useMemo, useState } from "react";
import {
  FieldError,
  UseFormRegisterReturn,
  UseFormWatch,
} from "react-hook-form";

interface CurrencySelectProps {
  label: string;
  name: FORM_ENTRIES;
  register: UseFormRegisterReturn<string>;
  errors: FieldError | undefined;
  currencies?: CurrencyPrices;
  watch: UseFormWatch<CurrencyInputType>;
}

export const CurrencySelect: React.FC<CurrencySelectProps> = ({
  label,
  name,
  register,
  errors,
  currencies,
  watch,
}) => {
  const [imgError, setImgError] = useState(false);

  const handleImageError = () => {
    setImgError(true);
  };

  const handleImageLoad = () => {
    setImgError(false);
  };

  const onChange = (e: ChangeEvent<HTMLSelectElement>) => {
    register.onChange({ target: e.target });
    setImgError(false);
  };

  const currenciesList = useMemo(() => {
    if (!currencies) return null;
    return Object.keys(currencies).map((currency) => (
      <option key={currency} value={currency}>
        {currency}
      </option>
    ));
  }, [currencies]);

  const selectedCurrency = watch(name);

  return (
    <div className="mb-4">
      <label className="block text-gray-700 mb-1">{label}</label>
      <div className="flex items-center space-x-2 relative">
        <select
          className={`w-full rounded-lg p-2 border ${
            errors ? "border-red-500" : "border-gray-300"
          } focus:outline-none focus:border-blue-500`}
          {...register}
          onChange={onChange}
        >
          <option value="">Select currency</option>
          {currenciesList}
        </select>

        {selectedCurrency && !imgError && (
          <img
            src={`${ICONS_URL}${selectedCurrency}.svg`}
            alt={selectedCurrency}
            className="w-6 h-6 absolute right-6 pointer-events-none"
            onError={handleImageError}
            onLoad={handleImageLoad}
          />
        )}
      </div>
      {errors && <p className="text-red-500 text-sm">{errors.message}</p>}
    </div>
  );
};
