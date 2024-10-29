import { useState } from 'react';
import { ChevronDown } from 'react-feather';

interface DropdownSortProps {
  options: { label: string; value: string }[];
  onChange: (value: string) => void;
  selected: string;
}

export default function DropdownSort({
  options,
  onChange,
  selected,
}: DropdownSortProps) {
  const [isOpen, setIsOpen] = useState(false);

  const sortedOptions = options.sort((a, b) => a.label.localeCompare(b.label));

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleSelect = (value: string) => {
    onChange(value);
    setIsOpen(false);
  };

  return (
    <div className="inline-block relative text-left">
      <button
        onClick={toggleDropdown}
        className="flex items-center px-3 py-2 bg-white rounded border border-gray-300 dark:bg-gray-800 dark:border-brand-secondary hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-primary_text"
      >
        <span className="text-sm dark:text-white">
          {sortedOptions.find((option) => option.value === selected)?.label ||
            'Select'}
        </span>
        <ChevronDown className="ml-2 dark:text-gray-400" size={18} />
      </button>
      {isOpen && (
        <div className="absolute left-0 z-10 mt-2 w-48 bg-white rounded border border-gray-200 shadow-lg dark:text-gray-400 dark:bg-gray-800 dark:border-gray-700">
          {sortedOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className={` hover:translate-x-0block w-full text-left px-4 py-2 text-sm m-1 hover:bg-gray-500 dark:hover:bg-gray-100 ${
                selected === option.value ? 'font-semibold' : ''
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
