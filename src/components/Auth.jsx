import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/style/style.css';

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true); // Кіру не Тіркелу режимі
    const [formData, setFormData] = useState({ fullName: '', email: '', password: '' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Mokky-де тіркелу үшін /register, кіру үшін /auth қолданылады
        const endpoint = isLogin ? 'auth' : 'register';
        
        try {
            const res = await fetch(`https://c2c2b82ee72f2264.mokky.dev/${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await res.json();

            if (res.ok) {
                // Токен мен пайдаланушы мәліметтерін сақтаймыз
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.data));
                alert(isLogin ? "Қош келдіңіз!" : "Тіркелу сәтті аяқталды!");
                navigate('/'); // Басты бетке жіберу
            } else {
                alert(data.message || "Қате орын алды");
            }
        } catch (err) {
            console.error("Auth error:", err);
        }
    };

    return (
        <div className="auth-wrapper">
            <div className="auth-container">
                <h2>{isLogin ? 'Кіру' : 'Тіркелу'}</h2>
                <form onSubmit={handleSubmit}>
                    {!isLogin && (
                        <input 
                            type="text" 
                            placeholder="Толық атыңыз" 
                            onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                            required 
                        />
                    )}
                    <input 
                        type="email" 
                        placeholder="Email" 
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        required 
                    />
                    <input 
                        type="password" 
                        placeholder="Құпия сөз" 
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                        required 
                    />
                    <button type="submit" className="final-add-btn">
                        {isLogin ? 'Жүйеге кіру' : 'Тіркелу'}
                    </button>
                </form>
                <p onClick={() => setIsLogin(!isLogin)} style={{cursor: 'pointer', marginTop: '15px', color: '#27AE60'}}>
                    {isLogin ? 'Аккаунт жоқ па? Тіркелу' : 'Аккаунтыңыз бар ма? Кіру'}
                </p>
            </div>
        </div>
    );
};

export default Auth;