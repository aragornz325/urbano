// PaginationControls.tsx

import React from 'react';

import { CustomButton } from '../../components';

interface PaginationControlsProps {
  currentPage: number;
  fetchCourses: (page: number, perPage: number) => void;
  perPage: number;
  hasNextPage: boolean;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
  currentPage,
  fetchCourses,
  perPage,
  hasNextPage,
}) => {
  const handleNextPage = () => {
    fetchCourses(currentPage + 1, perPage);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      fetchCourses(currentPage - 1, perPage);
    }
  };

  return (
    <div className="flex justify-between mt-5">
      <CustomButton
        onClick={handlePreviousPage}
        disabled={currentPage === 1}
        text="Previous"
      />
      <span>Page {currentPage}</span>
      <CustomButton
        onClick={handleNextPage}
        disabled={!hasNextPage}
        text="Next"
      />
    </div>
  );
};

export default PaginationControls;
