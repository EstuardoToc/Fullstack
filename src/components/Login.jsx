import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, loading } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    const result = await login(email, password);
    if (!result.success) {
      setError(result.error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🛍️</div>
          <h2>Sistema de Gestión</h2>
          <p style={{ color: '#666', marginTop: '0.5rem' }}>Control de Inventario</p>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>📧 Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="usuario@ejemplo.com"
              required
            />
          </div>
          <div className="form-group">
            <label>🔒 Contraseña:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingresa tu contraseña"
              required
            />
          </div>
          {error && <div className="error-message">⚠️ {error}</div>}
          <button type="submit" disabled={loading} className="btn btn-primary" style={{ width: '100%' }}>
            {loading ? '🔄 Iniciando sesión...' : '🚀 Iniciar Sesión'}
          </button>
        </form>
        
        <div className="demo-credentials">
          <p><strong>👤 Credenciales de demostración:</strong></p>
          <p>📧 Email: admin@example.com</p>
          <p>🔒 Contraseña: admin123</p>
        </div>
      </div>
    </div>
  );
};

export default Login;