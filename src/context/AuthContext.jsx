import { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    setLoading(true);
    try {
      if (email === 'admin@example.com' && password === 'admin123') {
        const userData = {
          id: 1,
          email: email,
          name: 'Administrador'
        };
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        return { success: true };
      }
      return { success: false, error: 'Credenciales incorrectas' };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const isAuthenticated = () => {
    return user !== null;
  };

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      loading,
      isAuthenticated
    }}>
      {children}
    </AuthContext.Provider>
  );
};