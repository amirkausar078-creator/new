import React from 'react';
import { useNavigate } from 'react-router-dom';

const Categories = () => {
    const navigate = useNavigate();

    const categories = [
        { id: 'all', name: 'Все новости', icon: '🏠' },
        { id: 'Футбол', name: 'Футбол', icon: '⚽' },
        { id: 'Баскетбол', name: 'Баскетбол', icon: '🏀' },
        { id: 'Регби', name: 'Регби', icon: '🏈' },
        { id: 'Хоккей', name: 'Хоккей', icon: '🏒' },
        { id: 'Киберспорт', name: 'Киберспорт', icon: '🎮' },
        { id: 'Бокс', name: 'Бокс', icon: '🥊' },
        { id: 'Mix Fight', name: 'Mix Fight', icon: '🥋' }
    ];

    return (
        <div className="categories-page">
            <div className="categories-header">Категории</div>
            <div className="categories-grid">
                {categories.map((cat) => (
                    <div
                        key={cat.id}
                        className="category-card"
                        onClick={() => navigate(cat.id === 'all' ? '/' : `/?cat=${cat.id}`)}
                    >
                        <div className="cat-icon">{cat.icon}</div>
                        <div className="cat-name">{cat.name}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Categories;