import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import toast from 'react-hot-toast';
import { registerSchema } from '../utils/validationSchemas';
import { authAPI } from '../services/apiEndpoints';
import { User, Mail, Lock, Phone } from 'lucide-react';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      await authAPI.register({
        name: data.name,
        email: data.email,
        password: data.password,
        phone: data.phone,
      });

      toast.success('Registration successful! Please login.');
      navigate('/login');
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Registration failed';
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary to-gray-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">✨ BabaFly</h1>
          <h2 className="text-2xl font-semibold text-gray-800">Create Account</h2>
          <p className="text-gray-600 mt-2">Join us for premium jewelry</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Name */}
          <div>
            <label className="form-label flex items-center">
              <User size={18} className="mr-2 text-primary" />
              Full Name
            </label>
            <input
              type="text"
              {...register('name')}
              placeholder="Enter your name"
              className="form-input"
            />
            {errors.name && <span className="form-error">{errors.name.message}</span>}
          </div>

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

          {/* Phone */}
          <div>
            <label className="form-label flex items-center">
              <Phone size={18} className="mr-2 text-primary" />
              Phone Number
            </label>
            <input
              type="tel"
              {...register('phone')}
              placeholder="Enter 10-digit phone number"
              className="form-input"
            />
            {errors.phone && <span className="form-error">{errors.phone.message}</span>}
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
              placeholder="Enter password"
              className="form-input"
            />
            {errors.password && <span className="form-error">{errors.password.message}</span>}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="form-label flex items-center">
              <Lock size={18} className="mr-2 text-primary" />
              Confirm Password
            </label>
            <input
              type="password"
              {...register('confirmPassword')}
              placeholder="Confirm password"
              className="form-input"
            />
            {errors.confirmPassword && (
              <span className="form-error">{errors.confirmPassword.message}</span>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full btn-primary disabled:opacity-50"
          >
            {isLoading ? 'Creating Account...' : 'Register'}
          </button>
        </form>

        {/* Links */}
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-primary font-semibold hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
