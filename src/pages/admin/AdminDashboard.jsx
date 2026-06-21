import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { statsDB, doctorsDB, appointmentsDB } from '../../data/db';
import { Users, Calendar, Clock, AlertCircle, ArrowRight, Plus } from 'lucide-react';

function StatCard({ value, label, icon: Icon, color, bg }) {
  return (
    <div style={{ background:'white', borderRadius:16, padding:'24px 28px', boxShadow:'0 2px 12px rgba(0,0,0,0.06)', display:'flex', alignItems:'center', gap:20 }}>
      <div style={{ width:56, height:56, background:bg, borderRadius:14, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
        <Icon size={24} color={color} />
      </div>
      <div>
        <div style={{ fontFamily:'Playfair Display', fontSize:'2.2rem', fontWeight:700, color:'#C9A84C', lineHeight:1 }}>{String(value).padStart(2, '0')}</div>
        <div style={{ fontSize:13, color:'#5A7464', marginTop:4 }}>{label}</div>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const [stats, setStats] = useState({ totalDoctors:0, totalAppointments:0, todayAppointments:0, pendingAppointments:0, monthly:[] });
  const [recentAppts, setRecentAppts] = useState([]);
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    setStats(statsDB.get());
    setRecentAppts(appointmentsDB.getAll().slice(0, 5));
    setDoctors(doctorsDB.getAll());
  }, []);

  // Prepare monthly chart data
  const chartData = (() => {
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const year = new Date().getFullYear();
    return months.map((m, i) => {
      const key = `${year}-${String(i+1).padStart(2,'0')}`;
      const found = stats.monthly.find(x => x.month === key);
      return { month: `${m} ${year}`, count: found ? found.count : 0 };
    });
  })();

  return (
    <div className="fade-in">
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:28, flexWrap:'wrap', gap:12 }}>
        <h1 style={{ fontFamily:'Playfair Display', fontSize:'1.8rem', color:'#1B4332' }}>Dashboard</h1>
        <div style={{ display:'flex', gap:10 }}>
          <Link to="/admin/doctors/add" className="btn btn-primary btn-sm"><Plus size={14} /> Add Doctor</Link>
          <Link to="/admin/appointments" className="btn btn-outline btn-sm">View Appointments</Link>
        </div>
      </div>

      {/* STAT CARDS */}
      <div className="grid-4" style={{ marginBottom:28 }}>
        <StatCard value={stats.totalDoctors} label="Total Doctors" icon={Users} color="#2D6A4F" bg="#EEF4F0" />
        <StatCard value={stats.totalAppointments} label="Total Appointments" icon={Calendar} color="#3B82F6" bg="#EFF6FF" />
        <StatCard value={stats.todayAppointments} label="Today Appointments" icon={Clock} color="#7C3AED" bg="#EDE9FE" />
        <StatCard value={stats.pendingAppointments} label="Pending Appointments" icon={AlertCircle} color="#C9A84C" bg="#FEF3C7" />
      </div>

      {/* CHART */}
      <div style={{ background:'white', borderRadius:16, padding:28, boxShadow:'0 2px 12px rgba(0,0,0,0.06)', marginBottom:28 }}>
        <h2 style={{ fontFamily:'Playfair Display', fontSize:'1.2rem', color:'#1B4332', marginBottom:24 }}>Appointments Overview</h2>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={chartData} margin={{ top:0, right:0, left:-20, bottom:0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" vertical={false} />
            <XAxis dataKey="month" tick={{ fontSize:11, fill:'#5A7464' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize:11, fill:'#5A7464' }} axisLine={false} tickLine={false} allowDecimals={false} />
            <Tooltip contentStyle={{ borderRadius:8, border:'1px solid #E8F0EB', fontSize:13 }} cursor={{ fill:'rgba(45,106,79,0.05)' }} />
            <Bar dataKey="count" name="Appointments" fill="#C9A84C" radius={[6,6,0,0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* BOTTOM GRID */}
      <div style={{ display:'grid', gridTemplateColumns:'1.5fr 1fr', gap:24 }}>
        {/* RECENT APPOINTMENTS */}
        <div style={{ background:'white', borderRadius:16, padding:24, boxShadow:'0 2px 12px rgba(0,0,0,0.06)' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20 }}>
            <h2 style={{ fontFamily:'Playfair Display', fontSize:'1.1rem', color:'#1B4332' }}>Recent Appointments</h2>
            <Link to="/admin/appointments" style={{ fontSize:12, color:'#2D6A4F', fontWeight:600 }}>View All →</Link>
          </div>
          <div className="table-wrap">
            <table>
              <thead><tr><th>Patient</th><th>Doctor</th><th>Session</th><th>Status</th></tr></thead>
              <tbody>
                {recentAppts.map(a => (
                  <tr key={a.id}>
                    <td><div style={{ fontWeight:600, fontSize:13, color:'#1A2B22' }}>{a.patientName}</div><div style={{ fontSize:11, color:'#5A7464' }}>{a.consultationFor}</div></td>
                    <td style={{ fontSize:13, color:'#5A7464' }}>{a.doctor}</td>
                    <td><span style={{ fontSize:12, background:'#EEF4F0', color:'#2D6A4F', padding:'3px 8px', borderRadius:6, fontWeight:600 }}>{a.sessionType}</span></td>
                    <td><span className={`badge ${a.status === 'Booked' ? 'badge-green' : 'badge-yellow'}`}>{a.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* DOCTORS SUMMARY */}
        <div style={{ background:'white', borderRadius:16, padding:24, boxShadow:'0 2px 12px rgba(0,0,0,0.06)' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20 }}>
            <h2 style={{ fontFamily:'Playfair Display', fontSize:'1.1rem', color:'#1B4332' }}>Doctors</h2>
            <Link to="/admin/doctors" style={{ fontSize:12, color:'#2D6A4F', fontWeight:600 }}>View All →</Link>
          </div>
          {doctors.slice(0,5).map(doc => (
            <div key={doc.id} style={{ display:'flex', alignItems:'center', gap:12, padding:'10px 0', borderBottom:'1px solid #F0F0F0' }}>
              <div style={{ width:38, height:38, background:'linear-gradient(135deg,#EEF4F0,#D1FAE5)', borderRadius:10, display:'flex', alignItems:'center', justifyContent:'center', fontSize:18, flexShrink:0 }}>👩‍⚕️</div>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontSize:13, fontWeight:700, color:'#1A2B22', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{doc.firstName} {doc.lastName}</div>
                <div style={{ fontSize:11, color:'#5A7464' }}>{doc.totalAppointments} appointments</div>
              </div>
              <span className={`badge ${doc.status === 1 ? 'badge-green' : 'badge-red'}`}>{doc.status === 1 ? 'Active' : 'Inactive'}</span>
            </div>
          ))}
          <Link to="/admin/doctors/add" className="btn btn-primary btn-sm" style={{ width:'100%', justifyContent:'center', marginTop:16 }}>
            <Plus size={13} /> Add New Doctor
          </Link>
        </div>
      </div>
    </div>
  );
}
