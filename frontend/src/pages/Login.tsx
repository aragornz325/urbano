import { useState } from 'react';
import { Loader } from 'react-feather';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import { useHistory } from 'react-router-dom';

import useAuth from '../hooks/useAuth';
import LoginRequest from '../models/auth/LoginRequest';
import authService from '../services/AuthService';

export default function Login() {
  const { setAuthenticatedUser } = useAuth();
  const history = useHistory();
  const queryClient = useQueryClient();

  const [error, setError] = useState<string>();
  const [failedAttempts, setFailedAttempts] = useState<number>(0);
  const [isWaiting, setIsWaiting] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginRequest>();

  const { mutate: login } = useMutation(
    async (loginRequest: LoginRequest) => {
      const data = await authService.login(loginRequest);
      setAuthenticatedUser(data.user);
      queryClient.invalidateQueries('currentUser');
      history.push('/');
    },
    {
      onError: (error: any) => {
        setError(error.response?.data?.message || 'Ocurrió un error');
        if (error.response?.status === 401) {
          handleFailedAttempt();
        }
      },
    },
  );

  const onSubmit = async (loginRequest: LoginRequest) => {
    try {
      await login(loginRequest);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFailedAttempt = () => {
    setFailedAttempts((prevAttempts) => prevAttempts + 1);
    if (failedAttempts >= 2) {
      setIsWaiting(true);
      setTimeout(() => {
        setIsWaiting(false);
        setFailedAttempts(0);
      }, 180000);
    }
  };

  return (
    <div className="flex justify-center items-center h-full bg-gray-100 dark:bg-gray-900">
      <div className="p-8 w-full max-w-md bg-white rounded-lg shadow-lg dark:bg-gray-800">
        <h1 className="mb-5 text-3xl font-bold text-center text-gray-800 dark:text-gray-100">
          Login
        </h1>
        <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            className="p-3 text-gray-800 bg-gray-50 rounded border border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-lg"
            placeholder="Username"
            required
            disabled={isSubmitting || isWaiting}
            {...register('username')}
          />
          <input
            type="password"
            className="p-3 text-gray-800 bg-gray-50 rounded border border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-lg"
            placeholder="Password"
            required
            disabled={isSubmitting || isWaiting}
            {...register('password')}
          />
          <button
            className="p-3 w-full font-semibold text-white rounded-lg transition bg-brand-secondary dark:bg-brand-primary hover:bg-brand-primary dark:hover:bg-brand-secondary disabled:opacity-50 disabled:cursor-not-allowed sm:text-lg"
            type="submit"
            disabled={isSubmitting || isWaiting}
          >
            {isSubmitting ? (
              <Loader className="mx-auto animate-spin" />
            ) : (
              'Login'
            )}
          </button>
          {error && (
            <div className="p-3 font-semibold text-red-600 bg-red-100 rounded-lg border border-red-300 dark:bg-red-800 dark:text-red-200 dark:border-red-700">
              {error}
            </div>
          )}
          {isWaiting && (
            <div className="p-3 font-semibold text-yellow-700 bg-yellow-100 rounded-lg border border-yellow-300 dark:bg-yellow-800 dark:text-yellow-200 dark:border-yellow-700">
              Too many failed attempts. Please wait 3 minutes before trying
              again.
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
