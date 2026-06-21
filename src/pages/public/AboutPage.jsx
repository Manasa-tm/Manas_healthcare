import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Target, Eye, Heart } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="fade-in">
      <div className="page-hero">
        <div className="container">
          <h1>About Manas Healthcare</h1>
          <p>We believe mental health is as important as physical health. Our mission is to make quality mental care accessible, compassionate, and effective.</p>
        </div>
      </div>

      <section className="section" style={{ background:'white' }}>
        <div className="container">
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:64, alignItems:'center' }}>
            <div>
              <div style={{ fontSize:12, fontWeight:700, letterSpacing:2, color:'#2D6A4F', textTransform:'uppercase', marginBottom:12 }}>Our Story</div>
              <h2 style={{ fontSize:'2rem', color:'#1B4332', marginBottom:20 }}>Born from a Need for Better Mental Healthcare</h2>
              <p style={{ color:'#5A7464', lineHeight:1.8, marginBottom:16 }}>
                Manas Healthcare was founded in Bengaluru with a singular purpose: to ensure that anyone seeking mental health support receives it with dignity, expertise, and warmth. "Manas" — derived from Sanskrit, meaning mind — reflects our deep commitment to the science and soul of mental wellbeing.
              </p>
              <p style={{ color:'#5A7464', lineHeight:1.8, marginBottom:24 }}>
                Since our inception, we have served hundreds of individuals, couples, children, and organisations, helping them navigate life's most challenging moments with professional, evidence-based care.
              </p>
              <Link to="/our-team" className="btn btn-primary">Meet Our Team <ArrowRight size={14} /></Link>
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
              {[['500+','Patients Served'],['10,000+','Sessions Delivered'],['5+','Expert Therapists'],['4.9★','Average Rating']].map(([v,l]) => (
                <div key={l} style={{ background:'linear-gradient(135deg,#EEF4F0,#D1FAE5)', borderRadius:16, padding:'28px 20px', textAlign:'center' }}>
                  <div style={{ fontFamily:'Playfair Display', fontSize:'2rem', fontWeight:700, color:'#1B4332' }}>{v}</div>
                  <div style={{ fontSize:13, color:'#5A7464', marginTop:4 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ background:'#F8FAF9' }}>
        <div className="container">
          <div className="grid-3">
            {[
              { icon: Target, title:'Our Mission', color:'#EEF4F0', desc:'To provide accessible, evidence-based, and compassionate mental healthcare that empowers individuals to live fulfilling, healthy lives.' },
              { icon: Eye, title:'Our Vision', color:'#FEF3C7', desc:'A society where mental health is prioritised, stigma is eliminated, and every person can access the support they need without barriers.' },
              { icon: Heart, title:'Our Values', color:'#EDE9FE', desc:'Compassion, confidentiality, evidence, inclusion, and continuous growth — these principles guide every interaction and decision at Manas.' },
            ].map(({ icon: Icon, title, desc, color }) => (
              <div key={title} style={{ background:color, borderRadius:16, padding:32, textAlign:'center' }}>
                <div style={{ width:60, height:60, background:'rgba(255,255,255,0.7)', borderRadius:14, display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 20px' }}>
                  <Icon size={28} color="#2D6A4F" />
                </div>
                <h3 style={{ fontFamily:'Playfair Display', fontSize:'1.4rem', color:'#1B4332', marginBottom:12 }}>{title}</h3>
                <p style={{ fontSize:14, color:'#5A7464', lineHeight:1.7 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background:'white' }}>
        <div className="container">
          <div className="text-center" style={{ marginBottom:40 }}>
            <h2 style={{ fontSize:'2rem', color:'#1B4332', marginBottom:12 }}>Our Approach to Care</h2>
            <p style={{ color:'#5A7464', maxWidth:540, margin:'0 auto' }}>We combine the best of science with genuine human connection.</p>
          </div>
          <div className="grid-4">
            {[
              { num:'01', title:'Initial Assessment', desc:'A thorough first session to understand your history, concerns, and goals.' },
              { num:'02', title:'Personalised Plan', desc:'A tailored therapy plan crafted around your specific needs and preferences.' },
              { num:'03', title:'Regular Sessions', desc:'Ongoing sessions with progress tracking and continuous adjustments.' },
              { num:'04', title:'Long-Term Support', desc:'Post-therapy support and tools to sustain your mental health independently.' },
            ].map(s => (
              <div key={s.num} style={{ padding:24, borderRadius:16, border:'1.5px solid #E8F0EB' }}>
                <div style={{ fontSize:'2rem', fontWeight:700, color:'#52B788', fontFamily:'Playfair Display', marginBottom:12 }}>{s.num}</div>
                <h3 style={{ fontFamily:'inherit', fontSize:16, fontWeight:700, color:'#1B4332', marginBottom:8 }}>{s.title}</h3>
                <p style={{ fontSize:13, color:'#5A7464', lineHeight:1.7 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background:'linear-gradient(135deg,#1B4332,#2D6A4F)', color:'white', padding:'64px 0' }}>
        <div className="container text-center">
          <h2 style={{ fontSize:'2rem', marginBottom:16 }}>Begin Your Healing Journey Today</h2>
          <p style={{ opacity:0.85, maxWidth:460, margin:'0 auto 32px' }}>Whatever you're carrying, you don't have to carry it alone.</p>
          <Link to="/book-consultation" className="btn btn-gold btn-lg">Book a Consultation <ArrowRight size={14} /></Link>
        </div>
      </section>
    </div>
  );
}
