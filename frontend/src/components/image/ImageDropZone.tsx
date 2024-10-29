import { useDropzone } from 'react-dropzone';
import { Trash2 } from 'react-feather';

interface ImageDropzoneProps {
  previewUrl: string | null;
  onDrop: (acceptedFiles: File[]) => void;
  onRemove: () => void;
}

export default function ImageDropzone({
  previewUrl,
  onDrop,
  onRemove,
}: ImageDropzoneProps) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpeg', '.png', '.jpg', '.gif'] },
    maxFiles: 1,
  });

  return previewUrl ? (
    <div className="overflow-hidden relative mb-4 w-full h-48 rounded-md border">
      <img
        src={previewUrl}
        alt="Preview"
        className="object-cover w-full h-full"
      />
      <button
        type="button"
        className="absolute top-2 right-2 p-1 bg-white rounded-full shadow"
        onClick={onRemove}
      >
        <Trash2 size={20} className="text-red-500" />
      </button>
    </div>
  ) : (
    <div
      {...getRootProps()}
      className="p-4 rounded-md border-2 border-dashed cursor-pointer focus:outline-none"
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p className="text-center">Drop the image here...</p>
      ) : (
        <p className="text-center dark:text-gray-300">
          Drag and drop an image here, or click to select
        </p>
      )}
    </div>
  );
}
