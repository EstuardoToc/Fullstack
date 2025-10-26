const ProductList = ({ products, onEdit, onDelete, loading }) => {
  if (loading) {
    return (
      <div className="loading">
        <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⏳</div>
        <h3>Cargando productos...</h3>
        <p>Por favor espere un momento</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="no-products">
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📦</div>
        <h3>No se encontraron productos</h3>
        <p>Comienza agregando tu primer producto</p>
      </div>
    );
  }

  return (
    <div className="product-list">
      {products.map(product => (
        <div key={product.id} className="product-card">
          <div className="product-info">
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <div className="product-details">
              <span className="price">💰 Q{parseFloat(product.price).toFixed(2)}</span>
              <span className="stock">📦 Stock: {product.stock}</span>
              <span className={`category Q{product.isPerishable ? 'perishable' : 'non-perishable'}`}>
                {product.isPerishable ? '🕒 Perecedero' : '✅ No perecedero'}
              </span>
              <span className="unit">📏 {product.unit}</span>
            </div>
          </div>
          <div className="product-actions">
            <button 
              onClick={() => onEdit(product)}
              className="btn btn-edit"
            >
              ✏️ Editar
            </button>
            <button 
              onClick={() => onDelete(product.id)}
              className="btn btn-delete"
            >
              🗑️ Eliminar
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;