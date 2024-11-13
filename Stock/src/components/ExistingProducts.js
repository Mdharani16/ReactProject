
import React from 'react';

const ExistingProducts = ({ products, onEdit, onDelete }) => {
    return (
        <div>
            <h2>Existing Products</h2>
            <ul className="product-list">
                {products.map((product) => (
                    <li key={product.id}>
                        {product.name} - Quantity: {product.quantity}
                        <button onClick={() => onEdit(product)}>Edit</button>
                        <button onClick={() => onDelete(product.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ExistingProducts;
