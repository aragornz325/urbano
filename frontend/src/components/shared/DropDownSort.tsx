import { useState } from 'react';
import { ChevronDown } from 'react-feather';

interface DropdownSortProps {
  options: { label: string; value: string }[];
  onSelect: (value: string) => void;
  selected: string;
}

export default function DropdownSort({
  options,
  onSelect,
  selected,
}: DropdownSortProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (value: string) => {
    onSelect(value);
    setIsOpen(false);
  };

  return (
    <div className="inline-block relative text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center px-3 py-2 bg-white rounded border border-gray-300 dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
      >
        <span>
          {options.find((option) => option.value === selected)?.label}
        </span>
        <ChevronDown className="ml-2" size={18} />
      </button>
      {isOpen && (
        <div className="absolute left-0 z-10 mt-2 w-48 bg-white rounded border border-gray-200 shadow-lg dark:bg-gray-800 dark:border-gray-700">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 ${
                selected === option.value ? 'font-bold' : ''
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
