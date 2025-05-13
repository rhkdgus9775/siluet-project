// Login.tsx : 로그인 폼
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const matched = users.find((u: any) => u.email === email && u.password === password);

    if (!matched) {
      alert('이메일 또는 비밀번호가 일치하지 않습니다.');
      return;
    }

    localStorage.setItem('user', JSON.stringify(matched));
    alert('로그인 성공!');
    navigate('/');
    window.location.reload();
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>로그인</h2>
      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px' }}>
        <input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">로그인</button>
      </form>

      <p style={{ marginTop: '1rem' }}>
        계정이 없으신가요?{' '}
        <span style={{ color: 'blue', cursor: 'pointer' }} onClick={() => navigate('/register')}>
          회원가입
        </span>
      </p>
    </div>
  );
}

export default Login;
