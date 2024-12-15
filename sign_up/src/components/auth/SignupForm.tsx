import React, { useState } from 'react';
import { Mail, Facebook } from 'lucide-react';
import { validateForm, ValidationErrors } from '../../utils/validation';
import FormInput from './FormInput';
import PasswordInput from './PasswordInput';
import { useNavigate } from 'react-router-dom';

const SignupForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [termsError, setTermsError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const validationErrors = validateForm(formData);
    
    if (!agreedToTerms) {
      setTermsError('You must agree to the Terms of Service to continue');
      setIsSubmitting(false);
      return;
    }
    setTermsError('');

    if (Object.keys(validationErrors).length === 0 && agreedToTerms) {
      // Handle successful form submission
      console.log('Form submitted:', formData);
    } else {
      setErrors(validationErrors);
    }
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof ValidationErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <div className="w-full max-w-md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-4">
          <FormInput
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            error={errors.firstName}
          />
          <FormInput
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            error={errors.lastName}
          />
        </div>
        <FormInput
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          icon={Mail}
        />
        <PasswordInput
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
        />
        <PasswordInput
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
        />
        
        <div className="flex items-start space-x-2">
          <input
            type="checkbox"
            id="terms"
            checked={agreedToTerms}
            onChange={(e) => {
              setAgreedToTerms(e.target.checked);
              if (e.target.checked) setTermsError('');
            }}
            className="mt-1 h-4 w-4 rounded border-gray-300 text-red-500 focus:ring-red-500"
            required
          />
          <label htmlFor="terms" className="text-sm text-gray-600">
            I agree to the{' '}
            <button
              type="button"
              onClick={() => navigate('/terms')}
              className="text-red-500 hover:text-red-600 underline"
            >
              Terms of Service
            </button>
          </label>
        </div>
        {termsError && (
          <p className="text-sm text-red-500 font-medium">{termsError}</p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors ${
            isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        >
          {isSubmitting ? 'Signing Up...' : 'Sign Up'}
        </button>
        <button
          type="button"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
        >
          <Facebook size={20} />
          Continue with Facebook
        </button>
      </form>
    </div>
  );
};

export default SignupForm;