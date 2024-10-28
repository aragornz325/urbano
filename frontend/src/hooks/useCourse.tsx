import { useCallback, useState } from 'react';
import { useQuery } from 'react-query';

import Course from '../models/course/Course';
import CreateCourseRequest from '../models/course/CreateCourseRequest';
import apiService from '../services/ApiService';
import courseService from '../services/CourseService';

export function useCourses() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(4);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [listCourses, setListCourses] = useState<Course[]>([]);
  const [addCourseShow, setAddCourseShow] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { isLoading, refetch } = useQuery(
    ['courses', name, description, currentPage, perPage],
    () =>
      courseService.findAll({ name, description, page: currentPage, perPage }),
    {
      enabled: false,
      keepPreviousData: true,
      onSuccess: (fetchedData) => {
        setListCourses(fetchedData);
        setHasNextPage(fetchedData.length === perPage);
      },
    },
  );

  const fetchCourses = useCallback(
    (page: number, perPage: number) => {
      setCurrentPage(page);
      setPerPage(perPage);
      refetch();
    },
    [refetch],
  );

  const uploadImage = useCallback(
    async (file: File): Promise<string | null> => {
      const formData = new FormData();
      formData.append('file', file);
      try {
        const response = await apiService.post<{ url: string }>(
          '/api/image',
          formData,
          {
            headers: { 'Content-Type': 'multipart/form-data' },
          },
        );
        return response.data.url;
      } catch (error) {
        setError('Error uploading image');
        return null;
      }
    },
    [],
  );

  const saveCourse = useCallback(
    async (createCourseRequest: CreateCourseRequest) => {
      setError(null);
      if (!selectedImage) {
        setError('Please select an image');
        return;
      }

      const imageUrl = await uploadImage(selectedImage);
      if (!imageUrl) return;

      try {
        await courseService.save({ ...createCourseRequest, imageUrl });
        setAddCourseShow(false);
        resetFields();
        refetch();
      } catch (error) {
        setError(error.response?.data?.message || 'An error occurred');
      }
    },
    [selectedImage, refetch],
  );

  const onImageDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length) {
      const file = acceptedFiles[0];
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  }, []);

  const resetFields = useCallback(() => {
    setSelectedImage(null);
    setPreviewUrl(null);
    setError(null);
  }, []);

  return {
    name,
    setName,
    description,
    setDescription,
    listCourses,
    isLoading,
    currentPage,
    perPage,
    hasNextPage,
    fetchCourses,
    addCourseShow,
    setAddCourseShow,
    saveCourse,
    error,
    setError,
    onImageDrop,
    previewUrl,
    resetFields,
    refetch,
  };
}
