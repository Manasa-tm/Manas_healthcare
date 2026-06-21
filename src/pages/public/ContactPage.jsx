import React, { useState } from 'react';
import { leadsDB } from '../../data/db';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

export default function ContactPage() {
  const [form, setForm] = useState({ name:'', email:'', phone:'', subject:'', message:'' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = e => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      leadsDB.add({ fullName: form.name, email: form.email, phone: form.phone, screenType: form.subject });
      setLoading(false);
      setSent(true);
    }, 800);
  };

  return (
    <div className="fade-in">
      <div className="page-hero">
        <div className="container">
          <h1>Contact Us</h1>
          <p>We're here to help. Reach out to us and we'll respond within 24 hours.</p>
        </div>
      </div>

      <section className="section" style={{ background:'white' }}>
        <div className="container">
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1.4fr', gap:64 }}>
            {/* INFO */}
            <div>
              <h2 style={{ fontSize:'1.8rem', color:'#1B4332', marginBottom:24 }}>Get in Touch</h2>
              <p style={{ color:'#5A7464', lineHeight:1.8, marginBottom:32 }}>
                Whether you have questions about our services, want to book an appointment, or need urgent support — we're here for you.
              </p>
              {[
                { icon: Phone, title:'Phone', info:'+91 98765 43200', sub:'Mon–Sat, 9 AM – 7 PM' },
                { icon: Mail, title:'Email', info:'care@manashealthcare.in', sub:'We reply within 24 hours' },
                { icon: MapPin, title:'Location', info:'Bengaluru, Karnataka', sub:'In-person & online sessions' },
                { icon: Clock, title:'Hours', info:'Mon–Sat: 9 AM – 7 PM', sub:'Sunday by appointment' },
              ].map(({ icon: Icon, title, info, sub }) => (
                <div key={title} style={{ display:'flex', gap:16, marginBottom:28 }}>
                  <div style={{ width:44, height:44, background:'#EEF4F0', borderRadius:10, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                    <Icon size={20} color="#2D6A4F" />
                  </div>
                  <div>
                    <div style={{ fontWeight:700, fontSize:14, color:'#1B4332' }}>{title}</div>
                    <div style={{ fontSize:14, color:'#1A2B22', margin:'2px 0' }}>{info}</div>
                    <div style={{ fontSize:12, color:'#5A7464' }}>{sub}</div>
                  </div>
                </div>
              ))}

              <div style={{ marginTop:24, background:'#FEE2E2', borderRadius:12, padding:20 }}>
                <div style={{ fontWeight:700, fontSize:14, color:'#9B2C2C', marginBottom:8 }}>🆘 In Crisis?</div>
                <div style={{ fontSize:13, color:'#742A2A', lineHeight:1.7 }}>
                  Call: 9152987821<br />
                  Manas Foundation: 1860-2662-345<br />
                  Emergency: 112
                </div>
              </div>
            </div>

            {/* FORM */}
            <div>
              {sent ? (
                <div style={{ background:'#EEF4F0', borderRadius:16, padding:48, textAlign:'center' }}>
                  <div style={{ fontSize:56, marginBottom:16 }}>✅</div>
                  <h3 style={{ fontFamily:'Playfair Display', fontSize:'1.5rem', color:'#1B4332', marginBottom:12 }}>Message Sent!</h3>
                  <p style={{ color:'#5A7464' }}>Thank you for reaching out. Our team will get back to you within 24 hours.</p>
                  <button onClick={() => setSent(false)} className="btn btn-primary" style={{ marginTop:20 }}>Send Another Message</button>
                </div>
              ) : (
                <div className="card">
                  <h3 style={{ fontFamily:'Playfair Display', fontSize:'1.4rem', color:'#1B4332', marginBottom:24 }}>Send Us a Message</h3>
                  <form onSubmit={handleSubmit}>
                    <div className="grid-2">
                      <div className="form-group">
                        <label className="form-label">Full Name *</label>
                        <input name="name" value={form.name} onChange={handleChange} required className="form-input" placeholder="Your full name" />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Email *</label>
                        <input name="email" type="email" value={form.email} onChange={handleChange} required className="form-input" placeholder="your@email.com" />
                      </div>
                    </div>
                    <div className="grid-2">
                      <div className="form-group">
                        <label className="form-label">Phone</label>
                        <input name="phone" value={form.phone} onChange={handleChange} className="form-input" placeholder="+91 00000 00000" />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Subject</label>
                        <select name="subject" value={form.subject} onChange={handleChange} className="form-input">
                          <option value="">Select a topic</option>
                          <option>Book an Appointment</option>
                          <option>General Enquiry</option>
                          <option>Corporate Program</option>
                          <option>Join Our Team</option>
                          <option>Other</option>
                        </select>
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Message *</label>
                      <textarea name="message" value={form.message} onChange={handleChange} required className="form-input" placeholder="How can we help you?" rows={5} />
                    </div>
                    <button type="submit" disabled={loading} className="btn btn-primary" style={{ width:'100%', justifyContent:'center', fontSize:15 }}>
                      {loading ? 'Sending...' : 'Send Message'}
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
