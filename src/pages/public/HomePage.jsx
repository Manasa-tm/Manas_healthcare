import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Users, Calendar, Heart, Shield, Brain, Smile, ChevronDown } from 'lucide-react';
import { doctorsDB, blogsDB } from '../../data/db';

const CONCERNS = [
  { icon: '😟', label: 'Anxiety & Stress', path: '/find-help#anxiety' },
  { icon: '😔', label: 'Mood & Depression', path: '/find-help#mood' },
  { icon: '💔', label: 'Trauma & Abuse', path: '/find-help#trauma' },
  { icon: '👨‍👩‍👧', label: 'Relationships', path: '/find-help#relationships' },
  { icon: '🧒', label: 'Children & Teens', path: '/find-help#child' },
  { icon: '🏢', label: 'Work & Burnout', path: '/find-help#work' },
  { icon: '😴', label: 'Sleep Disorders', path: '/find-help#sleep' },
  { icon: '🌿', label: 'Self-Growth', path: '/find-help#growth' },
];

const THERAPIES = [
  { name: 'Cognitive Behaviour Therapy', abbr: 'CBT', color: '#EEF4F0' },
  { name: 'Dialectical Behaviour Therapy', abbr: 'DBT', color: '#FEF3C7' },
  { name: 'EMDR Therapy', abbr: 'EMDR', color: '#EDE9FE' },
  { name: 'Mindfulness-Based Therapy', abbr: 'MBT', color: '#FEE2E2' },
  { name: 'Family & Couples Therapy', abbr: 'FCT', color: '#DBEAFE' },
  { name: 'Psychiatry & Medication', abbr: 'PSY', color: '#D1FAE5' },
];

const STATS = [
  { value: '500+', label: 'Patients Helped', icon: Users },
  { value: '10,000+', label: 'Sessions Completed', icon: Calendar },
  { value: '5+', label: 'Expert Therapists', icon: Heart },
  { value: '4.9★', label: 'Patient Rating', icon: Star },
];

const WHY = [
  { icon: Shield, title: 'Confidential & Safe', desc: 'Everything you share stays between you and your therapist. We follow strict ethical guidelines.' },
  { icon: Brain, title: 'Evidence-Based Care', desc: 'Our therapists use scientifically validated approaches tailored to your unique needs.' },
  { icon: Smile, title: 'Compassionate Team', desc: 'Warm, non-judgemental professionals who genuinely care about your progress.' },
  { icon: Calendar, title: 'Flexible Scheduling', desc: 'Book online or in-person sessions that fit your lifestyle and availability.' },
];

