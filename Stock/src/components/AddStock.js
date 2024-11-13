import React, { useState } from 'react';

const AddStock = () => {
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [category, setCategory] = useState('');
    const [error, setError] = useState('');

    const handleAddStock = async () => {
        if (!name || quantity < 0 || !category) {
            setError('All fields are required.');
            return;
        }

        const newStockItem = { name, quantity, category };

        try {
            const response = await fetch('http://localhost:3001/stock', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newStockItem),
            });

            if (response.ok) {
                // Clear input fields
                setName('');
                setQuantity(0);
                setCategory('');
                alert('Stock item added successfully!');
            } else {
                throw new Error('Failed to add stock item. Please try again.');
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="add-stock">
            <style>
                {`
                    .add-stock {
                        max-width: 400px;
                        margin: 2rem auto;
                        background: #FFFFFF;
                        padding: 2rem;
                        border-radius: 15px;
                        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
                        animation: slideUp 0.5s ease-out;
                    }

                    .add-stock h2 {
                        text-align: center;
                        color: #3B413C;
                        margin-bottom: 1.5rem;
                        font-size: 1.8rem;
                    }

                    .error {
                        color: #ff4444;
                        font-size: 0.9rem;
                        margin-top: 0.5rem;
                        text-align: center;
                    }

                    input {
                        width: 100%;
                        padding: 0.8rem;
                        border: 2px solid #9DB5B2;
                        border-radius: 8px;
                        font-size: 1rem;
                        margin-bottom: 1.5rem;
                        transition: border-color 0.3s ease;
                    }

                    input:focus {
                        border-color: #94D1BE;
                        outline: none;
                        box-shadow: 0 0 0 3px rgba(148, 209, 190, 0.2);
                    }

                    button {
                        width: 100%;
                        padding: 12px;
                        background-color: #94D1BE;
                        color: #FFFFFF;
                        border: none;
                        border-radius: 8px;
                        cursor: pointer;
                        font-size: 1.2rem;
                        font-weight: bold;
                        transition: background-color 0.3s, transform 0.2s;
                    }

                    button:hover {
                        background-color: #7AB5A3;
                        transform: scale(1.05);
                    }

                    @keyframes slideUp {
                        from {
                            opacity: 0;
                            transform: translateY(20px);
                        }
                        to {
                            opacity: 1;
                            transform: translateY(0);
                        }
                    }
                `}
            </style>
            <h2>Add Stock Item</h2>
            {error && <p className="error">{error}</p>}
            <input
                type="text"
                placeholder="Item Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="number"
                placeholder="Quantity"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
            />
            <input
                type="text"
                placeholder="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            />
            <button onClick={handleAddStock}>Add Stock</button>
        </div>
    );
};

export default AddStock;
