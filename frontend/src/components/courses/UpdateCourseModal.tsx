import { BaseSyntheticEvent, useState } from 'react';
import { Loader, Trash2, X } from 'react-feather';

import { Modal } from '../../components';
import { useTheme } from '../../context/ThemeContext';
import apiService from '../../services/ApiService';
import courseService from '../../services/CourseService';

interface UpdateCourseModalProps {
  courseId: string;
  show: boolean;
  onClose: () => void;
  isSubmitting: boolean;
  error: string;
  initialImageUrl: string | null;
  selectedName: string;
  selectedDescription: string;
  onImageDelete: () => void;
  refresh: () => void;
}
const UpdateCourseModal: React.FC<UpdateCourseModalProps> = ({
  courseId,
  show,
  onClose,
  isSubmitting,
  error,
  initialImageUrl,
  selectedName: initialName,
  selectedDescription: initialDescription,
  onImageDelete,
  refresh,
}) => {
  const { darkMode } = useTheme();
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(initialImageUrl);
  const [deleting, setDeleting] = useState<boolean>(false);
  const [uploading, setUploading] = useState<boolean>(false);
  const [name, setName] = useState<string>(initialName);
  const [description, setDescription] = useState<string>(initialDescription);

  const handleDeleteImage = async () => {
    try {
      setDeleting(true);
      if (initialImageUrl) {
        await courseService.deleteImage({ url: initialImageUrl, id: courseId });
        setSelectedImageFile(null);
        setPreviewUrl(null);
        onImageDelete();
      }
    } catch (error) {
      console.error('Error deleting image:', error);
    } finally {
      setDeleting(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setSelectedImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    const formData = new FormData();
    formData.append('file', file);

    setUploading(true);
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
      console.error('Error uploading image:', error);
      return null;
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: BaseSyntheticEvent) => {
    e.preventDefault();
    setUploading(true);

    let imageUrl = initialImageUrl;

    try {
      if (selectedImageFile) {
        const uploadedImageUrl = await uploadImage(selectedImageFile);
        if (uploadedImageUrl) {
          imageUrl = uploadedImageUrl;
        }
      }

      const newCourse = {
        name,
        description,
        imageUrl,
      };

      await courseService.update(courseId, newCourse);
      refresh();
      onClose();
    } catch (error) {
      console.error('Error updating course:', error);
    } finally {
      setUploading(false);
    }
  };

  const containerClass = darkMode
    ? 'bg-gray-800 text-white shadow-xl'
    : 'bg-white text-gray-900 shadow-lg';
  const inputClass = darkMode
    ? 'bg-gray-700 text-white border-gray-600 placeholder-gray-400 focus:border-blue-500'
    : 'bg-gray-100 text-gray-900 border-gray-300 placeholder-gray-500 focus:border-blue-600';
  const buttonClass = darkMode
    ? 'bg-blue-500 hover:bg-blue-400 text-white'
    : 'bg-blue-600 hover:bg-blue-500 text-white';
  const errorClass = 'text-red-500';

  return (
    <Modal show={show}>
      <div className={`p-5 rounded-lg ${containerClass}`}>
        <div className="flex justify-between items-center mb-5">
          <h1 className="text-xl font-semibold">Update Course</h1>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={24} />
          </button>
        </div>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            className={`p-2 rounded-md border ${inputClass}`}
            placeholder="Course Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            disabled={isSubmitting || uploading}
          />
          <textarea
            className={`p-2 rounded-md border resize-none ${inputClass}`}
            placeholder="Course Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            required
            disabled={isSubmitting || uploading}
          ></textarea>

          {previewUrl ? (
            <div className="overflow-hidden relative mb-4 w-full h-48 rounded-md border">
              <img
                src={previewUrl}
                alt="Preview"
                className="object-cover w-full h-full"
              />
              <button
                type="button"
                className="absolute top-2 right-2 p-1 bg-white rounded-full shadow dark:bg-gray-700"
                onClick={handleDeleteImage}
              >
                {deleting ? (
                  <Loader size={20} className="text-red-500 animate-spin" />
                ) : (
                  <Trash2 size={20} className="text-red-500" />
                )}
              </button>
            </div>
          ) : (
            <div className="p-4 rounded-md border-2 border-dashed cursor-pointer focus:outline-none hover:border-blue-400">
              <input
                type="file"
                onChange={handleImageUpload}
                className="w-full h-full cursor-pointer"
              />
              <p className="text-center">
                Drag and drop an image here, or click to select
              </p>
            </div>
          )}

          <button
            className={`p-2 rounded-md ${buttonClass}`}
            disabled={isSubmitting || uploading}
          >
            {uploading || isSubmitting ? (
              <Loader className="mx-auto animate-spin" />
            ) : (
              'Save'
            )}
          </button>

          {error && (
            <div className={`p-3 bg-red-100 rounded-md ${errorClass}`}>
              {error}
            </div>
          )}
        </form>
      </div>
    </Modal>
  );
};

export default UpdateCourseModal;
