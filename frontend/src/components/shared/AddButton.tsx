import { Plus } from 'react-feather';

interface AddButtonProps {
  onClick: () => void;
}

const AddButton: React.FC<AddButtonProps> = ({ onClick }) => (
  <div className="flex flex-col items-center">
    <button
      onClick={onClick}
      className="flex justify-center items-center w-10 h-10 text-white rounded-full shadow-md transition-colors bg-brand-primary_text hover:bg-brand-secondary"
    >
      <Plus size={20} />
    </button>
    <p className="mt-2 text-sm dark:text-white">Add</p>
  </div>
);

export default AddButton;
