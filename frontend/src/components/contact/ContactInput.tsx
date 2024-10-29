// ContactInput.tsx
import { forwardRef, InputHTMLAttributes } from 'react';

interface ContactInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const ContactInput = forwardRef<HTMLInputElement, ContactInputProps>(
  ({ label, ...props }, ref) => (
    <div className="flex flex-col">
      <label className="mb-2 font-semibold dark:text-black">{label}</label>
      <input
        ref={ref}
        className="w-full min-h-10input dark:bg-gray-700 dark:text-white"
        {...props}
      />
    </div>
  ),
);

ContactInput.displayName = 'ContactInput';
export default ContactInput;
