import React, { createContext, useState, useEffect } from 'react';

// Create a context for the stock management
export const StockContext = createContext();

export const StockProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [chartData, setChartData] = useState({});

    useEffect(() => {
        fetchProducts();
    }, []);

    // Fetch existing products from the server
    const fetchProducts = async () => {
        const response = await fetch('http://localhost:3001/products');
        const data = await response.json();
        setProducts(data);
        updateChartData(data);
    };

    // Update chart data
    const updateChartData = (productData) => {
        if (!productData || productData.length === 0) return;

        const labels = productData.map(product => product.name);
        const quantities = productData.map(product => product.quantity);

        setChartData({
            labels,
            datasets: [
                {
                    label: 'Stock Quantity',
                    data: quantities,
                    backgroundColor: 'rgba(75, 192, 192, 0.6)',
                },
            ],
        });
    };

    // Add new product
    const addProduct = async (newProduct) => {
        const response = await fetch('http://localhost:3001/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newProduct),
        });
        const addedProduct = await response.json();
        setProducts([...products, addedProduct]);
        updateChartData([...products, addedProduct]);
    };

    // Edit product
    const editProduct = async (updatedProduct) => {
        const response = await fetch(`http://localhost:3001/products/${updatedProduct.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedProduct),
        });
        const result = await response.json();
        const updatedProducts = products.map(product =>
            product.id === result.id ? result : product
        );
        setProducts(updatedProducts);
        updateChartData(updatedProducts);
    };

    // Delete product
    const deleteProduct = async (id) => {
        await fetch(`http://localhost:3001/products/${id}`, {
            method: 'DELETE',
        });
        const updatedProducts = products.filter(product => product.id !== id);
        setProducts(updatedProducts);
        updateChartData(updatedProducts);
    };

    return (
        <StockContext.Provider
            value={{
                products,
                chartData,
                addProduct,
                editProduct,
                deleteProduct,
            }}
        >
            {children}
        </StockContext.Provider>
    );
};
