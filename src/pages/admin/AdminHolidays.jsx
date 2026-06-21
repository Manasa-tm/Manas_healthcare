import React, { useState, useEffect } from 'react';
import { holidaysDB, doctorsDB } from '../../data/db';
import { Plus, Trash2, X, Check, Calendar } from 'lucide-react';

function AddHolidayModal({ onSave, onClose }) {
  const [form, setForm] = useState({ name:'', date:'', note:'' });
  return (
    <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.5)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:1000, padding:24 }}>
      <div style={{ background:'white', borderRadius:20, padding:32, maxWidth:440, width:'100%' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:24 }}>
          <h3 style={{ fontFamily:'Playfair Display', fontSize:'1.3rem', color:'#1B4332' }}>Add Holiday</h3>
          <button onClick={onClose} style={{ background:'none', color:'#5A7464' }}><X size={20} /></button>
        </div>
        <div className="form-group">
          <label className="form-label">Holiday Name *</label>
          <input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} className="form-input" placeholder="e.g. Diwali" required />
        </div>
        <div className="form-group">
          <label className="form-label">Date *</label>
          <input type="date" value={form.date} onChange={e => setForm(p => ({ ...p, date: e.target.value }))} className="form-input" required />
        </div>
        <div className="form-group">
          <label className="form-label">Note</label>
          <input value={form.note} onChange={e => setForm(p => ({ ...p, note: e.target.value }))} className="form-input" placeholder="e.g. Festival Holiday" />
        </div>
        <div style={{ display:'flex', gap:12, justifyContent:'flex-end' }}>
          <button onClick={onClose} className="btn btn-outline">Cancel</button>
          <button onClick={() => form.name && form.date && onSave(form)} className="btn btn-primary"><Check size={14} /> Add Holiday</button>
        </div>
      </div>
    </div>
  );
}

export default function AdminHolidays() {
  const [holidays, setHolidays] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const load = () => {
    setHolidays(holidaysDB.getAll());
    setDoctors(doctorsDB.getAll());
  };
  useEffect(load, []);

  const handleSave = (data) => {
    holidaysDB.add(data);
    setShowModal(false);
    load();
  };

  const handleDelete = (id) => {
    if (window.confirm('Remove this holiday?')) {
      holidaysDB.delete(id);
      load();
    }
  };

  const formatDate = (d) => {
    if (!d) return '';
    const date = new Date(d);
    return date.toLocaleDateString('en-IN', { day:'2-digit', month:'short', year:'numeric' });
  };

  return (
    <div className="fade-in">
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:24, flexWrap:'wrap', gap:12 }}>
        <h1 style={{ fontFamily:'Playfair Display', fontSize:'1.8rem', color:'#1B4332' }}>Holidays</h1>
        <button onClick={() => setShowModal(true)} className="btn btn-primary"><Plus size={14} /> Add Holiday</button>
      </div>

      {/* HOLIDAYS TABLE */}
      <div style={{ background:'white', borderRadius:16, boxShadow:'0 2px 12px rgba(0,0,0,0.06)', overflow:'hidden', marginBottom:32 }}>
        <div className="table-wrap">
          <table>
            <thead><tr><th>#</th><th>Holiday</th><th>Date</th><th>Note</th><th>Action</th></tr></thead>
            <tbody>
              {holidays.length === 0 ? (
                <tr><td colSpan={5} style={{ textAlign:'center', padding:'48px 0', color:'#5A7464' }}>No holidays added yet.</td></tr>
              ) : holidays.map((h, i) => (
                <tr key={h.id}>
                  <td style={{ fontWeight:600, color:'#5A7464' }}>{i+1}</td>
                  <td style={{ fontWeight:600, fontSize:14, color:'#1A2B22' }}><span style={{ marginRight:8 }}>🗓️</span>{h.name}</td>
                  <td style={{ fontSize:13, color:'#5A7464' }}>{formatDate(h.date)}</td>
                  <td><span style={{ fontSize:12, background:'#EEF4F0', color:'#2D6A4F', padding:'3px 10px', borderRadius:20, fontWeight:600 }}>{h.note}</span></td>
                  <td><button onClick={() => handleDelete(h.id)} style={{ background:'none', color:'#E53E3E', display:'flex' }}><Trash2 size={15} /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* DOCTOR CARDS (like the screenshot) */}
      <h2 style={{ fontFamily:'Playfair Display', fontSize:'1.2rem', color:'#1B4332', marginBottom:16 }}>Doctor Availability During Holidays</h2>
      <div className="grid-4">
        {doctors.map(doc => (
          <div key={doc.id} style={{ background:'white', borderRadius:16, overflow:'hidden', boxShadow:'0 2px 12px rgba(0,0,0,0.06)' }}>
            <div style={{ height:150, background:'linear-gradient(135deg,#EEF4F0,#D1FAE5)', overflow:'hidden', display:'flex', alignItems:'center', justifyContent:'center' }}>
              {doc.image
                ? <img src={doc.image} alt={doc.firstName} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                : <span style={{ fontSize:56 }}>👩‍⚕️</span>
              }
            </div>
            <div style={{ padding:'14px 16px' }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:4 }}>
                <div style={{ fontSize:13, fontWeight:700, color:'#1B4332', lineHeight:1.3 }}>{doc.firstName} {doc.lastName}</div>
                <span className={`badge ${doc.status === 1 ? 'badge-green' : 'badge-red'}`} style={{ fontSize:10 }}>{doc.status === 1 ? 'Active' : 'Inactive'}</span>
              </div>
              <div style={{ fontSize:11, color:'#5A7464', marginBottom:2 }}>{doc.totalAppointments} Total Appointments</div>
              <div style={{ fontSize:11, color:'#5A7464', marginBottom:10 }}>
                🗓️ Holidays: {holidays.length} upcoming
              </div>
              <a href={`/admin/doctors/edit/${doc.id}`} className="btn btn-primary btn-sm" style={{ width:'100%', justifyContent:'center', fontSize:12, display:'flex' }}>
                Modify Availability
              </a>
            </div>
          </div>
        ))}
      </div>

      {showModal && <AddHolidayModal onSave={handleSave} onClose={() => setShowModal(false)} />}
    </div>
  );
}
