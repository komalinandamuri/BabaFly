import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import toast from 'react-hot-toast';
import { setUser, setToken, setLoading, setError } from '../redux/slices/authSlice';
import { loginSchema } from '../utils/validationSchemas';
import { authAPI } from '../services/apiEndpoints';
import { Loader } from '../components/UIComponents';
import { Mail, Lock } from 'lucide-react';

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoadingState] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    setIsLoadingState(true);
    try {
      const response = await authAPI.login(data.email, data.password);
      const { token, user } = response.data;
      
      dispatch(setToken(token));
      dispatch(setUser(user));
      
      toast.success('Login successful!');
      navigate('/');
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Login failed';
      toast.error(errorMessage);
      dispatch(setError(errorMessage));
    } finally {
      setIsLoadingState(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary to-gray-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">✨ BabaFly</h1>
          <h2 className="text-2xl font-semibold text-gray-800">Login</h2>
          <p className="text-gray-600 mt-2">Access your premium jewelry account</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Email */}
          <div>
            <label className="form-label flex items-center">
              <Mail size={18} className="mr-2 text-primary" />
              Email Address
            </label>
            <input
              type="email"
              {...register('email')}
              placeholder="Enter your email"
              className="form-input"
            />
            {errors.email && <span className="form-error">{errors.email.message}</span>}
          </div>

          {/* Password */}
          <div>
            <label className="form-label flex items-center">
              <Lock size={18} className="mr-2 text-primary" />
              Password
            </label>
            <input
              type="password"
              {...register('password')}
              placeholder="Enter your password"
              className="form-input"
            />
            {errors.password && <span className="form-error">{errors.password.message}</span>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full btn-primary disabled:opacity-50"
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {/* Links */}
        <div className="mt-6 text-center space-y-2">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <Link to="/register" className="text-primary font-semibold hover:underline">
              Register here
            </Link>
          </p>
          <a href="#" className="text-primary font-semibold hover:underline block">
            Forgot password?
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
