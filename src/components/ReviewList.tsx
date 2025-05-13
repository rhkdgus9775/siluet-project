// ReviewList.tsx : 상품별 리뷰 목록
interface ReviewListProps {
  productId: number;
  refresh: boolean; // 리뷰 추가 후 새로고침용
}

function ReviewList({ productId, refresh }: ReviewListProps) {
  const reviews = JSON.parse(localStorage.getItem('reviews') || '[]');
  const filtered = reviews.filter((r: any) => r.productId === productId);

  if (filtered.length === 0) return <p>리뷰가 아직 없습니다.</p>;

  return (
    <div style={{ marginTop: '2rem' }}>
      <h3>리뷰</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {filtered.map((r: any) => (
          <li key={r.id} style={{ marginBottom: '1rem', borderBottom: '1px solid #ccc', paddingBottom: '1rem' }}>
            <strong>{r.username}</strong> - ⭐ {r.rating}점 ({r.date})
            <p>{r.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ReviewList;
