import React, { useState, useEffect, useRef } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Phone, ChevronDown, Heart } from 'lucide-react';
import logo from "../../assets/manashealthlogo.png";

const NAV_ITEMS = [
  { label: 'Home', path: '/' },
  {
    label: 'Who We Are', dropdown: true,
    items: [
      { label: 'About Us', path: '/about' },
      { label: 'Our Team', path: '/our-team' },
    ]
  },
  {
    label: 'Find Help', dropdown: true,
    items: [
      { label: 'Anxiety & Stress', path: '/find-help#anxiety' },
      { label: 'Mood & Emotions', path: '/find-help#mood' },
      { label: 'Trauma & Abuse', path: '/find-help#trauma' },
      { label: 'Child & Adolescents', path: '/find-help#child' },
      { label: 'Relationships', path: '/find-help#relationships' },
      { label: 'Self-Harm', path: '/find-help#selfharm' },
    ]
  },
  {
    label: 'Programs', dropdown: true,
    items: [
      { label: 'Stay Well', path: '/programs#stay-well' },
      { label: 'Corporate', path: '/programs#corporate' },
    ]
  },
  {
    label: 'Learn', dropdown: true,
    items: [
      { label: 'Blogs', path: '/blogs' },
      { label: 'FAQs', path: '/faqs' },
    ]
  },
];

