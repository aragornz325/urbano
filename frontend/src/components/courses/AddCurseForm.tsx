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
      className="flex flex-col gap-5 mt-5"
      onSubmit={handleSubmit(onSubmit)}
    >
      <input
        type="text"
        className="input"
        placeholder="Name"
        disabled={isSubmitting}
        required
        {...register('name')}
      />
      <input
        type="text"
        className="input"
        placeholder="Description"
        disabled={isSubmitting}
        required
        {...register('description')}
      />

      <ImageDropzone
        previewUrl={previewUrl}
        onDrop={onImageDrop}
        onRemove={onImageRemove}
      />

      <button className="btn" disabled={isSubmitting}>
        {isSubmitting ? <Loader className="mx-auto animate-spin" /> : 'Save'}
      </button>
      {error && (
        <div className="p-3 font-semibold text-red-500 bg-red-50 rounded-md border dark:bg-red-800 dark:text-red-200">
          {error}
        </div>
      )}
    </form>
  );
}
