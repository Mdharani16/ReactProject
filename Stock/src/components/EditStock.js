import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const EditStock = () => {
    const { id } = useParams(); 
    const [stockDetails, setStockDetails] = useState({
        name: '',
        quantity: '',
        price: ''
    });

    useEffect(() => {
        
        fetch(`http://localhost:3001/stocks/${id}`) 
            .then(response => response.json())
            .then(data => setStockDetails(data))
            .catch(error => console.error('Error fetching stock details:', error));
    }, [id]);

    const handleEdit = (e) => {
        e.preventDefault();
      
        fetch(`http://localhost:3001/stocks/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(stockDetails),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Stock updated successfully:', data);
            
        })
        .catch(error => console.error('Error updating stock:', error));
    };

    return (
        <div>
            <h2>Edit Stock</h2>
            <form onSubmit={handleEdit}>
                <label>Name:</label>
                <input
                    type="text"
                    value={stockDetails.name}
                    onChange={(e) => setStockDetails({ ...stockDetails, name: e.target.value })}
                />

                <label>Quantity:</label>
                <input
                    type="number"
                    value={stockDetails.quantity}
                    onChange={(e) => setStockDetails({ ...stockDetails, quantity: e.target.value })}
                />

                <label>Price:</label>
                <input
                    type="number"
                    value={stockDetails.price}
                    onChange={(e) => setStockDetails({ ...stockDetails, price: e.target.value })}
                />

                <button type="submit">Save Changes</button>
            </form>
        </div>
    );
};

export default EditStock;
