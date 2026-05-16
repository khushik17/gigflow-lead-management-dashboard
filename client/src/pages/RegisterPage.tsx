import React, { useEffect } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { RegisterForm } from '../components/auth/RegisterForm';

export const RegisterPage: React.FC = () => {
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    document.documentElement.classList.remove('dark');
  }, []);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50 bg-gradient-to-br from-blue-50 via-purple-50/50 to-rose-50/30 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-blue-200/40 rounded-full blur-3xl mix-blend-multiply"></div>
        <div className="absolute bottom-40 right-1/4 w-[600px] h-[600px] bg-purple-200/40 rounded-full blur-3xl mix-blend-multiply"></div>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 flex flex-col items-center mb-6">
        <Link to="/" className="flex items-center gap-2 mb-4 hover:opacity-80 transition-opacity">
          <div className="p-2 bg-primary-600 rounded-xl shadow-md">
            <Sparkles className="text-white" size={24} />
          </div>
          <span className="text-2xl font-extrabold tracking-tight text-gray-900">Gigflow</span>
        </Link>
      </div>

      <div className="relative z-10">
        <RegisterForm />
      </div>
    </div>
  );
};
