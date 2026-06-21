import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { doctorsDB } from '../../data/db';

export default function OurTeamPage() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    setDoctors(doctorsDB.getAll().filter(d => d.status === 1));
  }, []);

  return (
    <div className="fade-in">
      <div className="page-hero">
        <div className="container">
          <h1>Our Team</h1>
          <p>A diverse group of experienced, compassionate mental health professionals dedicated to your wellbeing.</p>
        </div>
      </div>

      <section className="section" style={{ background:'white' }}>
        <div className="container">
          <div className="text-center" style={{ marginBottom:48 }}>
            <div style={{ fontSize:12, fontWeight:700, letterSpacing:2, color:'#2D6A4F', textTransform:'uppercase', marginBottom:10 }}>Our Experts</div>
            <h2 style={{ fontSize:'2rem', color:'#1B4332', marginBottom:12 }}>Meet the Professionals Behind Your Care</h2>
            <p style={{ color:'#5A7464', maxWidth:520, margin:'0 auto' }}>Every member of our team is rigorously trained, supervised, and continuously learning to deliver the best care possible.</p>
          </div>

          {doctors.length === 0 ? (
            <div style={{ textAlign:'center', padding:'60px 0', color:'#5A7464' }}>
              <div style={{ fontSize:48, marginBottom:16 }}>👩‍⚕️</div>
              <p>Our team will be listed here once doctors are added via the admin panel.</p>
            </div>
          ) : (
            <div className="grid-3">
              {doctors.map(doc => (
                <div key={doc.id} style={{ background:'#F8FAF9', borderRadius:20, overflow:'hidden', boxShadow:'0 4px 20px rgba(0,0,0,0.07)', transition:'all 0.25s' }}
                  onMouseEnter={e => { e.currentTarget.style.transform='translateY(-6px)'; e.currentTarget.style.boxShadow='0 12px 40px rgba(45,106,79,0.15)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='0 4px 20px rgba(0,0,0,0.07)'; }}>
                  <div style={{ height:200, background:'linear-gradient(135deg,#EEF4F0 0%,#D1FAE5 100%)', overflow:'hidden', display:'flex', alignItems:'center', justifyContent:'center' }}>
                    {doc.image
                      ? <img src={doc.image} alt={`${doc.firstName} ${doc.lastName}`} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                      : <span style={{ fontSize:80 }}>👩‍⚕️</span>
                    }
                  </div>
                  <div style={{ padding:'20px 24px 24px' }}>
                    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:8 }}>
                      <h3 style={{ fontFamily:'Playfair Display', fontSize:'1.15rem', color:'#1B4332' }}>{doc.firstName} {doc.lastName}</h3>
                      <span className="badge badge-green">Active</span>
                    </div>
                    <div style={{ fontSize:13, color:'#2D6A4F', fontWeight:600, marginBottom:8 }}>{doc.specialization}</div>
                    <div style={{ fontSize:13, color:'#5A7464', marginBottom:4 }}>🎓 {doc.degree}, {doc.university}</div>
                    <div style={{ fontSize:13, color:'#5A7464', marginBottom:12 }}>⏱️ {doc.experience} years experience · 📍 {doc.location}</div>
                    <p style={{ fontSize:13, color:'#5A7464', lineHeight:1.7, marginBottom:16 }}>
                      {doc.bio?.slice(0, 120)}...
                    </p>
                    <Link to="/book-consultation" className="btn btn-primary btn-sm" style={{ width:'100%', justifyContent:'center' }}>
                      Book with {doc.firstName.split(' ').pop()} <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="section" style={{ background:'#F8FAF9' }}>
        <div className="container text-center">
          <h2 style={{ fontSize:'1.8rem', color:'#1B4332', marginBottom:12 }}>Join Our Team</h2>
          <p style={{ color:'#5A7464', maxWidth:460, margin:'0 auto 28px' }}>Are you a mental health professional who shares our values? We'd love to hear from you.</p>
          <Link to="/contact" className="btn btn-primary">Get In Touch <ArrowRight size={14} /></Link>
        </div>
      </section>
    </div>
  );
}
