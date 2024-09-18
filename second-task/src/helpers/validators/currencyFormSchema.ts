import * as Yup from "yup";

export const currencyFormSchema = Yup.object().shape({
  fromCurrency: Yup.string().required("Please select a currency to swap from"),
  toCurrency: Yup.string()
    .required("Please select a currency to swap to")
    .notOneOf([Yup.ref("fromCurrency")], "Currencies must be different"),
  amount: Yup.number()
    .typeError("Amount must be a number")
    .positive("Amount must be greater than zero")
    .required("Please enter an amount"),
});