export default function HomePage() {
  const [doctors, setDoctors] = useState([]);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    setDoctors(doctorsDB.getAll().filter(d => d.status === 1).slice(0, 3));
    setBlogs(blogsDB.getAll().slice(0, 3));
  }, []);

  return (
    <div className="fade-in">
      {/* HERO */}
      <section style={{ background:'linear-gradient(135deg, #0D2B1A 0%, #1B4332 45%, #2D6A4F 100%)', color:'white', padding:'100px 0 80px', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', top:0, right:0, width:'45%', height:'100%', background:'rgba(82,183,136,0.08)', clipPath:'polygon(20% 0%, 100% 0%, 100% 100%, 0% 100%)' }}></div>
        <div style={{ position:'absolute', bottom:-40, left:-40, width:200, height:200, borderRadius:'50%', background:'rgba(82,183,136,0.06)' }}></div>
        <div className="container" style={{ position:'relative' }}>
          <div style={{ maxWidth:640 }}>
            <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:'rgba(116,198,157,0.2)', border:'1px solid rgba(116,198,157,0.3)', borderRadius:20, padding:'6px 16px', fontSize:13, marginBottom:24, color:'#74C69D' }}>
              <Heart size={13} fill="currentColor" /> Mental Health Care You Can Trust
            </div>
            <h1 style={{ fontFamily:'Playfair Display', fontSize:'3.2rem', fontWeight:700, lineHeight:1.15, marginBottom:24 }}>
              Healing Minds,<br />
              <span style={{ color:'#74C69D' }}>Restoring Lives</span>
            </h1>
            <p style={{ fontSize:'1.15rem', opacity:0.85, lineHeight:1.7, marginBottom:36, maxWidth:520 }}>
              Professional, confidential mental health support. Whether you're navigating anxiety, depression, trauma, or simply seeking to grow — Manas Healthcare is here for you.
            </p>
            <div style={{ display:'flex', gap:16, flexWrap:'wrap' }}>
              <Link to="/book-consultation" className="btn btn-gold btn-lg">
                Book Consultation <ArrowRight size={16} />
              </Link>
              <Link to="/find-help" className="btn btn-lg" style={{ background:'rgba(255,255,255,0.12)', color:'white', border:'1.5px solid rgba(255,255,255,0.25)' }}>
                Find Help <ChevronDown size={16} />
              </Link>
            </div>
            <div style={{ marginTop:40, display:'flex', gap:32, flexWrap:'wrap' }}>
              {['Confidential', 'Online & In-Person', 'Insurance Accepted'].map(t => (
                <div key={t} style={{ display:'flex', alignItems:'center', gap:6, fontSize:14, opacity:0.8 }}>
                  <span style={{ color:'#74C69D', fontSize:16 }}>✓</span> {t}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section style={{ background:'white', padding:'40px 0', borderBottom:'1px solid #E8F0EB' }}>
        <div className="container">
          <div className="grid-4">
            {STATS.map(({ value, label, icon: Icon }) => (
              <div key={label} style={{ textAlign:'center', padding:'16px 0' }}>
                <div style={{ display:'flex', justifyContent:'center', marginBottom:8 }}>
                  <div style={{ width:44, height:44, background:'#EEF4F0', borderRadius:10, display:'flex', alignItems:'center', justifyContent:'center' }}>
                    <Icon size={20} color="#2D6A4F" />
                  </div>
                </div>
                <div style={{ fontFamily:'Playfair Display', fontSize:'1.8rem', fontWeight:700, color:'#1B4332' }}>{value}</div>
                <div style={{ fontSize:13, color:'#5A7464', marginTop:2 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONCERNS */}
      <section className="section" style={{ background:'#F8FAF9' }}>
        <div className="container">
          <div className="text-center" style={{ marginBottom:48 }}>
            <div style={{ fontSize:12, fontWeight:700, letterSpacing:2, color:'#2D6A4F', textTransform:'uppercase', marginBottom:10 }}>What We Help With</div>
            <h2 style={{ fontSize:'2rem', color:'#1B4332', marginBottom:12 }}>Find Help For What You're Going Through</h2>
            <p style={{ color:'#5A7464', maxWidth:520, margin:'0 auto' }}>Whatever you're facing, you don't have to face it alone. Explore areas where our team can support you.</p>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(140px, 1fr))', gap:16 }}>
            {CONCERNS.map(c => (
              <Link key={c.label} to={c.path} style={{ background:'white', borderRadius:12, padding:'20px 16px', textAlign:'center', boxShadow:'0 2px 12px rgba(0,0,0,0.06)', transition:'all 0.2s', textDecoration:'none', color:'inherit', display:'block', border:'1.5px solid transparent' }}
                onMouseEnter={e => { e.currentTarget.style.transform='translateY(-4px)'; e.currentTarget.style.boxShadow='0 8px 24px rgba(45,106,79,0.15)'; e.currentTarget.style.borderColor='#52B788'; }}
                onMouseLeave={e => { e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='0 2px 12px rgba(0,0,0,0.06)'; e.currentTarget.style.borderColor='transparent'; }}>
                <div style={{ fontSize:32, marginBottom:10 }}>{c.icon}</div>
                <div style={{ fontSize:13, fontWeight:600, color:'#1A2B22', lineHeight:1.3 }}>{c.label}</div>
              </Link>
            ))}
          </div>
          <div className="text-center" style={{ marginTop:32 }}>
            <Link to="/find-help" className="btn btn-outline">Explore All Concerns <ArrowRight size={14} /></Link>
          </div>
        </div>
      </section>

      {/* THERAPIES */}
      <section className="section" style={{ background:'white' }}>
        <div className="container">
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:64, alignItems:'center' }}>
            <div>
              <div style={{ fontSize:12, fontWeight:700, letterSpacing:2, color:'#2D6A4F', textTransform:'uppercase', marginBottom:10 }}>Our Approach</div>
              <h2 style={{ fontSize:'2rem', color:'#1B4332', marginBottom:16 }}>Evidence-Based Therapies That Work</h2>
              <p style={{ color:'#5A7464', lineHeight:1.8, marginBottom:28 }}>
                At Manas Healthcare, we draw on the latest research to provide therapies that create lasting change. Our therapists are trained in multiple modalities so they can offer the right approach for your situation.
              </p>
              <Link to="/find-help" className="btn btn-primary">Learn About Therapies <ArrowRight size={14} /></Link>
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
              {THERAPIES.map(t => (
                <div key={t.abbr} style={{ background:t.color, borderRadius:10, padding:'16px 20px', transition:'transform 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.transform='scale(1.02)'}
                  onMouseLeave={e => e.currentTarget.style.transform='none'}>
                  <div style={{ fontWeight:700, fontSize:16, color:'#1B4332', marginBottom:4 }}>{t.abbr}</div>
                  <div style={{ fontSize:12, color:'#5A7464', lineHeight:1.4 }}>{t.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* OUR TEAM PREVIEW */}
      {doctors.length > 0 && (
        <section className="section" style={{ background:'#F8FAF9' }}>
          <div className="container">
            <div className="text-center" style={{ marginBottom:40 }}>
              <div style={{ fontSize:12, fontWeight:700, letterSpacing:2, color:'#2D6A4F', textTransform:'uppercase', marginBottom:10 }}>Meet the Team</div>
              <h2 style={{ fontSize:'2rem', color:'#1B4332', marginBottom:12 }}>Experienced, Compassionate Professionals</h2>
            </div>
            <div className="grid-3">
              {doctors.map(doc => (
                <div key={doc.id} style={{ background:'white', borderRadius:16, overflow:'hidden', boxShadow:'0 2px 16px rgba(0,0,0,0.08)', transition:'transform 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.transform='translateY(-4px)'}
                  onMouseLeave={e => e.currentTarget.style.transform='none'}>
                  <div style={{ height:180, background:'linear-gradient(135deg,#EEF4F0,#D1FAE5)', overflow:'hidden', display:'flex', alignItems:'center', justifyContent:'center' }}>
                    {doc.image
                      ? <img src={doc.image} alt={doc.firstName} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                      : <span style={{ fontSize:64 }}>👩‍⚕️</span>
                    }
                  </div>
                  <div style={{ padding:20 }}>
                    <div style={{ fontWeight:700, fontSize:16, color:'#1B4332', marginBottom:4 }}>{doc.firstName} {doc.lastName}</div>
                    <div style={{ fontSize:13, color:'#5A7464', marginBottom:8 }}>{doc.specialization}</div>
                    <div style={{ fontSize:12, color:'#2D6A4F', fontWeight:600 }}>{doc.experience} yrs experience · {doc.location}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center" style={{ marginTop:32 }}>
              <Link to="/our-team" className="btn btn-outline">Meet Our Full Team <ArrowRight size={14} /></Link>
            </div>
          </div>
        </section>
      )}

      {/* WHY MANAS */}
      <section className="section" style={{ background:'white' }}>
        <div className="container">
          <div className="text-center" style={{ marginBottom:48 }}>
            <div style={{ fontSize:12, fontWeight:700, letterSpacing:2, color:'#2D6A4F', textTransform:'uppercase', marginBottom:10 }}>Why Choose Us</div>
            <h2 style={{ fontSize:'2rem', color:'#1B4332' }}>Care That Goes Beyond the Session</h2>
          </div>
          <div className="grid-4">
            {WHY.map(({ icon: Icon, title, desc }) => (
              <div key={title} style={{ textAlign:'center', padding:24, borderRadius:16, border:'1.5px solid #E8F0EB', transition:'all 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow='0 8px 32px rgba(45,106,79,0.12)'; e.currentTarget.style.borderColor='#52B788'; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow='none'; e.currentTarget.style.borderColor='#E8F0EB'; }}>
                <div style={{ width:56, height:56, background:'linear-gradient(135deg,#EEF4F0,#D1FAE5)', borderRadius:14, display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 16px' }}>
                  <Icon size={24} color="#2D6A4F" />
                </div>
                <h3 style={{ fontFamily:'inherit', fontSize:16, fontWeight:700, color:'#1B4332', marginBottom:8 }}>{title}</h3>
                <p style={{ fontSize:13, color:'#5A7464', lineHeight:1.7 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BLOG PREVIEW */}
      {blogs.length > 0 && (
        <section className="section" style={{ background:'#F8FAF9' }}>
          <div className="container">
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:40, flexWrap:'wrap', gap:16 }}>
              <div>
                <div style={{ fontSize:12, fontWeight:700, letterSpacing:2, color:'#2D6A4F', textTransform:'uppercase', marginBottom:8 }}>Resources</div>
                <h2 style={{ fontSize:'2rem', color:'#1B4332' }}>From Our Mental Health Blog</h2>
              </div>
              <Link to="/blogs" className="btn btn-outline btn-sm">All Articles <ArrowRight size={13} /></Link>
            </div>
            <div className="grid-3">
              {blogs.map(b => (
                <Link key={b.id} to={`/blogs/${b.id}`} style={{ background:'white', borderRadius:16, overflow:'hidden', boxShadow:'0 2px 12px rgba(0,0,0,0.06)', textDecoration:'none', color:'inherit', display:'block', transition:'transform 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.transform='translateY(-4px)'}
                  onMouseLeave={e => e.currentTarget.style.transform='none'}>
                  <div style={{ height:140, background:'linear-gradient(135deg,#2D6A4F,#52B788)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:40 }}>📖</div>
                  <div style={{ padding:20 }}>
                    <span style={{ fontSize:11, fontWeight:700, color:'#2D6A4F', textTransform:'uppercase', letterSpacing:1 }}>{b.category}</span>
                    <h3 style={{ fontFamily:'Playfair Display', fontSize:16, color:'#1B4332', margin:'8px 0', lineHeight:1.4 }}>{b.title}</h3>
                    <p style={{ fontSize:13, color:'#5A7464', lineHeight:1.6 }}>{b.summary.slice(0,100)}...</p>
                    <div style={{ marginTop:12, fontSize:12, color:'#2D6A4F', fontWeight:600 }}>Read More →</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA BANNER */}
      <section style={{ background:'linear-gradient(135deg,#1B4332,#2D6A4F)', color:'white', padding:'64px 0' }}>
        <div className="container text-center">
          <h2 style={{ fontSize:'2.2rem', marginBottom:16 }}>Ready to Take the First Step?</h2>
          <p style={{ opacity:0.85, fontSize:'1.05rem', maxWidth:480, margin:'0 auto 32px' }}>
            Reaching out takes courage. Our compassionate team is ready to support your journey toward better mental health.
          </p>
          <div style={{ display:'flex', gap:16, justifyContent:'center', flexWrap:'wrap' }}>
            <Link to="/book-consultation" className="btn btn-gold btn-lg">Book a Free Consultation</Link>
            <Link to="/contact" className="btn btn-lg" style={{ background:'rgba(255,255,255,0.12)', color:'white', border:'1.5px solid rgba(255,255,255,0.3)' }}>Talk to Us</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
