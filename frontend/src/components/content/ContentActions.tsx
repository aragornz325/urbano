import React from 'react';
import { Plus, RefreshCw } from 'react-feather';

interface ContentActionsProps {
  onAddContentClick: () => void;
  onRefreshClick: () => void;
}

const ContentActions: React.FC<ContentActionsProps> = ({
  onAddContentClick,
  onRefreshClick,
}) => (
  <div className="flex flex-col gap-2 justify-between my-5 sm:flex-row">
    <button
      className="flex gap-2 justify-center w-full btn sm:w-auto"
      onClick={onAddContentClick}
    >
      <Plus /> Add Content
    </button>
    <button
      className="flex gap-2 justify-center w-full btn sm:w-auto"
      onClick={onRefreshClick}
    >
      <RefreshCw /> Refresh
    </button>
  </div>
);

export default ContentActions;
