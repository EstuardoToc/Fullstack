import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import ProductList from '../components/ProductList';
import ProductForm from '../components/ProductForm';
import SearchBar from '../components/SearchBar';

const ProductsPage = () => {
  const { user, logout } = useAuth();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  const initialProducts = [
    {
      id: 1,
      name: 'Leche Entera',
      description: 'Leche entera pasteurizada',
      price: 25.50,
      categoryId: 1,
      category: 'Perecedero',
      unitId: 3,
      unit: 'Litro',
      stock: 50,
      isPerishable: true
    },
    {
      id: 2,
      name: 'Arroz Integral',
      description: 'Arroz integral de grano largo',
      price: 45.00,
      categoryId: 2,
      category: 'No perecedero',
      unitId: 2,
      unit: 'Kilogramo',
      stock: 100,
      isPerishable: false
    }
  ];

  const categories = [
    { id: 1, name: 'Perecedero' },
    { id: 2, name: 'No perecedero' },
    { id: 3, name: 'Electrónicos' },
    { id: 4, name: 'Ropa' }
  ];

  const units = [
    { id: 1, name: 'Unidad' },
    { id: 2, name: 'Kilogramo' },
    { id: 3, name: 'Litro' },
    { id: 4, name: 'Metro' }
  ];

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    try {
      setTimeout(() => {
        setProducts(initialProducts);
        setFilteredProducts(initialProducts);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error loading products:', error);
      setLoading(false);
    }
  };

  const handleSearch = (query) => {
    if (!query.trim()) {
      setFilteredProducts(products);
      return;
    }

    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.description.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const handleCreateProduct = () => {
    setEditingProduct(null);
    setShowForm(true);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      try {
        const updatedProducts = products.filter(p => p.id !== productId);
        setProducts(updatedProducts);
        setFilteredProducts(updatedProducts);
        alert('Producto eliminado exitosamente');
      } catch (error) {
        alert('Error al eliminar el producto');
      }
    }
  };

  const handleSubmitProduct = async (productData) => {
    try {
      if (editingProduct) {
        const updatedProducts = products.map(p =>
          p.id === editingProduct.id 
            ? { 
                ...p, 
                ...productData, 
                id: editingProduct.id,
                category: categories.find(c => c.id == productData.categoryId)?.name || 'Perecedero',
                unit: units.find(u => u.id == productData.unitId)?.name || 'Unidad'
              }
            : p
        );
        setProducts(updatedProducts);
        setFilteredProducts(updatedProducts);
        alert('Producto actualizado exitosamente');
      } else {
        const newProduct = {
          ...productData,
          id: Date.now(),
          category: categories.find(c => c.id == productData.categoryId)?.name || 'Perecedero',
          unit: units.find(u => u.id == productData.unitId)?.name || 'Unidad'
        };
        const updatedProducts = [...products, newProduct];
        setProducts(updatedProducts);
        setFilteredProducts(updatedProducts);
        alert('Producto creado exitosamente');
      }
      setShowForm(false);
      setEditingProduct(null);
    } catch (error) {
      alert('Error al guardar el producto');
    }
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  return (
    <div className="products-page">
      <header className="page-header">
        <div className="header-content">
          <h1>Gestión de Productos</h1>
          <div className="user-info">
            <span>Bienvenido, {user?.name}</span>
            <button onClick={logout} className="btn-logout">
              Cerrar Sesión
            </button>
          </div>
        </div>
      </header>

      <div className="page-content">
        {showForm ? (
          <div className="form-section">
            <h2>{editingProduct ? 'Editar Producto' : 'Nuevo Producto'}</h2>
            <ProductForm
              product={editingProduct}
              onSubmit={handleSubmitProduct}
              onCancel={handleCancelForm}
            />
          </div>
        ) : (
          <div className="list-section">
            <div className="toolbar">
              <SearchBar onSearch={handleSearch} />
              <button 
                onClick={handleCreateProduct}
                className="btn-primary"
              >
                + Nuevo Producto
              </button>
            </div>

            <ProductList
              products={filteredProducts}
              onEdit={handleEditProduct}
              onDelete={handleDeleteProduct}
              loading={loading}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;