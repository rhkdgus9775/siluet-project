import { useState } from 'react';

interface CartProps {
  cartItems: any[];
  removeFromCart: (index: number) => void;
}

function Cart({ cartItems, removeFromCart }: CartProps) {
  const [quantities, setQuantities] = useState<number[]>(cartItems.map(() => 1));

  const increaseQuantity = (index: number) => {
    const updated = [...quantities];
    updated[index]++;
    setQuantities(updated);
  };

  const decreaseQuantity = (index: number) => {
    const updated = [...quantities];
    if (updated[index] > 1) {
      updated[index]--;
      setQuantities(updated);
    } else {
      // 수량 1 이하일 때 자동 삭제하고 싶다면 아래 줄 해제
      // removeFromCart(index);
    }
  };

  const handlePurchase = () => {
    const userStr = localStorage.getItem('user');
    if (!userStr) {
      alert('로그인이 필요합니다.');
      return;
    }

    const user = JSON.parse(userStr);
    const today = new Date().toISOString().slice(0, 10);

    const newOrders = cartItems.map((item, index) => ({
      id: Date.now() + Math.random(),
      name: item.name,
      price: item.price * quantities[index],
      quantity: quantities[index],
      date: today,
    }));

    user.orders = [...(user.orders || []), ...newOrders];
    localStorage.setItem('user', JSON.stringify(user));

    alert('구매가 완료되었습니다! 마이페이지에서 확인하세요.');
    window.location.reload();
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>장바구니</h2>
      {cartItems.length === 0 ? (
        <p>장바구니가 비어있습니다.</p>
      ) : (
        <ul>
          {cartItems.map((item, index) => (
            <li key={index} style={{ marginBottom: '1rem' }}>
              <strong>{item.name}</strong> - ₩{(item.price * quantities[index]).toLocaleString()}<br />
              수량: 
              <button onClick={() => decreaseQuantity(index)} style={{ margin: '0 6px' }}>-</button>
              {quantities[index]}
              <button onClick={() => increaseQuantity(index)} style={{ margin: '0 6px' }}>+</button>
              <button onClick={() => removeFromCart(index)} style={{ marginLeft: '1rem' }}>🗑 삭제</button>
            </li>
          ))}
        </ul>
      )}
      {cartItems.length > 0 && (
        <button onClick={handlePurchase} style={{ marginTop: '1rem' }}>
          🛍 구매하기
        </button>
      )}
    </div>
  );
}

export default Cart;
