import React from 'react';

export const CustomsTh: React.FC<
  React.HTMLAttributes<HTMLTableCellElement> & { label: string }
> = ({ label, ...props }) => {
  return (
    <th
      className="px-6 py-3 text-xs font-bold tracking-wider text-left text-gray-600 uppercase dark:text-gray-300"
      {...props}
    >
      {label}
    </th>
  );
};
