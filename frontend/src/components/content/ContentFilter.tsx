import React from 'react';

interface ContentFilterProps {
  name: string;
  description: string;
  onNameChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
}

const ContentFilter: React.FC<ContentFilterProps> = ({
  name,
  description,
  onNameChange,
  onDescriptionChange,
}) => (
  <div className="table-filter">
    <div className="flex flex-row gap-5">
      <input
        type="text"
        className="w-1/2 input"
        placeholder="Name"
        value={name}
        onChange={(e) => onNameChange(e.target.value)}
      />
      <input
        type="text"
        className="w-1/2 input"
        placeholder="Description"
        value={description}
        onChange={(e) => onDescriptionChange(e.target.value)}
      />
    </div>
  </div>
);

export default ContentFilter;
