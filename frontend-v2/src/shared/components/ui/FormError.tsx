export const FormError = ({ message }: { message: string }) => {
  return (
    <p role="alert" className="text-sm text-red-600 mt-1">
      {message}
    </p>
  );
};
