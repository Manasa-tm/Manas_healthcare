import React, { useState, useEffect } from 'react';
import { appointmentsDB, doctorsDB } from '../../data/db';
import { Search, Pencil, Trash2, Plus, X } from 'lucide-react';

const CONCERNS = ['Anxiety, Depression','Stress & CBT','Trauma','Mood & Emotions','Relationships','Sleep Disorder','Self-Harm','Psychiatry','Other'];

function EditModal({ appt, doctors, onSave, onClose }) {
  const [form, setForm] = useState({ ...appt });
  return (
    <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.5)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:1000, padding:24 }}>
      <div style={{ background:'white', borderRadius:20, padding:32, maxWidth:540, width:'100%', maxHeight:'90vh', overflowY:'auto' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:24 }}>
          <h3 style={{ fontFamily:'Playfair Display', fontSize:'1.3rem', color:'#1B4332' }}>Edit Appointment</h3>
          <button onClick={onClose} style={{ background:'none', color:'#5A7464' }}><X size={20} /></button>
        </div>
        <div className="grid-2">
          <div className="form-group">
            <label className="form-label">Patient Name</label>
            <input value={form.patientName} onChange={e => setForm(p => ({ ...p, patientName: e.target.value }))} className="form-input" />
          </div>
          <div className="form-group">
            <label className="form-label">Contact</label>
            <input value={form.contact} onChange={e => setForm(p => ({ ...p, contact: e.target.value }))} className="form-input" />
          </div>
          <div className="form-group">
            <label className="form-label">Consultation For</label>
            <select value={form.consultationFor} onChange={e => setForm(p => ({ ...p, consultationFor: e.target.value }))} className="form-input">
              {CONCERNS.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Doctor</label>
            <select value={form.doctor} onChange={e => setForm(p => ({ ...p, doctor: e.target.value }))} className="form-input">
              {doctors.map(d => <option key={d.id}>{d.firstName} {d.lastName}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Session Type</label>
            <select value={form.sessionType} onChange={e => setForm(p => ({ ...p, sessionType: e.target.value }))} className="form-input">
              <option>Online</option><option>In-Person</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Status</label>
            <select value={form.status} onChange={e => setForm(p => ({ ...p, status: e.target.value }))} className="form-input">
              <option>Booked</option><option>Pending</option><option>Completed</option><option>Cancelled</option>
            </select>
          </div>
        </div>
        <div style={{ display:'flex', gap:12, justifyContent:'flex-end', marginTop:8 }}>
          <button onClick={onClose} className="btn btn-outline">Cancel</button>
          <button onClick={() => onSave(form)} className="btn btn-primary">Save Changes</button>
        </div>
      </div>
    </div>
  );
}

export default function AdminAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('Total Appointment');
  const [editAppt, setEditAppt] = useState(null);
  const [page, setPage] = useState(1);
  const PER_PAGE = 10;

  const load = () => {
    setAppointments(appointmentsDB.getAll());
    setDoctors(doctorsDB.getAll());
  };
  useEffect(load, []);

  const filtered = appointments.filter(a => {
    const matchSearch = a.patientName?.toLowerCase().includes(search.toLowerCase()) ||
      a.contact?.includes(search) || a.doctor?.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filterType === 'Total Appointment' ? true :
      filterType === 'Online' ? a.sessionType === 'Online' :
      filterType === 'In-Person' ? a.sessionType === 'In-Person' :
      filterType === 'Pending' ? a.status === 'Pending' : true;
    return matchSearch && matchFilter;
  });

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const handleSave = (updated) => {
    appointmentsDB.update(updated.id, updated);
    setEditAppt(null);
    load();
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this appointment?')) {
      appointmentsDB.delete(id);
      load();
    }
  };

  return (
    <div className="fade-in">
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:24, flexWrap:'wrap', gap:12 }}>
        <h1 style={{ fontFamily:'Playfair Display', fontSize:'1.8rem', color:'#1B4332' }}>Appointments</h1>
      </div>

      {/* Filters */}
      <div style={{ background:'white', borderRadius:16, padding:'16px 20px', boxShadow:'0 2px 12px rgba(0,0,0,0.06)', marginBottom:20, display:'flex', alignItems:'center', gap:16, flexWrap:'wrap' }}>
        <span style={{ fontSize:14, color:'#5A7464' }}>Patient List <strong style={{ color:'#1B4332' }}>{filtered.length}</strong></span>
        <div style={{ position:'relative' }}>
          <Search size={14} style={{ position:'absolute', left:10, top:'50%', transform:'translateY(-50%)', color:'#5A7464' }} />
          <input value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} placeholder="Search patients..." className="form-input" style={{ paddingLeft:32, width:200 }} />
        </div>
        <select value={filterType} onChange={e => { setFilterType(e.target.value); setPage(1); }} className="form-input" style={{ width:180 }}>
          {['Total Appointment','Online','In-Person','Pending'].map(f => <option key={f}>{f}</option>)}
        </select>
      </div>

      {/* TABLE */}
      <div style={{ background:'white', borderRadius:16, boxShadow:'0 2px 12px rgba(0,0,0,0.06)', overflow:'hidden' }}>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Sl no.</th><th>Patient ID</th><th>Appointment Slots</th>
                <th>Created Date</th><th>Consultation For</th><th>Contact</th>
                <th>Doctor</th><th>Session Type</th><th>Location</th><th>Status</th><th>Action</th>
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr><td colSpan={11} style={{ textAlign:'center', padding:'48px 0', color:'#5A7464' }}>No appointments found.</td></tr>
              ) : paginated.map((a, i) => (
                <tr key={a.id}>
                  <td style={{ fontWeight:600, color:'#5A7464' }}>{(page - 1) * PER_PAGE + i + 1}</td>
                  <td style={{ fontSize:13 }}>{a.patientId}</td>
                  <td style={{ fontSize:12, color:'#5A7464', minWidth:140 }}>{a.slot}</td>
                  <td style={{ fontSize:12, color:'#5A7464' }}>{a.createdDate}</td>
                  <td style={{ fontSize:13, maxWidth:160 }}>{a.consultationFor}</td>
                  <td style={{ fontSize:13 }}>{a.contact}</td>
                  <td style={{ fontSize:13, fontWeight:600 }}>{a.doctor}</td>
                  <td><span style={{ fontSize:12, background:'#EEF4F0', color:'#2D6A4F', padding:'3px 8px', borderRadius:6, fontWeight:600, whiteSpace:'nowrap' }}>{a.sessionType}</span></td>
                  <td style={{ fontSize:12, color:'#5A7464' }}>{a.location || '-'}</td>
                  <td><span className={`badge ${a.status === 'Booked' ? 'badge-green' : a.status === 'Pending' ? 'badge-yellow' : 'badge-red'}`}>{a.status}</span></td>
                  <td>
                    <div style={{ display:'flex', gap:8 }}>
                      <button onClick={() => setEditAppt(a)} title="Edit" style={{ background:'none', color:'#C9A84C', display:'flex' }}><Pencil size={14} /></button>
                      <button onClick={() => handleDelete(a.id)} title="Delete" style={{ background:'none', color:'#E53E3E', display:'flex' }}><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'12px 20px', borderTop:'1px solid #E8F0EB' }}>
            <div style={{ fontSize:13, color:'#5A7464' }}>Page {page} of {totalPages}</div>
            <div style={{ display:'flex', gap:8, alignItems:'center' }}>
              <select value={PER_PAGE} className="form-input" style={{ width:70 }}><option>10</option></select>
              <button onClick={() => setPage(p => Math.max(1, p-1))} disabled={page === 1} className="btn btn-outline btn-sm">Prev</button>
              <button onClick={() => setPage(p => Math.min(totalPages, p+1))} disabled={page === totalPages} className="btn btn-primary btn-sm">Next</button>
            </div>
          </div>
        )}
      </div>

      {editAppt && <EditModal appt={editAppt} doctors={doctors} onSave={handleSave} onClose={() => setEditAppt(null)} />}
    </div>
  );
}
