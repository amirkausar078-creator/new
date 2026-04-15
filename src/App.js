import { Route, Routes } from "react-router-dom";
import Categories from "./components/Categories";
import Header from "./components/Header";
import PostDetailPage from "./components/PostDetailPage"; 
import PostList from "./components/PostList";
import Cart from "./components/Cart";
import { CartProvider } from "./components/CartContext";
import Auth from "./components/Auth";

function App() {
  return (
    <CartProvider>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<PostList />} />
          <Route path="/post/:id" element={<PostDetailPage />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/cart" element={<Cart />} />
          
          {/* Тіркелу және Кіру бетіне жол ашамыз */}
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </div>
    </CartProvider>
  );
}

export default App;