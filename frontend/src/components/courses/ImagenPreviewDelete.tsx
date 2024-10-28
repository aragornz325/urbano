// ImagePreviewWithDelete.tsx
import { Trash2 } from 'react-feather';

interface ImagePreviewWithDeleteProps {
  imageUrl: string;
  onDelete: () => void;
}

const ImagePreviewWithDelete: React.FC<ImagePreviewWithDeleteProps> = ({
  imageUrl,
  onDelete,
}) => {
  return (
    <div className="overflow-hidden relative mb-4 w-full h-48 rounded-md border">
      <img
        src={imageUrl}
        alt="Current coso"
        className="object-cover w-full h-full"
      />
      <button
        type="button"
        className="absolute top-2 right-2 p-1 bg-white rounded-full shadow"
        onClick={onDelete}
      >
        <Trash2 size={20} className="text-red-500" />
      </button>
    </div>
  );
};

export default ImagePreviewWithDelete;
