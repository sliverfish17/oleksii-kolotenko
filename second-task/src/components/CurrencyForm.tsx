import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQuery } from "react-query";
import { fetchPrices } from "@/helpers/api/currency";
import { currencyFormSchema } from "@/helpers/validators/currencyFormSchema";
import { CurrencySelect } from "@/components/Select";
import { AmountInput } from "@/components/Input";
import { SubmitButton } from "@/components/Submit";
import { CurrencyInputType } from "@/helpers/types/Currency";
import { FORM_ENTRIES } from "@/helpers/constants/API";

export const CurrencyForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CurrencyInputType>({
    resolver: yupResolver(currencyFormSchema),
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [conversionResult, setConversionResult] = useState<number | null>(null);

  const {
    data: currencyPrices,
    isLoading,
    error,
  } = useQuery("prices", fetchPrices);

  const onSubmit: SubmitHandler<CurrencyInputType> = (data) => {
    if (!currencyPrices) return;
    setIsSubmitting(true);

    const fromRate = currencyPrices[data.fromCurrency];
    const toRate = currencyPrices[data.toCurrency];

    if (!fromRate || !toRate) {
      setIsSubmitting(false);
      return;
    }

    const convertedAmount = (data.amount * fromRate) / toRate;

    setConversionResult(convertedAmount);
    setIsSubmitting(false);
  };

  if (isLoading) {
    return <div>Loading token prices...</div>;
  }

  if (error) {
    return <div>Error loading token prices. Please try again later.</div>;
  }

  return (
    <div className="max-w-lg mx-auto p-8 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Currency Swap Form
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CurrencySelect
          label="From"
          name={FORM_ENTRIES.From}
          register={register("fromCurrency")}
          errors={errors.fromCurrency}
          currencies={currencyPrices}
          watch={watch}
        />

        <CurrencySelect
          label="To"
          name={FORM_ENTRIES.To}
          register={register("toCurrency")}
          errors={errors.toCurrency}
          currencies={currencyPrices}
          watch={watch}
        />

        <AmountInput register={register("amount")} errors={errors.amount} />

        <SubmitButton isSubmitting={isSubmitting} />
      </form>
      {conversionResult && (
        <div className="mt-6 bg-gray-100 p-2 rounded-lg">
          <h3 className="text-lg font-semibold">Swap Details</h3>
          <p>Result: {conversionResult.toFixed(2)}</p>
        </div>
      )}
    </div>
  );
};
