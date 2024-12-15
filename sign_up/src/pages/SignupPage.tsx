import React from 'react';
import SignupForm from '../components/auth/SignupForm';
import Header from '../components/layout/Header';

const SignupPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col items-center">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Sign Up for Rateit</h1>
            <p className="text-gray-600">Connect with great local businesses</p>
          </div>
          <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-sm">
            <SignupForm />
            <div className="mt-6 text-center text-sm text-gray-600">
              Already on Rateit?{' '}
              <a href="#" className="text-red-500 hover:text-red-600">
                Log in
              </a>
            </div>
          </div>
          <div className="mt-8 text-center text-xs text-gray-500">
            By continuing, you agree to Rateit's{' '}
            <a href="#" className="text-red-500 hover:text-red-600">
              Terms of Service
            </a>{' '}
            and acknowledge Rateit's{' '}
            <a href="#" className="text-red-500 hover:text-red-600">
              Privacy Policy
            </a>
            .
          </div>
        </div>
      </main>
    </div>
  );
};

export default SignupPage;