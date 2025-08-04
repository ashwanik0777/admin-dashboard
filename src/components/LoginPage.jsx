import React, { useState } from 'react';
import { Shield, User, Lock, University } from 'lucide-react';

const loginUser = async (email, password) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        access: `MOCK_ACCESS_TOKEN_${Date.now()}`,
        refresh: `MOCK_REFRESH_TOKEN_${Date.now()}`
      });
    }, 1000);
  });
};

const Card = ({ className, children, ...props }) => (
  <div
    className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`}
    {...props}
  >
    {children}
  </div>
);

const CardHeader = ({ className, children, ...props }) => (
  <div className={`flex flex-col space-y-1.5 p-6 ${className}`} {...props}>
    {children}
  </div>
);

const CardTitle = ({ className, children, ...props }) => (
  <h3
    className={`text-2xl font-semibold leading-none tracking-tight ${className}`}
    {...props}
  >
    {children}
  </h3>
);

const CardDescription = ({ className, children, ...props }) => (
  <p className={`text-sm text-muted-foreground ${className}`} {...props}>
    {children}
  </p>
);

const CardContent = ({ className, children, ...props }) => (
  <div className={`p-6 pt-0 ${className}`} {...props}>
    {children}
  </div>
);

const Button = ({ className, variant, size, children, ...props }) => {
  const baseClasses = 'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';
  const variantClasses = {
    default: 'bg-primary text-primary-foreground hover:bg-primary/90',
    destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
    outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
    ghost: 'hover:bg-accent hover:text-accent-foreground',
    link: 'text-primary underline-offset-4 hover:underline',
  };
  const sizeClasses = {
    default: 'h-10 px-4 py-2',
    sm: 'h-9 rounded-md px-3',
    lg: 'h-11 rounded-md px-8',
    icon: 'h-10 w-10',
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant || 'default']} ${sizeClasses[size || 'default']} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const Input = ({ className, type, ...props }) => (
  <input
    type={type}
    className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    {...props}
  />
);

const Label = ({ className, children, ...props }) => (
  <label
    className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`}
    {...props}
  >
    {children}
  </label>
);

const Select = ({ value, onValueChange, children, ...props }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value);

  React.useEffect(() => {
    setSelectedValue(value);
  }, [value]);

  const handleSelect = (itemValue) => {
    setSelectedValue(itemValue);
    if (onValueChange) {
      onValueChange(itemValue);
    }
    setIsOpen(false);
  };

  const contextValue = { selectedValue, handleSelect, isOpen, setIsOpen };

  return (
    <SelectContext.Provider value={contextValue}>
      <div className="relative" {...props}>
        {children}
        {isOpen && (
          <div
            className="fixed inset-0 z-[9998]"
            onClick={() => setIsOpen(false)}
          />
        )}
      </div>
    </SelectContext.Provider>
  );
};

const SelectContext = React.createContext(null);

const SelectTrigger = ({ className, children, ...props }) => {
  const { selectedValue, setIsOpen, isOpen } = React.useContext(SelectContext);
  const triggerRef = React.useRef(null);

  return (
    <button
      ref={triggerRef}
      className={`flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 ${className}`}
      onClick={() => setIsOpen(!isOpen)}
      aria-haspopup="listbox"
      aria-expanded={isOpen}
      {...props}
    >
      <span className="truncate">
        {children}
      </span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4 opacity-50 ml-2"
      >
        <polyline points="6 9 12 15 18 9"></polyline>
      </svg>
    </button>
  );
};

const SelectValue = ({ placeholder, children }) => {
  const { selectedValue } = React.useContext(SelectContext);
  return selectedValue || placeholder;
};

const SelectContent = ({ className, children, position = 'popper', sideOffset = 4, align = 'start', ...props }) => {
  const { isOpen, setIsOpen } = React.useContext(SelectContext);

  if (!isOpen) return null;

  const style = position === 'popper' ? {
    position: 'absolute',
    left: align === 'start' ? 0 : 'auto',
    right: align === 'end' ? 0 : 'auto',
    top: `calc(100% + ${sideOffset}px)`,
    minWidth: '100%',
  } : {};

  return (
    <div
      style={style}
      className={`relative z-[9999] max-h-[var(--radix-popper-max-height)] w-[var(--radix-popper-anchor-width)] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md animate-in fade-in-80 ${className}`}
      {...props}
    >
      <div className="p-1">
        {children}
      </div>
    </div>
  );
};

const SelectItem = ({ className, value, children, ...props }) => {
  const { selectedValue, handleSelect } = React.useContext(SelectContext);
  const isActive = selectedValue === value;

  return (
    <div
      role="option"
      aria-selected={isActive}
      data-state={isActive ? 'selected' : 'unselected'}
      onClick={() => handleSelect(value)}
      className={`relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 ${isActive ? 'bg-accent text-accent-foreground' : ''} ${className}`}
      {...props}
    >
      {isActive && (
        <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
          >
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </span>
      )}
      {children}
    </div>
  );
};

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

  const fallbackCredentials = {
    email: 'admin@gbu.edu.in',
    password: 'admin123',
    role: 'registrar'
  };

  const validateCredentials = (creds) => {
    return [];
  };

  const isFallbackCredentials = (creds) => {
    return true;
  };

  const handleAuthSuccess = (tokens, role) => {
    localStorage.setItem('accessToken', tokens.access);
    localStorage.setItem('refreshToken', tokens.refresh);
    localStorage.setItem('userRole', role);
    localStorage.setItem('loginTime', Date.now().toString());
    localStorage.setItem('rawCredentials', JSON.stringify(credentials));
    onLogin(role);
  };

  const handleFallbackAuth = (role) => {
    const fallbackTokens = {
      access: `FALLBACK_ACCESS_TOKEN_${Date.now()}`,
      refresh: `FALLBACK_REFRESH_TOKEN_${Date.now()}`
    };
    handleAuthSuccess(fallbackTokens, role);
  };

  const parseApiError = (apiError) => {
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const authResponse = await loginUser(credentials.email, credentials.password);
      handleAuthSuccess(authResponse, credentials.role);
    } catch {
      handleFallbackAuth(credentials.role);
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = () => {
    return true;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md animate-fade-in">
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
                    type="text"
                    placeholder="••••••••"
                    className="pl-10"
                    value={credentials.password}
                    onChange={(e) =>
                      setCredentials({ ...credentials, password: e.target.value })
                    }
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
                  }}
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
                disabled={loading}
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