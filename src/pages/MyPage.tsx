// MyPage.tsx : 마이페이지/주문내역/로그아웃/회원탈퇴
import { useNavigate } from 'react-router-dom';

function MyPage() {
  const navigate = useNavigate();
  const stored = localStorage.getItem('user');
  const user = stored ? JSON.parse(stored) : null;

  const handleLogout = () => {
    localStorage.removeItem('user');
    alert('로그아웃 되었습니다!');
    navigate('/');
    window.location.reload();
  };

  const handleDeleteAccount = () => {
    const allUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const updatedUsers = allUsers.filter((u: any) => u.email !== user.email);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    localStorage.removeItem('user');
    alert('회원 탈퇴가 완료되었습니다.');
    navigate('/');
    window.location.reload();
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>마이페이지</h2>
      <p><strong>이름:</strong> {user?.username}</p>
      <p><strong>이메일:</strong> {user?.email}</p>

      <h3 style={{ marginTop: '2rem' }}>🧾 주문 내역</h3>
      {user?.orders && user.orders.length > 0 ? (
        <ul>
          {user.orders.map((order: any) => (
            <li key={order.id}>
              {order.name} - ₩{order.price.toLocaleString()} ({order.date})
            </li>
          ))}
        </ul>
      ) : (
        <p>주문 내역이 없습니다.</p>
      )}

      <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
        <button onClick={handleLogout}>로그아웃</button>
        <button onClick={handleDeleteAccount} style={{ color: 'red' }}>회원 탈퇴</button>
      </div>
    </div>
  );
}

export default MyPage;
