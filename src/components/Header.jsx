import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from './CartContext';

const Header = () => {
    const { cartItems } = useCart();

    return (
        <div className="header-wrapper">
            <header className="top-black-bar" style={{ background: '#000', padding: '12px 0' }}>
                {/* Мұнда 'container' орнына тікелей стиль қолдандық, шетке шығу үшін */}
                <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    padding: '0 40px', // Шетінен аздап қана бос орын
                    width: '100%',
                    boxSizing: 'border-box'
                }}>
                    
                    {/* СОЛ ЖАҚ ШЕТ: Бургер және Таңдаулылар */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
                        <Link to="/categories" className="burger-menu" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                            <span style={{ display: 'block', width: '25px', height: '2px', background: 'white' }}></span>
                            <span style={{ display: 'block', width: '25px', height: '2px', background: 'white' }}></span>
                            <span style={{ display: 'block', width: '25px', height: '2px', background: 'white' }}></span>
                        </Link>

                        <Link to="/cart" style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: '10px', 
                            textDecoration: 'none' 
                        }}>
                            <span style={{ color: 'white', fontSize: '16px', fontWeight: '500' }}>Таңдаулылар</span>
                            <span style={{ 
                                background: '#E67E22', 
                                color: 'white', 
                                padding: '2px 10px', 
                                borderRadius: '20px',
                                fontSize: '13px',
                                minWidth: '15px',
                                textAlign: 'center'
                            }}>{cartItems.length}</span>
                        </Link>
                    </div>

                    {/* ОҢ ЖАҚ ШЕТ: Кіру батырмасы */}
                    <div>
                        <Link to="/auth" style={{ 
                            color: '#ffffff', 
                            textDecoration: 'none', 
                            fontWeight: 'bold',
                            backgroundColor: '#1bbc9b', // Сенің дизайныңа сай жасыл түс
                            padding: '10px 25px',
                            borderRadius: '10px',
                            fontSize: '15px',
                            transition: '0.3s'
                        }}>
                            Кіру
                        </Link>
                    </div>

                </div>
            </header>

            <div className="gray-title-bar" style={{ background: '#f5f5f5', padding: '20px 0', textAlign: 'center', borderBottom: '1px solid #ddd' }}>
                <Link to="/" style={{ textDecoration: 'none', color: '#000' }}>
                    <h2 style={{ margin: 0, fontSize: '24px', fontWeight: 'bold', textTransform: 'uppercase' }}>Все новости</h2>
                </Link>
            </div>
        </div>
    );
};

export default Header;