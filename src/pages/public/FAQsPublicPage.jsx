import React, { useState, useEffect } from 'react';
import { faqsDB } from '../../data/db';
import { ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

function FAQItem({ faq }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ border:'1.5px solid #E8F0EB', borderRadius:12, marginBottom:12, overflow:'hidden', transition:'box-shadow 0.2s', boxShadow: open ? '0 4px 16px rgba(45,106,79,0.08)' : 'none' }}>
      <button onClick={() => setOpen(!open)} style={{ width:'100%', display:'flex', justifyContent:'space-between', alignItems:'center', padding:'18px 24px', background: open ? '#EEF4F0' : 'white', border:'none', cursor:'pointer', textAlign:'left', gap:16 }}>
        <span style={{ fontSize:15, fontWeight:600, color:'#1B4332', lineHeight:1.4 }}>{faq.question}</span>
        <ChevronDown size={18} color="#2D6A4F" style={{ flexShrink:0, transform: open ? 'rotate(180deg)' : 'none', transition:'transform 0.2s' }} />
      </button>
      {open && (
        <div style={{ padding:'16px 24px 20px', fontSize:14, color:'#5A7464', lineHeight:1.8, background:'white', borderTop:'1px solid #E8F0EB' }}>
          {faq.answer}
        </div>
      )}
    </div>
  );
}

export default function FAQsPublicPage() {
  const [faqs, setFaqs] = useState([]);

  useEffect(() => { setFaqs(faqsDB.getAll()); }, []);

  return (
    <div className="fade-in">
      <div className="page-hero">
        <div className="container">
          <h1>Frequently Asked Questions</h1>
          <p>Answers to the questions we hear most often. If you don't find what you're looking for, please reach out to us.</p>
        </div>
      </div>

      <section className="section" style={{ background:'white' }}>
        <div className="container" style={{ maxWidth:760 }}>
          {faqs.length === 0 ? (
            <div style={{ textAlign:'center', padding:'60px 0', color:'#5A7464' }}>No FAQs yet. Check back soon.</div>
          ) : (
            faqs.map(faq => <FAQItem key={faq.id} faq={faq} />)
          )}

          <div style={{ marginTop:48, background:'linear-gradient(135deg,#EEF4F0,#D1FAE5)', borderRadius:16, padding:32, textAlign:'center' }}>
            <h3 style={{ fontFamily:'Playfair Display', fontSize:'1.4rem', color:'#1B4332', marginBottom:12 }}>Still Have Questions?</h3>
            <p style={{ color:'#5A7464', marginBottom:20 }}>Our team is happy to help. Reach out to us directly.</p>
            <div style={{ display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap' }}>
              <Link to="/contact" className="btn btn-primary">Contact Us</Link>
              <Link to="/book-consultation" className="btn btn-outline">Book a Free Call</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
