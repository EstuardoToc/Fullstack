import { useState, useEffect } from 'react';

const ProductForm = ({ product, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    categoryId: '',
    unitId: '',
    stock: '',
    isPerishable: false
  });

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
    if (product) {
      setFormData({
        name: product.name || '',
        description: product.description || '',
        price: product.price || '',
        categoryId: product.categoryId || '',
        unitId: product.unitId || '',
        stock: product.stock || '',
        isPerishable: product.isPerishable || false
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="product-form">
      <div className="form-group">
        <label>Nombre del Producto:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Descripción:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="3"
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Precio:</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            step="0.01"
            required
          />
        </div>

        <div className="form-group">
          <label>Stock:</label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Categoría:</label>
          <select
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
            required
          >
            <option value="">Seleccionar categoría</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Unidad:</label>
          <select
            name="unitId"
            value={formData.unitId}
            onChange={handleChange}
            required
          >
            <option value="">Seleccionar unidad</option>
            {units.map(unit => (
              <option key={unit.id} value={unit.id}>
                {unit.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-group checkbox-group">
        <label>
          <input
            type="checkbox"
            name="isPerishable"
            checked={formData.isPerishable}
            onChange={handleChange}
          />
          ¿Es perecedero?
        </label>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn-primary">
          {product ? 'Actualizar' : 'Crear'} Producto
        </button>
        <button type="button" onClick={onCancel} className="btn-secondary">
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default ProductForm;