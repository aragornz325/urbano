import { ReactNode } from 'react';
import { ChevronDown, ChevronUp } from 'react-feather';

import DropdownSort from './DropDownSort';

interface TableProps {
  columns: string[];
  children: ReactNode;
  orderBy: string;
  order: 'asc' | 'desc';
  onSort: (field: string, order: 'asc' | 'desc') => void;
}

export default function Table({
  columns,
  children,
  orderBy,
  order,
  onSort,
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
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="dark:text-white">
        <tr>
          <th
            scope="col"
            colSpan={columns.length}
            className="px-3 py-5 text-left"
          >
            <div className="flex gap-2 justify-end items-center">
              <button
                onClick={() => handleSortChange(orderBy)}
                className="focus:outline-none"
              >
                {order === 'asc' ? (
                  <ChevronUp size={16} />
                ) : (
                  <ChevronDown size={16} />
                )}
              </button>
              <div style={{ marginRight: '-20px' }}>
                <DropdownSort
                  options={sortOptions}
                  selected={orderBy}
                  onSelect={handleSortChange}
                />
              </div>
            </div>
          </th>
          <th scope="col" className="relative px-6 py-3">
            <span className="sr-only">Edit</span>
          </th>
        </tr>
        <tr>
          {columns.map((column, index) => (
            <th
              key={index}
              className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
            >
              {column}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-gray-200">{children}</tbody>
    </table>
  );
}
