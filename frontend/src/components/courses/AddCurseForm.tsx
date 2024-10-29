import { Loader } from 'react-feather';
import { useForm } from 'react-hook-form';

import CreateCourseRequest from '../../models/course/CreateCourseRequest';
import { ImageDropzone } from '../';

interface AddCourseFormProps {
  onSubmit: (data: CreateCourseRequest) => Promise<void>;
  isSubmitting: boolean;
  error: string | null;
  onImageDrop: (acceptedFiles: File[]) => void;
  onImageRemove: () => void;
  previewUrl: string | null;
}

export default function AddCourseForm({
  onSubmit,
  isSubmitting,
  error,
  onImageDrop,
  onImageRemove,
  previewUrl,
}: AddCourseFormProps) {
  const { register, handleSubmit, reset } = useForm<CreateCourseRequest>();

  return (
    <form
      className="flex flex-col gap-6 p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Crear Nuevo Curso
      </h2>

      <input
        type="text"
        className="input bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
        placeholder="Nombre del curso"
        disabled={isSubmitting}
        required
        {...register('name')}
      />

      <textarea
        className="input bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
        placeholder="Descripción"
        disabled={isSubmitting}
        required
        {...register('description')}
        rows={3}
      />

      <ImageDropzone
        previewUrl={previewUrl}
        onDrop={onImageDrop}
        onRemove={onImageRemove}
      />

      <button
        className={`btn flex items-center justify-center p-3 rounded-lg text-white font-semibold ${
          isSubmitting
            ? 'bg-gray-400'
            : 'bg-brand-primary hover:bg-brand-secondary'
        }`}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <Loader className="text-white animate-spin" />
        ) : (
          'Guardar'
        )}
      </button>

      {error && (
        <div className="p-3 mt-3 font-semibold text-red-500 bg-red-50 rounded-md border border-red-300 dark:bg-red-800 dark:text-red-200">
          {error}
        </div>
      )}
    </form>
  );
}
