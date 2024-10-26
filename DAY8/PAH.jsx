                                                                                                                                                                            import React from 'react';
import { createStore } from 'redux';
import { Provider, useSelector, useDispatch } from 'react-redux';

// Action Types
const ADD_TO_CART = 'ADD_TO_CART';
const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
const UPDATE_QUANTITY = 'UPDATE_QUANTITY';

// Action Creators
const addToCart = (product) => ({
  type: ADD_TO_CART,
  payload: product
});

const removeFromCart = (productId) => ({
  type: REMOVE_FROM_CART,
  payload: productId
});

const updateQuantity = (productId, quantity) => ({
  type: UPDATE_QUANTITY,
  payload: { productId, quantity }
});

// Reducer
const initialState = {
  items: []
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }]
      };

    case REMOVE_FROM_CART:
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      };

    case UPDATE_QUANTITY:
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.productId
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      };

    default:
      return state;
  }
};

// Create Store
const store = createStore(cartReducer);

// Cart Item Component
const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  return (
    <div className="flex items-center justify-between p-4 border-b">
      <div className="flex-1">
        <h3 className="font-medium">{item.name}</h3>
        <p className="text-gray-600">${item.price}</p>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <button
            className="px-2 py-1 bg-gray-200 rounded"
            onClick={() => dispatch(updateQuantity(item.id, Math.max(0, item.quantity - 1)))}
          >
            -
          </button>
          <span className="w-8 text-center">{item.quantity}</span>
          <button
            className="px-2 py-1 bg-gray-200 rounded"
            onClick={() => dispatch(updateQuantity(item.id, item.quantity + 1))}
          >
            +
          </button>
        </div>
        <button
          className="text-red-500"
          onClick={() => dispatch(removeFromCart(item.id))}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

// Cart Page Component
const CartPage = () => {
  const cartItems = useSelector(state => state.items);
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <div className="space-y-4">
            {cartItems.map(item => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
          <div className="mt-6 text-right">
            <p className="text-xl font-bold">
              Total: ${total.toFixed(2)}
            </p>
          </div>
        </>
      )}
    </div>
  );
};

// Example usage with some demo products
const products = [
  { id: 1, name: 'Product 1', price: 29.99 },
  { id: 2, name: 'Product 2', price: 39.99 },
];

// Main App Component
const App = () => {
  const dispatch = useDispatch();

  return (
    <div className="p-4">
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Products</h2>
        <div className="grid grid-cols-2 gap-4">
          {products.map(product => (
            <div key={product.id} className="p-4 border rounded">
              <h3 className="font-medium">{product.name}</h3>
              <p className="text-gray-600">${product.price}</p>
              <button
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
                onClick={() => dispatch(addToCart(product))}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
      <CartPage />
    </div>
  );
};

// Wrap the app with Provider
const AppWrapper = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default AppWrapper;
