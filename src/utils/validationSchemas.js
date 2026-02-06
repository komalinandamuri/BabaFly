import * as yup from 'yup';

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email('Invalid email address')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

export const registerSchema = yup.object().shape({
  name: yup
    .string()
    .min(3, 'Name must be at least 3 characters')
    .required('Name is required'),
  email: yup
    .string()
    .email('Invalid email address')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
  phone: yup
    .string()
    .matches(/^[0-9]{10}$/, 'Phone must be 10 digits')
    .required('Phone is required'),
});

export const addressSchema = yup.object().shape({
  fullName: yup
    .string()
    .min(3, 'Full name must be at least 3 characters')
    .required('Full name is required'),
  email: yup
    .string()
    .email('Invalid email address')
    .required('Email is required'),
  phone: yup
    .string()
    .matches(/^[0-9]{10}$/, 'Phone must be 10 digits')
    .required('Phone is required'),
  addressLine1: yup
    .string()
    .required('Address line 1 is required'),
  addressLine2: yup.string(),
  city: yup
    .string()
    .required('City is required'),
  state: yup
    .string()
    .required('State is required'),
  pincode: yup
    .string()
    .matches(/^[0-9]{6}$/, 'Pincode must be 6 digits')
    .required('Pincode is required'),
});
