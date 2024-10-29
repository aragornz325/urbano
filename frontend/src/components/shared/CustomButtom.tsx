import { ReactNode } from 'react';

interface CustomButtonProps {
  text: string;
  onClick: () => void;
  icon?: ReactNode;
  color?: string;
  disabled?: boolean;
  className?: string; // Nueva prop para clases adicionales
}

const CustomButton: React.FC<CustomButtonProps> = ({
  text,
  onClick,
  icon,
  color = 'bg-brand-primary',
  disabled = false,
  className = '', // Valor predeterminado para evitar errores
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center justify-center gap-2 px-4 py-2 min-w-[100px] font-semibold text-white rounded-md shadow transition-colors duration-200 focus:outline-none ${color} ${
        disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-600'
      } ${className}`}
    >
      {icon && <span className="text-lg">{icon}</span>}
      <span className="text-sm">{text}</span>
    </button>
  );
};

export default CustomButton;
