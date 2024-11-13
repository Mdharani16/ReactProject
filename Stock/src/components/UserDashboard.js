import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Link, Element } from 'react-scroll';
import './UserDashboard.css';
import { useNavigate } from 'react-router-dom';
import { useTheme } from './ThemeContext'; 

const UserDashboard = () => {
    const { darkMode, toggleTheme } = useTheme();
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({ name: '', quantity: 0 });
    const [editProduct, setEditProduct] = useState({ id: '', name: '', quantity: 0 });
    const [chartData, setChartData] = useState({});
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/');
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        const response = await fetch('http://localhost:3001/products');
        const data = await response.json();
        setProducts(data);
        updateChartData(data);
    };

    const updateChartData = (productData) => {
        if (!productData || productData.length === 0) return;
        const labels = productData.map(product => product.name);
        const quantities = productData.map(product => product.quantity);
        setChartData({
            labels,
            datasets: [{ label: 'Stock Quantity', data: quantities, backgroundColor: 'rgba(75, 192, 192, 0.6)' }],
        });
    };

    const handleAddProduct = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:3001/products', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...newProduct }),
        });
        const addedProduct = await response.json();
        setProducts([...products, addedProduct]);
        setNewProduct({ name: '', quantity: 0 });
        updateChartData([...products, addedProduct]);
    };

    const handleEditProduct = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:3001/products/${editProduct.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(editProduct),
        });
        const updatedProduct = await response.json();
        const updatedProducts = products.map(product => (product.id === updatedProduct.id ? updatedProduct : product));
        setProducts(updatedProducts);
        setEditProduct({ id: '', name: '', quantity: 0 });
        updateChartData(updatedProducts);
    };

    const handleDeleteProduct = async (id) => {
        await fetch(`http://localhost:3001/products/${id}`, { method: 'DELETE' });
        const updatedProducts = products.filter(product => product.id !== id);
        setProducts(updatedProducts);
        updateChartData(updatedProducts);
    };

    return (
        <div className={`dashboard-container ${darkMode ? 'dark' : ''}`}>
            <nav className="section-nav">
                <Link to="existing-products" smooth={true} duration={500}>Existing Products</Link>
                <Link to="add-stock" smooth={true} duration={500}>Add Stock</Link>
                <Link to="edit-stock" smooth={true} duration={500}>Edit Stock</Link>
                <Link to="chart-section" smooth={true} duration={500}>Chart</Link>
            </nav>
            <div className="logout-container">
                <button onClick={toggleTheme} className="logout-button">
                    {darkMode ? 'Light Mode' : 'Dark Mode'}
                </button>
                <button onClick={handleLogout} className="logout-button">Logout</button>
            </div>

            <Element name="existing-products" className="section">
                <h2>Existing Products</h2>
                <ul className="product-list">
                    {products.map(product => (
                        <li key={product.id}>
                            {product.name} - Quantity: {product.quantity}
                            <button onClick={() => setEditProduct({ id: product.id, name: product.name, quantity: product.quantity })}>Edit</button>
                            <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            </Element>

            <Element name="add-stock" className="section">
                <h2>Add Stock</h2>
                <form onSubmit={handleAddProduct}>
                    <input type="text" placeholder="Product Name" value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} required />
                    <input type="number" placeholder="Quantity" value={newProduct.quantity} onChange={(e) => setNewProduct({ ...newProduct, quantity: parseInt(e.target.value) })} required />
                    <button type="submit">Add Product</button>
                </form>
            </Element>

            <Element name="edit-stock" className="section">
                <h2>Edit Stock</h2>
                <form onSubmit={handleEditProduct}>
                    <input type="text" placeholder="Product ID" value={editProduct.id} onChange={(e) => setEditProduct({ ...editProduct, id: e.target.value })} required />
                    <input type="text" placeholder="New Product Name" value={editProduct.name} onChange={(e) => setEditProduct({ ...editProduct, name: e.target.value })} required />
                    <input type="number" placeholder="New Quantity" value={editProduct.quantity} onChange={(e) => setEditProduct({ ...editProduct, quantity: parseInt(e.target.value) })} required />
                    <button type="submit">Edit Product</button>
                </form>
            </Element>

            <Element name="chart-section" className="section chart-section">
                <h2>Stock Chart</h2>
                {chartData.labels && chartData.labels.length > 0 ? (
                    <Bar data={chartData} />
                ) : (
                    <p>No data available to display.</p>
                )}
            </Element>
        </div>
    );
};

export default UserDashboard;
