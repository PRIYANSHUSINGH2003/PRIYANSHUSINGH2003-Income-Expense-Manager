import React from 'react';
import SignInGlassForm from './SignInGlassForm';

export default function SignInGlassDemo() {
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        background:
          'linear-gradient(120deg, #e0e7ff 0%, #f0fdf4 50%, #f9fafb 100%)',
        /* fallback for dark mode, will be overridden by Tailwind dark class */
      }}
    >
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-200 via-fuchsia-100 to-emerald-100 dark:from-[#181c24] dark:via-[#232336] dark:to-[#1F2937] transition-all duration-700" />
      <SignInGlassForm />
    </div>
  );
}
