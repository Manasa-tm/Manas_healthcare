import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function ProgramsPage() {
  return (
    <div className="fade-in">
      <div className="page-hero">
        <div className="container">
          <h1>Our Programs</h1>
          <p>Structured programs for individuals, families, and organisations to build lasting mental wellness.</p>
        </div>
      </div>

      <section className="section" style={{ background:'white' }} id="stay-well">
        <div className="container">
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:64, alignItems:'center' }}>
            <div style={{ height:300, background:'linear-gradient(135deg,#EEF4F0,#D1FAE5)', borderRadius:20, display:'flex', alignItems:'center', justifyContent:'center', fontSize:80 }}>🌿</div>
            <div>
              <div style={{ fontSize:12, fontWeight:700, letterSpacing:2, color:'#2D6A4F', textTransform:'uppercase', marginBottom:10 }}>Stay Well Program</div>
              <h2 style={{ fontSize:'2rem', color:'#1B4332', marginBottom:16 }}>Proactive Mental Health for Individuals</h2>
              <p style={{ color:'#5A7464', lineHeight:1.8, marginBottom:16 }}>
                Our Stay Well program is designed for those who want to maintain and strengthen their mental health before challenges become crises. Through regular check-ins, psychoeducation, and skill-building sessions, you develop resilience for life's inevitable challenges.
              </p>
              <ul style={{ color:'#5A7464', fontSize:14, lineHeight:2, marginBottom:24, paddingLeft:0, listStyle:'none' }}>
                {['Monthly wellness assessments','Stress and coping skills workshops','Mindfulness & self-care coaching','Access to our resource library'].map(i => <li key={i} style={{ display:'flex', gap:8 }}><span style={{ color:'#2D6A4F' }}>✓</span>{i}</li>)}
              </ul>
              <Link to="/book-consultation" className="btn btn-primary">Enquire About Stay Well <ArrowRight size={14} /></Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ background:'#F8FAF9' }} id="corporate">
        <div className="container">
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:64, alignItems:'center' }}>
            <div>
              <div style={{ fontSize:12, fontWeight:700, letterSpacing:2, color:'#C9A84C', textTransform:'uppercase', marginBottom:10 }}>Corporate Mental Health</div>
              <h2 style={{ fontSize:'2rem', color:'#1B4332', marginBottom:16 }}>Workplace Wellbeing That Improves Performance</h2>
              <p style={{ color:'#5A7464', lineHeight:1.8, marginBottom:16 }}>
                Mental health at work affects productivity, retention, and culture. Our corporate program provides a comprehensive EAP (Employee Assistance Program) with counselling access, manager training, and organisational consulting.
              </p>
              <ul style={{ color:'#5A7464', fontSize:14, lineHeight:2, marginBottom:24, paddingLeft:0, listStyle:'none' }}>
                {['Confidential employee counselling','Mental health awareness workshops','Manager & leadership training','Burnout prevention strategies','Anonymous helpline for employees'].map(i => <li key={i} style={{ display:'flex', gap:8 }}><span style={{ color:'#C9A84C' }}>✓</span>{i}</li>)}
              </ul>
              <Link to="/contact" className="btn btn-gold">Talk to Our Corporate Team <ArrowRight size={14} /></Link>
            </div>
            <div style={{ height:300, background:'linear-gradient(135deg,#FEF3C7,#FDE68A)', borderRadius:20, display:'flex', alignItems:'center', justifyContent:'center', fontSize:80 }}>🏢</div>
          </div>
        </div>
      </section>

      <section style={{ background:'linear-gradient(135deg,#1B4332,#2D6A4F)', color:'white', padding:'64px 0' }}>
        <div className="container text-center">
          <h2 style={{ fontSize:'1.8rem', marginBottom:12 }}>Interested in Our Programs?</h2>
          <p style={{ opacity:0.85, maxWidth:460, margin:'0 auto 28px' }}>Get in touch to learn which program is right for you or your organisation.</p>
          <Link to="/contact" className="btn btn-gold btn-lg">Contact Us <ArrowRight size={14} /></Link>
        </div>
      </section>
    </div>
  );
}
