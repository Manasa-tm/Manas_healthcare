import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { blogsDB } from '../../data/db';
import { ArrowLeft } from 'lucide-react';

export default function BlogDetailPage() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [others, setOthers] = useState([]);

  useEffect(() => {
    const b = blogsDB.getById(id);
    setBlog(b);
    setOthers(blogsDB.getAll().filter(x => x.id !== Number(id)).slice(0, 3));
  }, [id]);

  if (!blog) return <div style={{ padding:80, textAlign:'center', color:'#5A7464' }}>Blog not found.</div>;

  return (
    <div className="fade-in">
      <div style={{ background:'linear-gradient(135deg,#1B4332,#2D6A4F)', color:'white', padding:'60px 0 40px' }}>
        <div className="container">
          <Link to="/blogs" style={{ color:'rgba(255,255,255,0.75)', display:'flex', alignItems:'center', gap:6, fontSize:14, marginBottom:20 }}>
            <ArrowLeft size={14} /> Back to Blogs
          </Link>
          <span style={{ fontSize:12, fontWeight:700, letterSpacing:2, color:'#74C69D', textTransform:'uppercase' }}>{blog.category}</span>
          <h1 style={{ fontFamily:'Playfair Display', fontSize:'2.2rem', marginTop:8, marginBottom:16 }}>{blog.title}</h1>
          <div style={{ fontSize:14, opacity:0.75 }}>Published {blog.date} · Manas Healthcare Team</div>
        </div>
      </div>

      <section style={{ padding:'56px 0', background:'white' }}>
        <div className="container" style={{ display:'grid', gridTemplateColumns:'1fr 300px', gap:48 }}>
          <article>
            <p style={{ fontSize:'1.05rem', color:'#5A7464', lineHeight:1.8, marginBottom:32, fontStyle:'italic', borderLeft:'3px solid #52B788', paddingLeft:16 }}>{blog.summary}</p>

            {blog.content
              ? blog.content.split('\n\n').map((para, i) => {
                  const trimmed = para.trim();
                  if (!trimmed) return null;
                  // Section headings: short lines ending without punctuation
                  const isHeading = trimmed.length < 80 && !trimmed.endsWith('.') && !trimmed.endsWith(',') && i !== 0;
                  return isHeading
                    ? <h3 key={i} style={{ fontFamily:'Playfair Display', fontSize:'1.2rem', color:'#1B4332', margin:'28px 0 10px' }}>{trimmed}</h3>
                    : <p key={i} style={{ color:'#1A2B22', lineHeight:1.9, fontSize:15, marginBottom:18 }}>{trimmed}</p>;
                })
              : <p style={{ color:'#5A7464', lineHeight:1.9, fontSize:15 }}>Full article coming soon.</p>
            }
            <div style={{ marginTop:40, padding:24, background:'#EEF4F0', borderRadius:16 }}>
              <p style={{ fontSize:14, fontWeight:600, color:'#1B4332', marginBottom:8 }}>Need professional support?</p>
              <p style={{ fontSize:13, color:'#5A7464', marginBottom:16 }}>Reading is a great start. Speaking with a professional can make all the difference.</p>
              <Link to="/book-consultation" className="btn btn-primary btn-sm">Book a Session</Link>
            </div>
          </article>

          <aside>
            <div style={{ position:'sticky', top:90 }}>
              <h3 style={{ fontFamily:'inherit', fontSize:16, fontWeight:700, color:'#1B4332', marginBottom:16 }}>More Articles</h3>
              {others.map(o => (
                <Link key={o.id} to={`/blogs/${o.id}`} style={{ display:'block', marginBottom:16, padding:16, background:'#F8FAF9', borderRadius:12, textDecoration:'none', color:'inherit', transition:'background 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.background='#EEF4F0'}
                  onMouseLeave={e => e.currentTarget.style.background='#F8FAF9'}>
                  <div style={{ fontSize:11, color:'#2D6A4F', fontWeight:700, textTransform:'uppercase', letterSpacing:1, marginBottom:4 }}>{o.category}</div>
                  <div style={{ fontSize:13, fontWeight:600, color:'#1B4332', lineHeight:1.4 }}>{o.title}</div>
                </Link>
              ))}
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
