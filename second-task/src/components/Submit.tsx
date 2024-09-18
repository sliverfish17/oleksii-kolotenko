interface SubmitButtonProps {
  isSubmitting: boolean;
}

export const SubmitButton = ({ isSubmitting }: SubmitButtonProps) => {
  return (
    <button
      type="submit"
      className="w-full p-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors"
      disabled={isSubmitting}
    >
      {isSubmitting ? "Swapping..." : "Swap"}
    </button>
  );
};
