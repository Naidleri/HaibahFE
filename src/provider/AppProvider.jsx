import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import AuthProvider from './AuthProvider';

function ErrorFallback({ error }) {
  return (
    <div className="p-4 bg-red-100 text-red-700">
      <h2>Terjadi Kesalahan:</h2>
      <pre>{error?.message || 'Unknown error'}</pre>
    </div>
  );
}

export const AppProvider = ({ children }) => (
  <ErrorBoundary FallbackComponent={ErrorFallback}>
    <AuthProvider>
      {children}
    </AuthProvider>
  </ErrorBoundary>
);