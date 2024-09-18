import React from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface AmountInputProps {
  register: UseFormRegisterReturn<string>;
  errors: FieldError | undefined;
}

export const AmountInput: React.FC<AmountInputProps> = ({
  register,
  errors,
}) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 mb-1">Amount</label>
      <input
        type="number"
        className={`w-full p-2 border focus:border-blue-500 focus:outline-none ${
          errors ? "border-red-500" : "border-gray-300"
        } rounded-lg`}
        {...register}
      />
      {errors && <p className="text-red-500 text-sm">{errors.message}</p>}
    </div>
  );
};
