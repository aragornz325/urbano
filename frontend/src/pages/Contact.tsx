// ContactPage.tsx
import { MessageCircle } from 'react-feather';

import { Layout } from '../components';
import { ContactForm, ContactHeader } from '../components/';

const ContactPage: React.FC = () => {
  return (
    <Layout
      title="Contact"
      subtitle="Contact us for any questions or feedback"
      icon={<MessageCircle />}
    >
      <div className="p-6 mx-auto max-w-2xl bg-white rounded-lg shadow-lg dark:bg-gray-800">
        <ContactHeader />
        <ContactForm />
      </div>
    </Layout>
  );
};

export default ContactPage;
