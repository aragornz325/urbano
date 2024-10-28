import { Loader } from 'react-feather';
import { UseFormHandleSubmit, UseFormRegister } from 'react-hook-form';

import UpdateUserRequest from '../../models/user/UpdateUserRequest';

interface UpdateProfileFormProps {
  data: any;
  register: UseFormRegister<UpdateUserRequest>;
  handleSubmit: UseFormHandleSubmit<UpdateUserRequest>;
  handleUpdateUser: (data: UpdateUserRequest) => void;
  isSubmitting: boolean;
}

const UpdateProfileForm: React.FC<UpdateProfileFormProps> = ({
  data,
  register,
  handleSubmit,
  handleUpdateUser,
  isSubmitting,
}) => (
  <form
    className="flex flex-col gap-5 justify-center items-center mx-auto mt-3 md:w-1/2 lg:w-1/3"
    onSubmit={handleSubmit(handleUpdateUser)}
  >
    <div className="flex gap-3 w-full">
      <div className="w-1/2">
        <label className="block mb-2 font-semibold">First Name</label>
        <input
          type="text"
          className="w-full input"
          defaultValue={data.firstName}
          disabled={isSubmitting}
          {...register('firstName')}
        />
      </div>
      <div className="w-1/2">
        <label className="block mb-2 font-semibold">Last Name</label>
        <input
          type="text"
          className="w-full input"
          defaultValue={data.lastName}
          disabled={isSubmitting}
          {...register('lastName')}
        />
      </div>
    </div>
    <div className="w-full">
      <label className="block mb-2 font-semibold">Username</label>
      <input
        type="text"
        className="w-full input"
        defaultValue={data.username}
        disabled={isSubmitting}
        {...register('username')}
      />
    </div>
    <div className="w-full">
      <label className="block mb-2 font-semibold">Password</label>
      <input
        type="password"
        className="w-full input"
        placeholder="Password (min 6 characters)"
        disabled={isSubmitting}
        {...register('password')}
      />
    </div>
    <button className="w-full btn" disabled={isSubmitting}>
      {isSubmitting ? <Loader className="mx-auto animate-spin" /> : 'Update'}
    </button>
  </form>
);

export default UpdateProfileForm;
