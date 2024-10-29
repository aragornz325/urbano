import { ReactNode } from 'react';
import { ChevronDown, ChevronUp } from 'react-feather';

import { CustomsTh } from '../users/CustomsTh';
import DropdownSort from './DropDownSort';

interface TableProps {
  columns: string[];
  children: ReactNode;
  orderBy: string;
  order: 'asc' | 'desc';
  onSort: (field: string, order: 'asc' | 'desc') => void;
  props?: React.ComponentProps<'table'>;
}

export default function Table({
  columns,
  children,
  orderBy,
  order,
  onSort,
  props,
}: TableProps) {
  const sortOptions = columns
    .filter((column) => ['Name', 'Description', 'Created'].includes(column))
    .map((column) => ({
      label: column,
      value: column.toLowerCase(),
    }));

  const handleSortChange = (field: string) => {
    const newOrder =
      field === orderBy ? (order === 'asc' ? 'desc' : 'asc') : 'asc';
    onSort(field, newOrder);
  };

  return (
    <div className="w-full">
      <table className="w-full" {...props}>
        <thead className="bg-gray-100 dark:bg-gray-800">
          <tr>
            {columns.map((column, index) => (
              <CustomsTh key={index} label={column}>
                {column === orderBy ? (
                  <div className="flex gap-1 items-center">
                    <span>{column}</span>
                    <button
                      onClick={() => handleSortChange(column.toLowerCase())}
                      className="focus:outline-none"
                    >
                      {order === 'asc' ? (
                        <ChevronUp size={16} />
                      ) : (
                        <ChevronDown size={16} />
                      )}
                    </button>
                  </div>
                ) : (
                  column
                )}
              </CustomsTh>
            ))}
            <CustomsTh label="Actions" className="text-center w-[120px]" />
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {children}
        </tbody>
      </table>
    </div>
  );
}
