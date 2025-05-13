import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  // 임시 상품 목록 (실제로는 props 또는 API로 받아야 함)
  const dummyProducts = [
    { id: 1, name: '샘플 상품 1', price: 10000, category: 'TOP', imageUrl: 'https://via.placeholder.com/300x400?text=Item+1' },
    { id: 2, name: '샘플 상품 2', price: 20000, category: 'OUTER', imageUrl: 'https://via.placeholder.com/300x400?text=Item+2' },
    { id: 3, name: '샘플 상품 3', price: 15000, category: 'PANTS', imageUrl: 'https://via.placeholder.com/300x400?text=Item+3' },
    { id: 4, name: '샘플 상품 4', price: 25000, category: 'ACC', imageUrl: 'https://via.placeholder.com/300x400?text=Item+4' },
  ];

  const selectedProduct = dummyProducts.find(p => p.id === Number(id));

  const [form, setForm] = useState({
    name: '',
    price: '',
    category: '',
    imageUrl: ''
  });

  useEffect(() => {
    if (selectedProduct) {
      setForm({
        name: selectedProduct.name,
        price: String(selectedProduct.price),
        category: selectedProduct.category,
        imageUrl: selectedProduct.imageUrl
      });
    }
  }, [selectedProduct]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 실제로는 백엔드에 PATCH 요청 예정
    alert(`상품 ID ${id} 수정 완료 (데이터 전송 준비 완료)\n이름: ${form.name}, 가격: ${form.price}`);
    navigate('/');
  };

  if (!selectedProduct) {
    return <p>해당 상품을 찾을 수 없습니다.</p>;
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h2>상품 수정</h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: 400, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="상품명"
          required
        />
        <input
          type="number"
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="가격"
          required
        />
        <select name="category" value={form.category} onChange={handleChange} required>
          <option value="">카테고리 선택</option>
          <option value="TOP">TOP</option>
          <option value="OUTER">OUTER</option>
          <option value="PANTS">PANTS</option>
          <option value="ACC">ACC</option>
        </select>
        <input
          type="text"
          name="imageUrl"
          value={form.imageUrl}
          onChange={handleChange}
          placeholder="이미지 URL"
          required
        />
        <button type="submit">수정 완료</button>
      </form>
    </div>
  );
}

export default EditProduct;
