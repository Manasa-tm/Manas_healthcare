import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authDB } from '../../data/db';
import { Eye, EyeOff, Lock, User } from 'lucide-react';

export default function AdminLogin() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (authDB.isLoggedIn()) navigate('/admin/dashboard');
  }, [navigate]);

  const handleSubmit = e => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setTimeout(() => {
      const ok = authDB.login(form.username, form.password);
      if (ok) {
        navigate('/admin/dashboard');
      } else {
        setError('Invalid username or password. Try admin / manas@2024');
        setLoading(false);
      }
    }, 600);
  };

  return (
    <div style={{ minHeight:'100vh', background:'linear-gradient(135deg, #0D2B1A 0%, #1B4332 50%, #2D6A4F 100%)', display:'flex', alignItems:'center', justifyContent:'center', padding:24 }}>
      <div style={{ width:'100%', maxWidth:400 }}>
        {/* Logo */}
        <div style={{ textAlign:'center', marginBottom:40 }}>
          <div style={{ width:64, height:64, background:'rgba(255,255,255,0.15)', borderRadius:16, display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 16px', backdropFilter:'blur(10px)' }}>
            <span style={{ fontFamily:'Playfair Display', fontSize:28, fontWeight:700, color:'white' }}>M</span>
          </div>
          <h1 style={{ fontFamily:'Playfair Display', fontSize:'1.8rem', color:'white', marginBottom:6 }}>Manas Healthcare</h1>
          <p style={{ color:'rgba(255,255,255,0.6)', fontSize:14 }}>Admin Portal</p>
        </div>

        {/* Card */}
        <div style={{ background:'white', borderRadius:20, padding:36, boxShadow:'0 24px 60px rgba(0,0,0,0.3)' }}>
          <h2 style={{ fontFamily:'Playfair Display', fontSize:'1.4rem', color:'#1B4332', marginBottom:6 }}>Welcome Back</h2>
          <p style={{ color:'#5A7464', fontSize:13, marginBottom:28 }}>Sign in to access the admin dashboard.</p>

          {error && (
            <div style={{ background:'#FEE2E2', color:'#9B2C2C', padding:'12px 16px', borderRadius:8, fontSize:13, marginBottom:20, border:'1px solid #FECACA' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Username</label>
              <div style={{ position:'relative' }}>
                <User size={16} style={{ position:'absolute', left:12, top:'50%', transform:'translateY(-50%)', color:'#5A7464' }} />
                <input
                  value={form.username} onChange={e => setForm(p => ({ ...p, username: e.target.value }))}
                  required className="form-input" placeholder="admin" style={{ paddingLeft:38 }} />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <div style={{ position:'relative' }}>
                <Lock size={16} style={{ position:'absolute', left:12, top:'50%', transform:'translateY(-50%)', color:'#5A7464' }} />
                <input
                  type={showPass ? 'text' : 'password'}
                  value={form.password} onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
                  required className="form-input" placeholder="••••••••" style={{ paddingLeft:38, paddingRight:38 }} />
                <button type="button" onClick={() => setShowPass(!showPass)} style={{ position:'absolute', right:12, top:'50%', transform:'translateY(-50%)', background:'none', color:'#5A7464' }}>
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn btn-primary" style={{ width:'100%', justifyContent:'center', fontSize:15, padding:'13px 24px', marginTop:8 }}>
              {loading ? 'Signing in...' : 'Sign In →'}
            </button>
          </form>

          <div style={{ marginTop:20, padding:14, background:'#F8FAF9', borderRadius:10, fontSize:12, color:'#5A7464', textAlign:'center', lineHeight:1.8 }}>
            Default credentials:<br />
            <strong style={{ color:'#1B4332' }}>Username:</strong> admin &nbsp;|&nbsp; <strong style={{ color:'#1B4332' }}>Password:</strong> manas@2024
          </div>
        </div>

        <p style={{ textAlign:'center', marginTop:24, color:'rgba(255,255,255,0.5)', fontSize:12 }}>
          © 2026 Manas Healthcare. All rights reserved.
        </p>
      </div>
    </div>
  );
}
