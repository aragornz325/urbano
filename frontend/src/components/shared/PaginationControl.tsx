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
    <div className="flex justify-between items-center mt-5">
      <CustomButton
        onClick={handlePreviousPage}
        disabled={currentPage === 1}
        text="Previous"
      />

      <div className="flex space-x-2">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageSelect(index + 1)}
            disabled={currentPage === index + 1}
            className={`px-2 py-1 ${
              currentPage === index + 1
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200'
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
      />
    </div>
  );
};

export default PaginationControls;
