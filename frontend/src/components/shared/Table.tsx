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
  const sortOptions = columns.map((column) => ({
    label: column,
    value: column.toLowerCase(),
  }));

  const handleSortChange = (field: string) => {
    const newOrder =
      field === orderBy ? (order === 'asc' ? 'desc' : 'asc') : 'asc';
    onSort(field, newOrder);
  };

  const handleDropdownSortChange = (value: string) => {
    const selectedOrder = value.includes('asc') ? 'asc' : 'desc';
    const selectedField = value.replace(/_(asc|desc)$/, '');
    onSort(selectedField, selectedOrder as 'asc' | 'desc');
  };

  return (
    <div className="w-full">
      <div className="mb-4">
        <DropdownSort
          options={sortOptions
            .map((option) => ({
              label: `${option.label} Asc`,
              value: `${option.value}_asc`,
            }))
            .concat(
              sortOptions.map((option) => ({
                label: `${option.label} Desc`,
                value: `${option.value}_desc`,
              })),
            )}
          onChange={(value) => handleDropdownSortChange(value)}
          selected={
            orderBy ? `${orderBy}_${order}` : `${sortOptions[0].value}_asc`
          }
        />
      </div>

      <table className="w-full" {...props}>
        <thead className="bg-gray-100 dark:bg-gray-800">
          <tr>
            {columns.map((column, index) => (
              <CustomsTh key={index} label={column}>
                <div className="flex gap-1 items-center">
                  <span>{column}</span>
                  <button
                    onClick={() => handleSortChange(column.toLowerCase())}
                    className="focus:outline-none"
                  >
                    {order === 'asc' && orderBy === column.toLowerCase() ? (
                      <ChevronUp size={16} />
                    ) : (
                      <ChevronDown size={16} />
                    )}
                  </button>
                </div>
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
