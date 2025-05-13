// src/pages/Register.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', email: '', password: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const exists = users.find((u: any) => u.email === form.email);
    if (exists) return alert('이미 존재하는 이메일입니다.');

    const newUser = { ...form, orders: [] };
    localStorage.setItem('users', JSON.stringify([...users, newUser]));
    alert('회원가입 완료!');
    navigate('/login');
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>회원가입</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: 400 }}>
        <input name="username" placeholder="이름" value={form.username} onChange={handleChange} required />
        <input name="email" placeholder="이메일" value={form.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="비밀번호" value={form.password} onChange={handleChange} required />
        <button type="submit">회원가입</button>
      </form>
    </div>
  );
}

export default Register;
