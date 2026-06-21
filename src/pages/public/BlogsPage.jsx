import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { blogsDB } from '../../data/db';

export default function BlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [filter, setFilter] = useState('All');

  useEffect(() => { setBlogs(blogsDB.getAll()); }, []);

  const categories = ['All', ...new Set(blogs.map(b => b.category))];
  const filtered = filter === 'All' ? blogs : blogs.filter(b => b.category === filter);

  return (
    <div className="fade-in">
      <div className="page-hero">
        <div className="container">
          <h1>Mental Health Blog</h1>
          <p>Insights, guides, and research from our team of mental health professionals.</p>
        </div>
      </div>

      <section className="section" style={{ background:'white' }}>
        <div className="container">
          <div style={{ display:'flex', gap:10, flexWrap:'wrap', marginBottom:40 }}>
            {categories.map(c => (
              <button key={c} onClick={() => setFilter(c)} className="btn btn-sm" style={{
                background: filter === c ? '#2D6A4F' : '#F0F7F2', color: filter === c ? 'white' : '#2D6A4F', border:'none'
              }}>{c}</button>
            ))}
          </div>
          <div className="grid-3">
            {filtered.map(b => (
              <Link key={b.id} to={`/blogs/${b.id}`} style={{ background:'#F8FAF9', borderRadius:16, overflow:'hidden', textDecoration:'none', color:'inherit', display:'block', transition:'transform 0.2s', boxShadow:'0 2px 12px rgba(0,0,0,0.06)' }}
                onMouseEnter={e => e.currentTarget.style.transform='translateY(-4px)'}
                onMouseLeave={e => e.currentTarget.style.transform='none'}>
                <div style={{ height:160, background:'linear-gradient(135deg,#2D6A4F,#52B788)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:48 }}>📖</div>
                <div style={{ padding:20 }}>
                  <span style={{ fontSize:11, fontWeight:700, color:'#2D6A4F', textTransform:'uppercase', letterSpacing:1 }}>{b.category}</span>
                  <h3 style={{ fontFamily:'Playfair Display', fontSize:'1.05rem', color:'#1B4332', margin:'8px 0', lineHeight:1.4 }}>{b.title}</h3>
                  <p style={{ fontSize:13, color:'#5A7464', lineHeight:1.6 }}>{b.summary}</p>
                  <div style={{ marginTop:12, fontSize:12, color:'#5A7464' }}>📅 {b.date}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
