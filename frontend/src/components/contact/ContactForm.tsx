// ContactForm.tsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, useLocation } from 'react-router';

import ContactService from '../../services/ContactService';
import { ContactButton, ContactInput, ContactTextarea } from '../index';

interface ContactFormValues {
  name: string;
  email: string;
  message: string;
}

const ContactForm: React.FC = () => {
  const { register, handleSubmit, reset, formState } =
    useForm<ContactFormValues>();
  const history = useHistory();

  const onSubmit = async (data: ContactFormValues) => {
    try {
      await ContactService.createContact(data);
      reset();
      history.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      className="flex flex-col gap-1 bg-brand-header_background dark:bg-brand-header_background"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-2 p-2">
        <ContactInput
          label="Name"
          placeholder="Your Name"
          {...register('name', { required: true })}
        />
        <ContactInput
          label="Email"
          type="email"
          placeholder="Your Email"
          {...register('email', { required: true })}
        />
        <ContactTextarea
          label="Message"
          placeholder="Your Message"
          {...register('message', { required: true })}
        />
        <ContactButton isSubmitting={formState.isSubmitting} />
      </div>
    </form>
  );
};

export default ContactForm;
