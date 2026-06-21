import React, { useState, useEffect } from 'react';
import { faqsDB } from '../../data/db';
import { Plus, Pencil, Trash2, X, Check } from 'lucide-react';

function FAQModal({ faq, onSave, onClose }) {
  const [form, setForm] = useState(faq || { question:'', answer:'' });
  return (
    <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.5)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:1000, padding:24 }}>
      <div style={{ background:'white', borderRadius:20, padding:32, maxWidth:540, width:'100%' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:24 }}>
          <h3 style={{ fontFamily:'Playfair Display', fontSize:'1.3rem', color:'#1B4332' }}>{faq ? 'Edit FAQ' : 'Add FAQ'}</h3>
          <button onClick={onClose} style={{ background:'none', color:'#5A7464' }}><X size={20} /></button>
        </div>
        <div className="form-group">
          <label className="form-label">Question *</label>
          <input value={form.question} onChange={e => setForm(p => ({ ...p, question: e.target.value }))} className="form-input" placeholder="Enter the question" required />
        </div>
        <div className="form-group">
          <label className="form-label">Answer *</label>
          <textarea value={form.answer} onChange={e => setForm(p => ({ ...p, answer: e.target.value }))} className="form-input" rows={5} placeholder="Enter the answer" required />
        </div>
        <div style={{ display:'flex', gap:12, justifyContent:'flex-end' }}>
          <button onClick={onClose} className="btn btn-outline">Cancel</button>
          <button onClick={() => form.question && form.answer && onSave(form)} className="btn btn-primary">
            <Check size={14} /> Save FAQ
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AdminFAQs() {
  const [faqs, setFaqs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editFaq, setEditFaq] = useState(null);

  const load = () => setFaqs(faqsDB.getAll());
  useEffect(load, []);

  const handleSave = (data) => {
    if (editFaq) {
      faqsDB.update(editFaq.id, data);
    } else {
      faqsDB.add(data);
    }
    setShowModal(false);
    setEditFaq(null);
    load();
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this FAQ?')) {
      faqsDB.delete(id);
      load();
    }
  };

  return (
    <div className="fade-in">
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:24, flexWrap:'wrap', gap:12 }}>
        <h1 style={{ fontFamily:'Playfair Display', fontSize:'1.8rem', color:'#1B4332' }}>FAQs</h1>
        <button onClick={() => { setEditFaq(null); setShowModal(true); }} className="btn btn-primary"><Plus size={14} /> Add FAQ</button>
      </div>

      <div style={{ display:'grid', gap:16 }}>
        {faqs.length === 0 ? (
          <div style={{ background:'white', borderRadius:16, padding:'60px 0', textAlign:'center', color:'#5A7464', boxShadow:'0 2px 12px rgba(0,0,0,0.06)' }}>
            No FAQs yet. Click "Add FAQ" to create one.
          </div>
        ) : faqs.map((faq, i) => (
          <div key={faq.id} style={{ background:'white', borderRadius:16, padding:24, boxShadow:'0 2px 12px rgba(0,0,0,0.06)', display:'flex', gap:16, alignItems:'flex-start' }}>
            <div style={{ width:32, height:32, background:'linear-gradient(135deg,#EEF4F0,#D1FAE5)', borderRadius:8, display:'flex', alignItems:'center', justifyContent:'center', fontWeight:700, fontSize:13, color:'#2D6A4F', flexShrink:0 }}>
              {i + 1}
            </div>
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ fontWeight:700, fontSize:15, color:'#1B4332', marginBottom:8 }}>{faq.question}</div>
              <div style={{ fontSize:14, color:'#5A7464', lineHeight:1.7 }}>{faq.answer}</div>
            </div>
            <div style={{ display:'flex', gap:8, flexShrink:0 }}>
              <button onClick={() => { setEditFaq(faq); setShowModal(true); }} style={{ background:'none', color:'#C9A84C', display:'flex' }}><Pencil size={16} /></button>
              <button onClick={() => handleDelete(faq.id)} style={{ background:'none', color:'#E53E3E', display:'flex' }}><Trash2 size={16} /></button>
            </div>
          </div>
        ))}
      </div>

      {showModal && <FAQModal faq={editFaq} onSave={handleSave} onClose={() => { setShowModal(false); setEditFaq(null); }} />}
    </div>
  );
}
