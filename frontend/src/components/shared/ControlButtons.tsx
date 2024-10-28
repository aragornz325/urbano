import { Plus, RefreshCw } from 'react-feather';

interface ControlButtonsProps {
  onAddClick: () => void;
  onRefreshClick: () => void;
}

export default function ControlButtons({
  onAddClick,
  onRefreshClick,
}: ControlButtonsProps) {
  return (
    <div className="flex flex-col gap-2 justify-between my-5 sm:flex-row">
      <button
        className="flex gap-2 justify-center w-full btn sm:w-auto"
        onClick={onAddClick}
      >
        <Plus /> Add Course
      </button>
      <button
        className="flex gap-2 justify-center w-full btn sm:w-auto"
        onClick={onRefreshClick}
      >
        <RefreshCw /> Refresh
      </button>
    </div>
  );
}
