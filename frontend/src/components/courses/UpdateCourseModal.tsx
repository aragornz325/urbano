import { BaseSyntheticEvent, useState } from 'react';
import { Loader, Trash2, X } from 'react-feather';
import { useQuery } from 'react-query';

import { Modal } from '../../components';
import apiService from '../../services/ApiService'; // Asegúrate de que la ruta sea correcta
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
        onImageDelete(); // Notifica al componente padre para actualizar
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

  /**
   * Image upload function
   *
   * @param {File} file - The image file to be uploaded
   * @returns {Promise<string | null>} The URL of the uploaded image or null if it fails
   * @throws {Error} If an error occurs during the upload
   * @async
   */
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

  return (
    <Modal show={show}>
      <div className="flex">
        <h1 className="mb-3 font-semibold">Update Course</h1>
        <button className="ml-auto focus:outline-none" onClick={onClose}>
          <X size={30} />
        </button>
      </div>
      <hr />

      <form className="flex flex-col gap-5 mt-5" onSubmit={handleSubmit}>
        <input
          type="text"
          className="input"
          placeholder={initialName}
          value={name || initialName}
          onChange={(e) => setName(e.target.value)}
          required
          disabled={isSubmitting || uploading}
        />
        <input
          type="text"
          className="input"
          placeholder={initialDescription}
          value={description || initialDescription}
          onChange={(e) => setDescription(e.target.value)}
          required
          disabled={isSubmitting || uploading}
        />

        {previewUrl || initialImageUrl ? (
          <div className="overflow-hidden relative mb-4 w-full h-48 rounded-md border">
            <img
              src={previewUrl || initialImageUrl}
              alt="Preview"
              className="object-cover w-full h-full"
            />
            <button
              type="button"
              className="absolute top-2 right-2 p-1 bg-white rounded-full shadow"
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
          <div className="p-4 rounded-md border-2 border-dashed cursor-pointer focus:outline-none">
            <input
              type="file"
              onChange={handleImageUpload}
              className="w-full h-full"
            />
            <p>Drag and drop an image here, or click to select</p>
          </div>
        )}

        <button className="btn" disabled={isSubmitting || uploading}>
          {uploading || isSubmitting ? (
            <Loader className="mx-auto animate-spin" />
          ) : (
            'Save'
          )}
        </button>
        {error && (
          <div className="p-3 font-semibold text-red-500 bg-red-50 rounded-md border">
            {error}
          </div>
        )}
      </form>
    </Modal>
  );
};

export default UpdateCourseModal;
