import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './components/Login';
import ProductsPage from './pages/ProductsPage';
import './App.css';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated() ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route 
              path="/products" 
              element={
                <ProtectedRoute>
                  <ProductsPage />
                </ProtectedRoute>
              } 
            />
            <Route path="/" element={<Navigate to="/products" />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;