function Dropdown({ item, isOpen, onToggle, onClose }) {
  const ref = useRef();
  useEffect(() => {
    function handler(e) { if (ref.current && !ref.current.contains(e.target)) onClose(); }
    if (isOpen) document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [isOpen, onClose]);

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button onClick={onToggle} style={{ display:'flex', alignItems:'center', gap:4, background:'none', color:'inherit', fontSize:14, fontWeight:500, padding:'8px 4px', cursor:'pointer', whiteSpace:'nowrap' }}>
        {item.label} <ChevronDown size={14} style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition:'0.2s' }} />
      </button>
      {isOpen && (
        <div style={{ position:'absolute', top:'calc(100% + 8px)', left:0, background:'white', borderRadius:12, boxShadow:'0 8px 40px rgba(0,0,0,0.12)', minWidth:200, padding:'8px 0', zIndex:1000, border:'1px solid #E8F0EB' }}>
          {item.items.map(sub => (
            <Link key={sub.path} to={sub.path} onClick={onClose} style={{ display:'block', padding:'10px 20px', fontSize:14, color:'#1A2B22', transition:'background 0.15s' }}
              onMouseEnter={e => e.target.style.background='#F0F7F2'}
              onMouseLeave={e => e.target.style.background='transparent'}>
              {sub.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default function PublicLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => { setMenuOpen(false); setOpenDropdown(null); }, [location]);

  return (
    <div style={{ minHeight:'100vh', display:'flex', flexDirection:'column' }}>
      {/* TOP BAR */}
      <div style={{ background:'#1B4332', color:'white', fontSize:13, padding:'6px 0' }}>
        <div className="container" style={{ display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:8 }}>
          <span style={{ display:'flex', alignItems:'center', gap:6 }}><Heart size={13} fill="currentColor" /> Your mental health matters — reach out today</span>
          <span style={{ display:'flex', alignItems:'center', gap:16 }}>
            <a href="tel:+919876543200" style={{ color:'white', display:'flex', alignItems:'center', gap:5 }}><Phone size={13} /> +91 98765 43200</a>
          </span>
        </div>
      </div>

      {/* HEADER */}
      <header style={{ background:'white', position:'sticky', top:0, zIndex:100, boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,0.08)' : '0 1px 0 #E8F0EB', transition:'box-shadow 0.3s' }}>
        <div className="container" style={{ display:'flex', alignItems:'center', justifyContent:'space-between', height:70 }}>
          {/* LOGO */}
          <Link to="/" style={{ display:'flex', alignItems:'center', gap:10, textDecoration:'none' }}>
            <div
  style={{
    width: 50,
    height: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }}
>
  <img
    src={logo}
    alt="Manas Healthcare Logo"
    style={{
      width: '100%',
      height: '100%',
      objectFit: 'contain'
    }}
  />
</div>
            <div>
              <div style={{ fontFamily:'Playfair Display', fontSize:18, fontWeight:700, color:'#1B4332', lineHeight:1.1 }}>Manas</div>
              <div style={{ fontSize:10, color:'#5A7464', letterSpacing:1.5, textTransform:'uppercase', fontWeight:600 }}>Healthcare</div>
            </div>
          </Link>

          {/* NAV */}
          <nav style={{ display:'flex', alignItems:'center', gap:4 }} className="desktop-nav">
            {NAV_ITEMS.map((item, i) =>
              item.dropdown ? (
                <Dropdown key={i} item={item} isOpen={openDropdown === i}
                  onToggle={() => setOpenDropdown(openDropdown === i ? null : i)}
                  onClose={() => setOpenDropdown(null)} />
              ) : (
                <Link key={i} to={item.path} style={{ fontSize:14, fontWeight:500, color:'#1A2B22', padding:'8px 12px', borderRadius:6, display:'block',
                  background: location.pathname === item.path ? '#EEF4F0' : 'transparent' }}>
                  {item.label}
                </Link>
              )
            )}
          </nav>

          {/* CTA */}
          <div style={{ display:'flex', alignItems:'center', gap:12 }}>
            <Link to="/contact" className="btn btn-outline btn-sm" style={{ display:'flex' }}>Contact Us</Link>
            <Link to="/admin/login" className="btn btn-primary btn-sm" style={{ display:'flex' }}>Admin Dashboard</Link>
            <button onClick={() => setMenuOpen(!menuOpen)} style={{ display:'none', background:'none', color:'#1A2B22' }} className="mobile-menu-btn">
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        {menuOpen && (
          <div style={{ background:'white', borderTop:'1px solid #E8F0EB', padding:'16px 0' }}>
            <div className="container">
              {NAV_ITEMS.map((item, i) => (
                <div key={i}>
                  {item.dropdown ? (
                    <>
                      <div style={{ padding:'10px 0', fontWeight:600, color:'#5A7464', fontSize:13, textTransform:'uppercase', letterSpacing:1 }}>{item.label}</div>
                      {item.items.map(sub => <Link key={sub.path} to={sub.path} style={{ display:'block', padding:'8px 16px', fontSize:14, color:'#1A2B22' }}>{sub.label}</Link>)}
                    </>
                  ) : (
                    <Link to={item.path} style={{ display:'block', padding:'10px 0', fontSize:15, fontWeight:500, color:'#1A2B22' }}>{item.label}</Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* PAGE CONTENT */}
      <main style={{ flex:1 }}>
        <Outlet />
      </main>

      {/* FOOTER */}
      <footer style={{ background:'#1B4332', color:'white', paddingTop:64, paddingBottom:32 }}>
        <div className="container">
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(200px, 1fr))', gap:40, marginBottom:48 }}>
            <div>
              <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:16 }}>
                <div style={{ width:36, height:36, background:'rgba(255,255,255,0.15)', borderRadius:8, display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <img
                      src={logo}
                      alt="Manas Healthcare Logo"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain'
                      }}
                    />
                </div>
                <div>
                  <div style={{ fontFamily:'Playfair Display', fontSize:16, fontWeight:700 }}>Manas Healthcare</div>
                  <div style={{ fontSize:10, opacity:0.7, letterSpacing:1.5, textTransform:'uppercase' }}>Mental Wellbeing</div>
                </div>
              </div>
              <p style={{ fontSize:14, opacity:0.75, lineHeight:1.7, maxWidth:260 }}>Evidence-based mental healthcare for individuals, families, and organizations.</p>
              <div style={{ marginTop:20, display:'flex', gap:12 }}>
                {['f','in','tw'].map(s => <a key={s} href="#" style={{ width:32, height:32, background:'rgba(255,255,255,0.1)', borderRadius:6, display:'flex', alignItems:'center', justifyContent:'center', color:'white', fontSize:12, fontWeight:600 }}>{s}</a>)}
              </div>
            </div>
            <div>
              <div style={{ fontWeight:700, marginBottom:16, fontSize:14, textTransform:'uppercase', letterSpacing:1, opacity:0.9 }}>Quick Links</div>
              {[['Home','/'],['About Us','/about'],['Our Team','/our-team'],['Find Help','/find-help'],['Blogs','/blogs'],['FAQs','/faqs']].map(([l,p]) =>
                <Link key={p} to={p} style={{ display:'block', fontSize:14, opacity:0.75, marginBottom:10, transition:'opacity 0.2s' }}
                  onMouseEnter={e=>e.target.style.opacity=1} onMouseLeave={e=>e.target.style.opacity=0.75}>{l}</Link>
              )}
            </div>
            <div>
              <div style={{ fontWeight:700, marginBottom:16, fontSize:14, textTransform:'uppercase', letterSpacing:1, opacity:0.9 }}>Services</div>
              {['Individual Therapy','Couples Counselling','Child & Teen Therapy','Corporate Programs','Online Sessions','Psychiatric Care'].map(s =>
                <div key={s} style={{ fontSize:14, opacity:0.75, marginBottom:10 }}>{s}</div>
              )}
            </div>
            <div>
              <div style={{ fontWeight:700, marginBottom:16, fontSize:14, textTransform:'uppercase', letterSpacing:1, opacity:0.9 }}>Contact</div>
              <div style={{ fontSize:14, opacity:0.75, lineHeight:1.8 }}>
                <div>📍 Bengaluru, Karnataka</div>
                <div style={{ marginTop:8 }}>📞 +91 98765 43200</div>
                <div style={{ marginTop:8 }}>✉️ care@manashealthcare.in</div>
                <div style={{ marginTop:16, background:'rgba(255,255,255,0.1)', borderRadius:8, padding:'12px 16px' }}>
                  <div style={{ fontSize:13, fontWeight:600, marginBottom:8 }}>Emergency Support</div>
                  <div style={{ fontSize:13, opacity:0.9 }}>Call: 9152987821</div>
                  <div style={{ fontSize:13, opacity:0.9 }}>Manas Foundation: 1860-2662-345</div>
                </div>
              </div>
            </div>
          </div>
          <div style={{ borderTop:'1px solid rgba(255,255,255,0.15)', paddingTop:24, display:'flex', justifyContent:'space-between', flexWrap:'wrap', gap:8, fontSize:13, opacity:0.6 }}>
            <span>© 2026 Manas Healthcare. All rights reserved.</span>
            <span>Privacy Policy · Terms of Service</span>
          </div>
        </div>
      </footer>

      <style>{`
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </div>
  );
}
