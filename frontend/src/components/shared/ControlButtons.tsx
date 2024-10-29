import { Plus, RefreshCw } from 'react-feather';

import { AddButton, ReloadButton } from '../../components';

interface ControlButtonsProps {
  onAddClick: () => void;
  onRefreshClick: () => void;
}

export default function ControlButtons({
  onAddClick,
  onRefreshClick,
}: ControlButtonsProps) {
  return (
    <div className="flex flex-col gap-4 justify-center items-center my-5 w-full sm:flex-row">
      <AddButton onClick={onAddClick}>
        <Plus /> Add Course
      </AddButton>
      <ReloadButton onClick={onRefreshClick}>
        <RefreshCw /> Refresh
      </ReloadButton>
    </div>
  );
}
