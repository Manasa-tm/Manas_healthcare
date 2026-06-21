import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { doctorsDB } from '../../data/db';
import { Plus, Search, Eye, Pencil, Trash2 } from 'lucide-react';

export default function AdminDoctors() {
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(null);

  const load = () => setDoctors(doctorsDB.getAll());
  useEffect(load, []);

  const handleDelete = (id) => {
    doctorsDB.delete(id);
    setConfirmDelete(null);
    load();
  };

  const filtered = doctors.filter(d =>
    `${d.firstName} ${d.lastName}`.toLowerCase().includes(search.toLowerCase()) ||
    d.specialization?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fade-in">
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:24, flexWrap:'wrap', gap:12 }}>
        <h1 style={{ fontFamily:'Playfair Display', fontSize:'1.8rem', color:'#1B4332' }}>Doctors</h1>
        <Link to="/admin/doctors/add" className="btn btn-primary"><Plus size={15} /> Add Doctors</Link>
      </div>

      {/* Filters */}
      <div style={{ background:'white', borderRadius:16, padding:20, boxShadow:'0 2px 12px rgba(0,0,0,0.06)', marginBottom:24, display:'flex', alignItems:'center', gap:16, flexWrap:'wrap' }}>
        <span style={{ fontSize:14, color:'#5A7464' }}>Doctor List <strong style={{ color:'#1B4332' }}>{filtered.length}</strong></span>
        <div style={{ position:'relative' }}>
          <Search size={14} style={{ position:'absolute', left:10, top:'50%', transform:'translateY(-50%)', color:'#5A7464' }} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search doctors..." className="form-input" style={{ paddingLeft:32, width:220 }} />
        </div>
      </div>

      {/* TABLE */}
      <div style={{ background:'white', borderRadius:16, boxShadow:'0 2px 12px rgba(0,0,0,0.06)', overflow:'hidden' }}>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Sl no.</th><th>Doctor ID</th><th>Doctor Name</th>
                <th>Specialization</th><th>Total Appointment</th><th>Status</th><th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={7} style={{ textAlign:'center', padding:'48px 0', color:'#5A7464' }}>
                  {search ? 'No doctors match your search.' : 'No doctors added yet. Click "Add Doctors" to get started.'}
                </td></tr>
              ) : filtered.map((doc, i) => (
                <tr key={doc.id}>
                  <td style={{ fontSize:14, fontWeight:600, color:'#5A7464' }}>{i + 1}</td>
                  <td style={{ fontSize:13 }}>{doc.doctorId}</td>
                  <td>
                    <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                      <div style={{ width:36, height:36, background:'linear-gradient(135deg,#EEF4F0,#D1FAE5)', borderRadius:10, overflow:'hidden', flexShrink:0 }}>
                        {doc.image
                          ? <img src={doc.image} alt={doc.firstName} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                          : <div style={{ width:'100%', height:'100%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:18 }}>👩‍⚕️</div>
                        }
                      </div>
                      <div>
                        <div style={{ fontWeight:600, fontSize:13, color:'#1A2B22' }}>{doc.firstName} {doc.lastName}</div>
                        <div style={{ fontSize:11, color:'#5A7464' }}>{doc.email}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ fontSize:13, color:'#5A7464' }}>{doc.specialization}</td>
                  <td style={{ fontSize:13, fontWeight:600, color:'#1A2B22' }}>{doc.totalAppointments}</td>
                  <td><span className={`badge ${doc.status === 1 ? 'badge-green' : 'badge-red'}`}>{doc.status === 1 ? 'Active' : 'Inactive'}</span></td>
                  <td>
                    <div style={{ display:'flex', gap:8 }}>
                      <Link to={`/admin/doctors/edit/${doc.id}`} title="Edit" style={{ color:'#C9A84C', display:'flex' }}>
                        <Pencil size={15} />
                      </Link>
                      <button onClick={() => setConfirmDelete(doc)} title="Delete" style={{ background:'none', color:'#E53E3E', display:'flex' }}>
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* DOCTOR CARDS (Holiday-style view) */}
      {doctors.length > 0 && (
        <div style={{ marginTop:32 }}>
          <h2 style={{ fontFamily:'Playfair Display', fontSize:'1.2rem', color:'#1B4332', marginBottom:16 }}>Availability Overview</h2>
          <div className="grid-4">
            {doctors.map(doc => (
              <div key={doc.id} style={{ background:'white', borderRadius:16, overflow:'hidden', boxShadow:'0 2px 12px rgba(0,0,0,0.06)' }}>
                <div style={{ height:140, background:'linear-gradient(135deg,#EEF4F0,#D1FAE5)', overflow:'hidden', display:'flex', alignItems:'center', justifyContent:'center' }}>
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
                  <div style={{ fontSize:11, color:'#5A7464', marginBottom:4 }}>{doc.totalAppointments} Total Appointments</div>
                  <Link to={`/admin/doctors/edit/${doc.id}`} className="btn btn-primary btn-sm" style={{ width:'100%', justifyContent:'center', marginTop:8, fontSize:12 }}>
                    Modify Availability
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* DELETE CONFIRM MODAL */}
      {confirmDelete && (
        <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.5)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:1000 }}>
          <div style={{ background:'white', borderRadius:16, padding:32, maxWidth:400, width:'90%' }}>
            <h3 style={{ fontFamily:'Playfair Display', fontSize:'1.3rem', color:'#1B4332', marginBottom:12 }}>Delete Doctor?</h3>
            <p style={{ color:'#5A7464', fontSize:14, marginBottom:24 }}>
              Are you sure you want to delete <strong>{confirmDelete.firstName} {confirmDelete.lastName}</strong>? This action cannot be undone.
            </p>
            <div style={{ display:'flex', gap:12 }}>
              <button onClick={() => setConfirmDelete(null)} className="btn btn-outline" style={{ flex:1 }}>Cancel</button>
              <button onClick={() => handleDelete(confirmDelete.id)} className="btn" style={{ flex:1, background:'#E53E3E', color:'white' }}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
