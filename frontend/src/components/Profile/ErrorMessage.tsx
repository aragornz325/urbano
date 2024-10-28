interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => (
  <div className="p-3 font-semibold text-red-500 bg-red-50 rounded-md border dark:bg-red-800 dark:text-red-200">
    {message}
  </div>
);

export default ErrorMessage;
