// Servicios API - usando datos mock para la demo
export const productService = {
  getAll: () => Promise.resolve({ data: [] }),
  getById: (id) => Promise.resolve({ data: null }),
  create: (product) => Promise.resolve({ data: product }),
  update: (id, product) => Promise.resolve({ data: product }),
  delete: (id) => Promise.resolve({ data: { id } }),
  search: (query) => Promise.resolve({ data: [] }),
};

export const categoryService = {
  getAll: () => Promise.resolve({ 
    data: [
      { id: 1, name: 'Perecedero' },
      { id: 2, name: 'No perecedero' },
      { id: 3, name: 'Electrónicos' },
      { id: 4, name: 'Ropa' }
    ] 
  }),
  getUnits: () => Promise.resolve({
    data: [
      { id: 1, name: 'Unidad' },
      { id: 2, name: 'Kilogramo' },
      { id: 3, name: 'Litro' },
      { id: 4, name: 'Metro' }
    ]
  }),
};