import { useRef, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Cart from './pages/Cart';
import Login from './pages/Login';
import MyPage from './pages/MyPage';
import ProductDetail from './pages/ProductDetail';
import EditProduct from './pages/EditProduct';
import Register from './pages/Register';
import './App.css';

function App() {
  const navigate = useNavigate();
  const productRef = useRef<HTMLDivElement>(null);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') || 'null'));
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');

  const categories = ['TOP', 'OUTER', 'PANTS', 'ACC'];

  const scrollToProducts = () => {
    productRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const addToCart = (product: any) => {
    setCartItems([...cartItems, product]);
    alert('장바구니에 담았습니다!');
  };

  const removeFromCart = (index: number) => {
    const newCart = [...cartItems];
    newCart.splice(index, 1);
    setCartItems(newCart);
  };

  const products = [
    { id: 1, name: '샘플 상품 1', price: 10000, category: 'TOP', imageUrl: 'https://via.placeholder.com/300x400?text=Item+1' },
    { id: 2, name: '샘플 상품 2', price: 20000, category: 'OUTER', imageUrl: 'https://via.placeholder.com/300x400?text=Item+2' },
    { id: 3, name: '샘플 상품 3', price: 15000, category: 'PANTS', imageUrl: 'https://via.placeholder.com/300x400?text=Item+3' },
    { id: 4, name: '샘플 상품 4', price: 25000, category: 'ACC', imageUrl: 'https://via.placeholder.com/300x400?text=Item+4' },
  ];

  const filteredProducts = products.filter((product) => {
    return (
      (!selectedCategory || product.category === selectedCategory) &&
      (!searchKeyword || product.name.includes(searchKeyword))
    );
  });

  return (
    <>
      {/* 네비게이션 */}
      <header className="nav">
        <div className="logo" onClick={() => navigate('/')}>SilUet</div>
        <nav className="menu">
          {categories.map((cat) => (
            <button key={cat} onClick={() => setSelectedCategory(cat)}>{cat}</button>
          ))}
          <input
            type="text"
            placeholder="상품명을 검색하세요"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
          <button onClick={() => navigate('/cart')}>🛒 장바구니</button>
          <button onClick={() => navigate('/login')}>🔐 로그인</button>
          <button onClick={() => navigate('/mypage')}>🙍‍♂️ 마이페이지</button>
        </nav>
      </header>

      {/* 라우터 설정 */}
      <Routes>
        {/* 메인 페이지 */}
        <Route path="/" element={
          <>
            {/* 메인 배너 */}
            <div className="main-banner">
              <div className="overlay">
                <h1>당신의 첫인상,<br />SilUet에서 시작됩니다</h1>
                <button className="main-button" onClick={scrollToProducts}>지금 둘러보기</button>
              </div>
            </div>

            {/* 상품 리스트 */}
            <section className="product-list" ref={productRef}>
              {filteredProducts.map((p) => (
                <div key={p.id} className="product-card">
                  <img src={p.imageUrl} alt={p.name} />
                  <h3>{p.name}</h3>
                  <p>₩{p.price.toLocaleString()}</p>
                  <button onClick={() => addToCart(p)}>장바구니 담기</button>
                </div>
              ))}
            </section>
          </>
        } />

        {/* 서브 페이지들 */}
        <Route path="/cart" element={<Cart cartItems={cartItems} removeFromCart={removeFromCart} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/product/:id" element={<ProductDetail addToCart={addToCart} />} />
        <Route path="/edit/:id" element={<EditProduct />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
