import React from 'react';

import { CustomButton } from '../../components';

interface PaginationControlsProps {
  currentPage: number;
  fetchCourses: (page: number, perPage: number) => void;
  perPage: number;
  hasNextPage: boolean;
  totalItems: number;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
  currentPage,
  fetchCourses,
  perPage,
  hasNextPage,
  totalItems,
}) => {
  const totalPages = Math.ceil(totalItems / perPage);

  const handlePageSelect = (page: number) => {
    fetchCourses(page, perPage);
  };

  const handleNextPage = () => {
    if (hasNextPage) {
      fetchCourses(currentPage + 1, perPage);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      fetchCourses(currentPage - 1, perPage);
    }
  };

  return (
    <div className="flex justify-between items-center mt-5 w-full">
      <CustomButton
        onClick={handlePreviousPage}
        disabled={currentPage === 1}
        text="Previous"
        className={`px-4 py-2 rounded-md ${
          currentPage === 1
            ? 'bg-gray-300 cursor-not-allowed'
            : 'bg-brand-secondary hover:bg-brand-primary text-white'
        }`}
      />

      <div className="flex space-x-2">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageSelect(index + 1)}
            disabled={currentPage === index + 1}
            className={`px-3 py-1 rounded-full transition-colors ${
              currentPage === index + 1
                ? 'bg-brand-primary text-white'
                : 'bg-gray-200 hover:bg-brand-secondary hover:text-white'
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>

      <CustomButton
        onClick={handleNextPage}
        disabled={!hasNextPage}
        text="Next"
        className={`px-4 py-2 rounded-md ${
          !hasNextPage
            ? 'bg-gray-300 cursor-not-allowed'
            : 'text-white bg-brand-secondary hover:bg-brand-primary'
        }`}
      />
    </div>
  );
};

export default PaginationControls;
