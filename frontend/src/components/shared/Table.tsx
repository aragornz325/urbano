import { ReactNode, useState } from 'react';
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
  const [currentOrder, setCurrentOrder] = useState<'asc' | 'desc'>(order);

  const sortOptions = columns
    .filter((column) => ['Name', 'Description', 'Created'].includes(column))
    .map((column) => ({
      label: column,
      value: column.toLowerCase(),
    }));

  const handleSortChange = (field: string) => {
    onSort(field, currentOrder);
  };

  const toggleOrder = () => {
    const newOrder = currentOrder === 'asc' ? 'desc' : 'asc';
    setCurrentOrder(newOrder);
    onSort(orderBy, newOrder);
  };

  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="dark:text-white">
        <tr>
          <th
            scope="col"
            colSpan={columns.length}
            className="px-6 py-3 text-left"
          >
            <div className="flex gap-2 justify-end items-center">
              {/* Botón para alternar entre ascendente/descendente */}
              <button onClick={toggleOrder} className="focus:outline-none">
                {currentOrder === 'asc' ? (
                  <ChevronUp size={16} />
                ) : (
                  <ChevronDown size={16} />
                )}
              </button>
              {/* DropdownSort para seleccionar columna */}
              <DropdownSort
                options={sortOptions}
                selected={orderBy}
                onSelect={handleSortChange}
              />
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
              className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-white"
            >
              {column}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">{children}</tbody>
    </table>
  );
}
