// ContactTextarea.tsx
import { forwardRef, TextareaHTMLAttributes } from 'react';

interface ContactTextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

const ContactTextarea = forwardRef<HTMLTextAreaElement, ContactTextareaProps>(
  ({ label, ...props }, ref) => (
    <div className="flex flex-col">
      <label className="mb-2 font-semibold dark:text-white">{label}</label>
      <textarea
        ref={ref}
        className="w-full input dark:bg-gray-700 dark:text-white"
        rows={5}
        {...props}
      />
    </div>
  ),
);

ContactTextarea.displayName = 'ContactTextarea';
export default ContactTextarea;
