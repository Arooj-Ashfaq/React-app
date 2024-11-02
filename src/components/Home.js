// src/ProductList.js
import React, { useEffect, useState } from 'react';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data); // Initially set filtered products to all products
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div className='load-err'><b>Loading...</b></div>;
  }

  if (error) {
    return <div className='load-err'><b>Error: {error}</b></div>;
  }

  
  // Filter products based on the search query when search button is clicked
  const handleSearch = () => {
    const filtered = products.filter(product =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  return (
    <div>
      <br/>
      <h1 className='proH'>Products</h1>

      {/* Search Bar */}
      <div className='search'>
        <input
          type="text"
          placeholder="Search for a product..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-bar"
        />
        <button onClick={handleSearch} className="search-button">Search</button>
      </div>

      <br/>

      <div className='product-list'>
        <ul className='allProducts'>
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <li key={product.id} className='product-item'>
                <h2 className='product-title'>{product.title}</h2>
                <p className='product-description'>{product.description}</p>
                <img src={product.image} alt={product.title} width="100" />
                <p className='product-price'><b>Price: ${product.price}</b></p>
              </li>
            ))
          ) : (
            <p>No products found</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Home;
