// ReviewForm.tsx : 리뷰 작성 (localStorage에 저장)
import { useState } from 'react';

interface ReviewFormProps {
  productId: number;
  onReviewSubmit: () => void;
}

function ReviewForm({ productId, onReviewSubmit }: ReviewFormProps) {
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(5);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const userStr = localStorage.getItem('user');
    if (!userStr) {
      alert('로그인이 필요합니다.');
      return;
    }

    const user = JSON.parse(userStr);

    const newReview = {
      id: Date.now(),
      productId,
      content,
      rating,
      username: user.username,
      date: new Date().toISOString().slice(0, 10),
    };

    const existing = JSON.parse(localStorage.getItem('reviews') || '[]');
    const updated = [...existing, newReview];
    localStorage.setItem('reviews', JSON.stringify(updated));

    setContent('');
    setRating(5);
    onReviewSubmit(); // 상위에서 새로고침 트리거
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '2rem' }}>
      <h3>리뷰 작성</h3>
      <textarea
        placeholder="리뷰를 작성하세요"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
        style={{ width: '100%', minHeight: '80px' }}
      />
      <div style={{ marginTop: '0.5rem' }}>
        <label>별점: </label>
        <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
          {[5, 4, 3, 2, 1].map((n) => (
            <option key={n} value={n}>
              {n}점
            </option>
          ))}
        </select>
      </div>
      <button type="submit" style={{ marginTop: '1rem' }}>리뷰 등록</button>
    </form>
  );
}

export default ReviewForm;
