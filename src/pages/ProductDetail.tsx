// ProductDetail.tsx : 상품 상세/리뷰 폼+리뷰 목록
import { useParams } from 'react-router-dom';
import ReviewForm from '../components/ReviewForm';
import ReviewList from '../components/ReviewList';
import { useState } from 'react';

interface ProductDetailProps {
  addToCart: (item: any) => void;
}

const products = [
  { id: 1, name: '샘플 상품 1', price: 10000, category: 'TOP', imageUrl: 'https://via.placeholder.com/300x400?text=Item+1' },
  { id: 2, name: '샘플 상품 2', price: 20000, category: 'OUTER', imageUrl: 'https://via.placeholder.com/300x400?text=Item+2' },
  { id: 3, name: '샘플 상품 3', price: 15000, category: 'PANTS', imageUrl: 'https://via.placeholder.com/300x400?text=Item+3' },
  { id: 4, name: '샘플 상품 4', price: 25000, category: 'ACC', imageUrl: 'https://via.placeholder.com/300x400?text=Item+4' },
];

function ProductDetail({ addToCart }: ProductDetailProps) {
  const { id } = useParams();
  const [refresh, setRefresh] = useState(false);

  const product = products.find((p) => p.id === Number(id));

  if (!product) return <p>상품을 찾을 수 없습니다.</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h2>{product.name}</h2>
      <img src={product.imageUrl} alt={product.name} style={{ width: 300, height: 400 }} />
      <p>₩{product.price.toLocaleString()}</p>
      <button onClick={() => addToCart(product)}>장바구니 담기</button>
      <ReviewForm productId={product.id} onReviewSubmit={() => setRefresh(!refresh)} />
      <ReviewList productId={product.id} refresh={refresh} />
    </div>
  );
}

export default ProductDetail;
