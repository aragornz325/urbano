import { useCallback, useEffect, useState } from 'react';
import { BookOpen, Loader, X } from 'react-feather';
import { useQuery } from 'react-query';

import { Layout, Modal } from '../components';
import { CoursesTable } from '../components';
import { AddCourseForm, ControlButtons } from '../components';
import useAuth from '../hooks/useAuth';
import { useCourses } from '../hooks/useCourse';
import Course from '../models/course/Course';
import CreateCourseRequest from '../models/course/CreateCourseRequest';
import apiService from '../services/ApiService';
import courseService from '../services/CourseService';

export default function Courses() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [addCourseShow, setAddCourseShow] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(4);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [tableKey, setTableKey] = useState(0);
  const { authenticatedUser } = useAuth();
  const [listCourses, setListCourses] = useState<Course[]>([]);

  const { data, isLoading, refetch } = useQuery(
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
      setTableKey((prevKey) => prevKey + 1);
    },
    [refetch],
  );

  useEffect(() => {
    refetch().then((result) => {
      setListCourses(result.data || []);
    });
  }, [currentPage, refetch]);

  const uploadImage = async (file: File): Promise<string | null> => {
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
  };

  const saveCourse = async (createCourseRequest: CreateCourseRequest) => {
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
  };

  const onImageDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length) {
      const file = acceptedFiles[0];
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  }, []);

  const resetFields = () => {
    setSelectedImage(null);
    setPreviewUrl(null);
    setError(null);
  };

  return (
    <Layout title="Courses" subtitle="Manage courses" icon={<BookOpen />}>
      {authenticatedUser.role !== 'user' && (
        <ControlButtons
          onAddClick={() => setAddCourseShow(true)}
          onRefreshClick={refetch}
        />
      )}

      <div className="mb-5 table-filter">
        <input
          type="text"
          className="input"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          className="input"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      {listCourses && listCourses.length > 0 ? (
        <CoursesTable
          key={`${currentPage}-${Date.now()}`}
          data={listCourses}
          isLoading={isLoading}
          perPage={perPage}
          hasNextPage={hasNextPage}
          fetchCourses={fetchCourses}
          currentPage={currentPage}
          refetch={refetch}
        />
      ) : (
        <tr>
          <td colSpan={5}>
            <Loader className="mx-auto animate-spin" />
          </td>
        </tr>
      )}

      <Modal show={addCourseShow}>
        <div className="flex">
          <h1 className="mb-3 font-semibold">Add Course</h1>
          <button
            className="ml-auto focus:outline-none"
            onClick={() => {
              setAddCourseShow(false);
              resetFields();
            }}
          >
            <X size={30} />
          </button>
        </div>
        <hr />
        <AddCourseForm
          onSubmit={saveCourse}
          isSubmitting={isLoading}
          error={error}
          onImageDrop={onImageDrop}
          onImageRemove={resetFields}
          previewUrl={previewUrl}
        />
      </Modal>
    </Layout>
  );
}
