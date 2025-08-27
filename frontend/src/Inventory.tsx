import React, { useState, useEffect } from 'react';

interface Product {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

const API_BASE_URL = 'http://localhost:8000'; // Gateway URL

const Inventory: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    setError(null);
    const token = localStorage.getItem('token');
    if (!token) {
      setError('No authentication token found. Please log in.');
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/products`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setProducts(data);
      } else {
        setError(data.error || 'Failed to fetch products.');
      }
    } catch (err) {
      setError('Network error or Inventory service is unreachable.');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddProduct = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    const token = localStorage.getItem('token');
    if (!token) {
      setError('No authentication token found. Please log in.');
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ name, quantity, price }),
      });
      const data = await response.json();
      if (response.ok) {
        setProducts([...products, data]);
        setName('');
        setQuantity(0);
        setPrice(0);
      } else {
        setError(data.error || 'Failed to add product.');
      }
    } catch (err) {
      setError('Network error or Inventory service is unreachable.');
    }
  };

  return (
    <div>
      <h1>Inventory Page</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <h2>Add New Product</h2>
      <form onSubmit={handleAddProduct}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="quantity">Quantity:</label>
          <input
            type="number"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            required
          />
        </div>
        <div>
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(parseFloat(e.target.value))}
            required
          />
        </div>
        <button type="submit">Add Product</button>
      </form>

      <h2>Products</h2>
      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.quantity}</td>
                <td>{product.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Inventory;
