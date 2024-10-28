// ContactButton.tsx
import { Loader } from 'react-feather';

interface ContactButtonProps {
  isSubmitting: boolean;
}

const ContactButton: React.FC<ContactButtonProps> = ({ isSubmitting }) => (
  <button className="w-full btn" type="submit" disabled={isSubmitting}>
    {isSubmitting ? (
      <Loader className="mx-auto animate-spin" />
    ) : (
      'Send Message'
    )}
  </button>
);

export default ContactButton;
