import React from 'react';
import Header from '../components/layout/Header';
import { useNavigate } from 'react-router-dom';

const TermsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white p-8 rounded-lg shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Terms of Service</h1>
            <button
              onClick={() => navigate(-1)}
              className="text-red-500 hover:text-red-600"
            >
              Back to Sign Up
            </button>
          </div>
          
          <div className="prose max-w-none">
            <h2 className="text-xl font-semibold mb-4">1. Acceptance of Terms</h2>
            <p className="mb-4">
              By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.
            </p>

            <h2 className="text-xl font-semibold mb-4">2. User Account</h2>
            <p className="mb-4">
              To use certain features of the website, you must register for an account. You agree to provide accurate, current, and complete information during the registration process.
            </p>

            <h2 className="text-xl font-semibold mb-4">3. Privacy Policy</h2>
            <p className="mb-4">
              Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your personal information.
            </p>

            <h2 className="text-xl font-semibold mb-4">4. User Content</h2>
            <p className="mb-4">
              You retain all rights to any content you submit, post, or display on or through the website. By submitting content, you grant us a worldwide, non-exclusive, royalty-free license to use, copy, reproduce, process, adapt, modify, publish, transmit, display, and distribute such content.
            </p>

            <h2 className="text-xl font-semibold mb-4">5. Prohibited Activities</h2>
            <p className="mb-4">
              You agree not to engage in any of the following prohibited activities:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Violating laws or regulations</li>
              <li>Posting unauthorized commercial communications</li>
              <li>Engaging in unauthorized framing of the website</li>
              <li>Interfering with the proper working of the website</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TermsPage;