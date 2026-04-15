import React from 'react';
import { useCart } from './CartContext';
import PostCard from './PostCard';

const Cart = () => {
    const { cartItems, removeFromCart } = useCart();

    return (
        <div className="saved-container">
            <div className="saved-header">
                <h1>Таңдаулы жаңалықтар</h1>
                <span className="saved-count">Барлығы: {cartItems.length}</span>
            </div>

            {cartItems.length === 0 ? (
                <div className="empty-state">
                    <p>Сізде әзірге сақталған жаңалықтар жоқ...</p>
                </div>
            ) : (
                <div className="news-grid">
                    {cartItems.map((item) => (
                        <div key={item.id} className="cart-item-wrapper">
                            <PostCard item={item} />
                            {/* Кнопка удаления теперь стилизована */}
                            <button
                                className="remove-btn"
                                onClick={() => removeFromCart(item.id)}
                            >
                                Тізімнен өшіру
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Cart;