import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../components/ui/select';
import { Shield, User, Lock, University } from 'lucide-react';
import { loginUser } from '../lib/auth';

const LoginPage = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    role: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const adminRoles = [
    { value: 'registrar', label: 'Registrar (Master Admin)' },
    { value: 'dean', label: 'Dean' },
    { value: 'hod', label: 'Head of Department' },
    { value: 'iqac', label: 'IQAC Officer' },
    { value: 'clubs', label: 'Clubs Coordinator' },
    { value: 'exam', label: 'Exam Controller' },
    { value: 'research', label: 'Research Cell Admin' }
  ];

  // Fallback credentials for development/testing
  const fallbackCredentials = {
    email: 'admin@gbu.edu.in',
    password: 'admin123',
    role: 'registrar'
  };

  // Validate credentials format
  const validateCredentials = (creds) => {
    const errors = [];
    
    if (!creds.email || !creds.email.trim()) {
      errors.push('Email is required');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(creds.email.trim())) {
      errors.push('Please enter a valid email address');
    }
    
    if (!creds.password) {
      errors.push('Password is required');
    } else if (creds.password.length < 6) {
      errors.push('Password must be at least 6 characters long');
    }
    
    if (!creds.role || creds.role.trim() === '') {
      errors.push('Please select an admin role');
    }
    
    return errors;
  };

  // Check if credentials match fallback
  const isFallbackCredentials = (creds) => {
    return creds.email === fallbackCredentials.email &&
           creds.password === fallbackCredentials.password &&
           creds.role === fallbackCredentials.role;
  };

  // Handle successful authentication
  const handleAuthSuccess = (tokens, role) => {
    try {
      // Store tokens securely
      if (tokens.access) {
        localStorage.setItem('accessToken', tokens.access);
      }
      if (tokens.refresh) {
        localStorage.setItem('refreshToken', tokens.refresh);
      }
      
      // Store user role and login timestamp
      localStorage.setItem('userRole', role);
      localStorage.setItem('loginTime', Date.now().toString());
      
      // Call the onLogin callback
      onLogin(role);
    } catch (err) {
      console.error('Error storing authentication data:', err);
      setError('Authentication successful but failed to store session data');
    }
  };

  // Handle authentication with fallback
  const handleFallbackAuth = (role) => {
    console.warn('Using fallback credentials for development');
    
    const fallbackTokens = {
      access: `FALLBACK_ACCESS_TOKEN_${Date.now()}`,
      refresh: `FALLBACK_REFRESH_TOKEN_${Date.now()}`
    };
    
    handleAuthSuccess(fallbackTokens, role);
  };

  // Parse API error response
  const parseApiError = (error) => {
    if (!error.response) {
      return 'Network error. Please check your connection and try again.';
    }

    const { data, status } = error.response;
    
    // Handle different error status codes
    switch (status) {
      case 400:
        return data?.non_field_errors?.[0] || 
               data?.detail || 
               'Invalid credentials provided';
      case 401:
        return 'Invalid email or password';
      case 403:
        return 'Access forbidden. Please contact administrator';
      case 404:
        return 'Authentication service not found';
      case 429:
        return 'Too many login attempts. Please try again later';
      case 500:
        return 'Server error. Please try again later';
      default:
        return data?.detail || 
               data?.message || 
               'Authentication failed. Please try again';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Validate credentials before attempting login
      const validationErrors = validateCredentials(credentials);
      if (validationErrors.length > 0) {
        setError(validationErrors[0]);
        setLoading(false);
        return;
      }

      // Attempt API authentication
      try {
        const authResponse = await loginUser(
          credentials.email.trim(),
          credentials.password
        );

        // Check if we received valid tokens
        if (!authResponse.access) {
          throw new Error('Invalid response from authentication service');
        }

        handleAuthSuccess(authResponse, credentials.role);
        
      } catch (apiError) {
        // If API fails, check fallback credentials
        if (isFallbackCredentials(credentials)) {
          handleFallbackAuth(credentials.role);
        } else {
          // Parse and display API error
          const errorMessage = parseApiError(apiError);
          setError(errorMessage);
        }
      }

    } catch (err) {
      console.error('Login error:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Check if form is valid for submission
  const isFormValid = () => {
    return credentials.email && credentials.email.trim() && 
           credentials.password && credentials.password.trim() && 
           credentials.role && credentials.role.trim();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md animate-fade-in">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
            <University className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">GBU Admin Portal</h1>
          <p className="text-gray-600">MyGBU Smart Campus ERP</p>
        </div>

        <Card className="shadow-xl border-0">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-semibold text-center flex items-center justify-center gap-2">
              <Shield className="w-5 h-5 text-blue-600" />
              Admin Login
            </CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to access the admin dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@gbu.edu.in"
                    className="pl-10"
                    value={credentials.email}
                    onChange={(e) =>
                      setCredentials({ ...credentials, email: e.target.value })
                    }
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10"
                    value={credentials.password}
                    onChange={(e) =>
                      setCredentials({ ...credentials, password: e.target.value })
                    }
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="role" className="text-sm font-medium">
                  Select Role
                </Label>
                <Select
                  value={credentials.role}
                  onValueChange={(value) => {
                    setCredentials({ ...credentials, role: value });
                    // Clear any existing error when role is selected
                    if (error && error.includes('select an admin role')) {
                      setError('');
                    }
                  }}
                  required
                  disabled={loading}
                >
                  <SelectTrigger className="w-full bg-white text-gray-800 border border-gray-300 hover:border-gray-400 focus:ring-2 focus:ring-blue-500">
                    <SelectValue placeholder="Choose your admin role..." />
                  </SelectTrigger>
                  <SelectContent 
                    className="bg-white text-gray-800 shadow-lg border border-gray-200 z-[9999] max-h-[300px] overflow-y-auto"
                    position="popper"
                    sideOffset={4}
                    align="start"
                  >
                    {adminRoles.map((role) => (
                      <SelectItem 
                        key={role.value} 
                        value={role.value}
                        className="hover:bg-gray-100 focus:bg-gray-100 cursor-pointer"
                      >
                        {role.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {error && (
                <div className="mt-2 p-2 bg-red-50 rounded-md">
                  <p className="text-sm text-red-600 font-medium">{error}</p>
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 mt-2"
                disabled={loading || !isFormValid()}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing In...
                  </span>
                ) : (
                  'Sign In to Dashboard'
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-xs text-gray-500">
                Secured by GBU IT Services | Need help? Contact support
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;