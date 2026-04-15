import React, { useState, useEffect } from 'react';
import PostCard from './PostCard';

const PostList = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    // 1. Категория үшін state қосамыз
    const [selectedCategory, setSelectedCategory] = useState('Все');

    const categories = ['Все', 'Футбол', 'Спорт', 'Экипировка', 'Трансферы'];

    useEffect(() => {
        fetch('https://f4df811b78214c5f.mokky.dev/post')
            .then((res) => res.json())
            .then((data) => {
                const sortedData = data.sort((a, b) => {
                    const dateA = new Date(a.date.split('.').reverse().join('-'));
                    const dateB = new Date(b.date.split('.').reverse().join('-'));
                    return dateB - dateA;
                });
                setPosts(sortedData);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Ошибка:", err);
                setLoading(false);
            });
    }, []);

    // 2. Фильтрация логикасы
    const filteredPosts = posts.filter((post) => {
        if (selectedCategory === 'Все') return true;
        return post.category === selectedCategory;
    });

    if (loading) {
        return <h2 style={{ textAlign: 'center', marginTop: '50px' }}>Загрузка...</h2>;
    }

    return (
        <div>
            {/* 3. Категория батырмалары */}
            <div className="category-container" style={{ display: 'flex', justifyContent: 'center', gap: '15px', margin: '20px 0' }}>
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        style={{
                            padding: '8px 16px',
                            cursor: 'pointer',
                            backgroundColor: selectedCategory === cat ? '#333' : '#eee',
                            color: selectedCategory === cat ? '#fff' : '#000',
                            border: 'none',
                            borderRadius: '5px'
                        }}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* 4. Сұрыпталған және фильтрленген тізім */}
            <div className="news-grid">
                {filteredPosts.length > 0 ? (
                    filteredPosts.map((post) => (
                        <PostCard key={post.id} item={post} />
                    ))
                ) : (
                    <p style={{ textAlign: 'center' }}>Бұл категорияда жаңалықтар жоқ</p>
                )}
            </div>
        </div>
    );
};

export default PostList;