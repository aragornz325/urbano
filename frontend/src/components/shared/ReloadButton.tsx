import { Loader, RefreshCw } from 'react-feather';

interface ReloadButtonProps {
  onClick: () => void;
  isLoading?: boolean;
}

const ReloadButton: React.FC<ReloadButtonProps> = ({ onClick, isLoading }) => (
  <div className="flex flex-col items-center">
    <button
      onClick={onClick}
      className="flex justify-center items-center w-10 h-10 text-white bg-blue-500 rounded-full shadow-md transition-colors hover:bg-blue-600"
    >
      {isLoading ? (
        <Loader className="animate-spin" />
      ) : (
        <RefreshCw size={20} />
      )}
    </button>
    <p className="mt-2 text-sm dark:text-white">Add</p>
  </div>
);

export default ReloadButton;
