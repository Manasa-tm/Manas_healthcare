import React, { useState, useEffect } from 'react';
import { leadsDB } from '../../data/db';
import { Search, Trash2, Download } from 'lucide-react';

export default function AdminLeads() {
  const [leads, setLeads] = useState([]);
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('Leads');
  const [page, setPage] = useState(1);
  const PER_PAGE = 10;

  const load = () => setLeads(leadsDB.getAll());
  useEffect(load, []);

  const filtered = leads.filter(l =>
    l.fullName?.toLowerCase().includes(search.toLowerCase()) ||
    l.email?.toLowerCase().includes(search.toLowerCase()) ||
    l.phone?.includes(search)
  );

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const handleDelete = (id) => {
    if (window.confirm('Delete this lead?')) {
      leadsDB.delete(id);
      load();
    }
  };

  const exportCSV = () => {
    const headers = ['ID','Full Name','Email','Phone','Created Date','Screen Type'];
    const rows = filtered.map(l => [l.id, l.fullName, l.email, l.phone, l.createdDate, l.screenType]);
    const csv = [headers, ...rows].map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'manas_leads.csv'; a.click();
  };

  return (
    <div className="fade-in">
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:24, flexWrap:'wrap', gap:12 }}>
        <h1 style={{ fontFamily:'Playfair Display', fontSize:'1.8rem', color:'#1B4332' }}>Leads</h1>
        <button onClick={exportCSV} className="btn btn-primary"><Download size={14} /> Export CSV</button>
      </div>

      {/* Filters */}
      <div style={{ background:'white', borderRadius:16, padding:'16px 20px', boxShadow:'0 2px 12px rgba(0,0,0,0.06)', marginBottom:20, display:'flex', alignItems:'center', gap:16, flexWrap:'wrap' }}>
        <span style={{ fontSize:14, color:'#5A7464' }}>Leads List <strong style={{ color:'#1B4332' }}>{filtered.length}</strong></span>
        <div style={{ position:'relative' }}>
          <Search size={14} style={{ position:'absolute', left:10, top:'50%', transform:'translateY(-50%)', color:'#5A7464' }} />
          <input value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} placeholder="Search leads..." className="form-input" style={{ paddingLeft:32, width:200 }} />
        </div>
        <select value={filterType} onChange={e => setFilterType(e.target.value)} className="form-input" style={{ width:140 }}>
          <option>Leads</option><option>All</option>
        </select>
        <select className="form-input" style={{ width:100 }}><option>All</option></select>
      </div>

      {/* TABLE */}
      <div style={{ background:'white', borderRadius:16, boxShadow:'0 2px 12px rgba(0,0,0,0.06)', overflow:'hidden' }}>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>ID</th><th>Full Name</th><th>Email</th><th>Phone</th>
                <th>Created Date</th><th>Screen Type</th><th>UTM Source</th>
                <th>UTM Medium</th><th>UTM Campaign</th><th>Action</th>
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr><td colSpan={10} style={{ textAlign:'center', padding:'48px 0', color:'#5A7464' }}>No leads found.</td></tr>
              ) : paginated.map((l, i) => (
                <tr key={l.id}>
                  <td style={{ fontWeight:600, color:'#5A7464' }}>{(page-1)*PER_PAGE+i+1}</td>
                  <td style={{ fontWeight:600, fontSize:13, color:'#1A2B22' }}>{l.fullName}</td>
                  <td style={{ fontSize:13, color:'#5A7464' }}>{l.email || '-'}</td>
                  <td style={{ fontSize:13 }}>{l.phone || '-'}</td>
                  <td style={{ fontSize:12, color:'#5A7464' }}>{l.createdDate}</td>
                  <td><span style={{ fontSize:12, background:'#EEF4F0', color:'#2D6A4F', padding:'3px 8px', borderRadius:6, fontWeight:600 }}>{l.screenType || '-'}</span></td>
                  <td style={{ fontSize:12, color:'#5A7464' }}>{l.utmSource || '-'}</td>
                  <td style={{ fontSize:12, color:'#5A7464' }}>{l.utmMedium || '-'}</td>
                  <td style={{ fontSize:12, color:'#5A7464' }}>{l.utmCampaign || '-'}</td>
                  <td>
                    <button onClick={() => handleDelete(l.id)} style={{ background:'none', color:'#E53E3E', display:'flex' }}><Trash2 size={14} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div style={{ display:'flex', justifyContent:'flex-end', gap:8, padding:'12px 20px', borderTop:'1px solid #E8F0EB' }}>
            <button onClick={() => setPage(p => Math.max(1, p-1))} disabled={page===1} className="btn btn-outline btn-sm">Prev</button>
            <button onClick={() => setPage(p => Math.min(totalPages, p+1))} disabled={page===totalPages} className="btn btn-primary btn-sm">Next</button>
          </div>
        )}
      </div>
    </div>
  );
}
