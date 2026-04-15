import React from 'react';
import { Link } from 'react-router-dom'; // Сілтеме үшін қажет
import { useCart } from './CartContext';

const PostCard = ({ item }) => {
    const { addToCart } = useCart();

    return (
        <div className="post-card">
            {/* Жаңалықтың ішіне өту үшін Link қолданамыз */}
            <Link to={`/post/${item.id}`} className="post-link">
                <div className="post-card-content">
                    <p className="post-category">{item.category}</p>
                    <h3 className="post-title">{item.title}</h3>
                    <p className="post-description">{item.description}</p>
                </div>
            </Link>

            <div className="post-footer">
                <span className="post-date">{item.date}</span>
                {/* Сақтау батырмасы */}
                <button 
                    className="favorite-btn" 
                    onClick={(e) => {
                        e.preventDefault(); // Сілтемеге өтіп кетпеу үшін
                        addToCart(item);
                    }}
                >
                    Сақтау
                </button>
            </div>
        </div>
    );
};

export default PostCard;