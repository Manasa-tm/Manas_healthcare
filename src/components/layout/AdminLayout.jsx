import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { authDB } from '../../data/db';
import {
  LayoutDashboard, Users, CalendarCheck, UserCheck,
  HelpCircle, Palmtree, LogOut, Menu, X, Bell
} from 'lucide-react';
import logo from "../../assets/manashealthlogo.png";

const MENU = [
  { label: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
  { label: 'Doctors', path: '/admin/doctors', icon: Users },
  { label: 'Appointments', path: '/admin/appointments', icon: CalendarCheck },
  { label: 'Leads', path: '/admin/leads', icon: UserCheck },
  { label: 'FAQs', path: '/admin/faqs', icon: HelpCircle },
  { label: 'Holiday', path: '/admin/holidays', icon: Palmtree },
];

export default function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = () => {
    authDB.logout();
    navigate('/admin/login');
  };

  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <div style={{ display:'flex', minHeight:'100vh', background:'#F4F7F5' }}>
      {/* SIDEBAR */}
      <aside style={{
        width: collapsed ? 64 : 240, background:'white', boxShadow:'2px 0 16px rgba(0,0,0,0.06)',
        display:'flex', flexDirection:'column', position:'fixed', top:0, left:0, height:'100vh',
        transition:'width 0.25s', zIndex:50, overflow:'hidden'
      }}>
        {/* Logo */}
        <div style={{ padding:'20px 16px', display:'flex', alignItems:'center', gap:10, borderBottom:'1px solid #E8F0EB', minHeight:70 }}>
          <div
  style={{
    width: 50,
    height: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }}
>
  <img
    src={logo}
    alt="Manas Healthcare Logo"
    style={{
      width: '100%',
      height: '100%',
      objectFit: 'contain'
    }}
  />
</div>
          {!collapsed && (
            <div>
              <div style={{ fontFamily:'Playfair Display', fontSize:15, fontWeight:700, color:'#1B4332' }}>Manas</div>
              <div style={{ fontSize:9, color:'#5A7464', letterSpacing:1.5, textTransform:'uppercase', fontWeight:600 }}>Healthcare Admin</div>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav style={{ flex:1, padding:'12px 8px', overflowY:'auto' }}>
          {MENU.map(item => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <Link key={item.path} to={item.path} title={collapsed ? item.label : undefined} style={{
                display:'flex', alignItems:'center', gap:12, padding:'11px 12px', borderRadius:8, marginBottom:4,
                background: active ? 'linear-gradient(90deg, #EEF4F0, #D1FAE5)' : 'transparent',
                color: active ? '#1B4332' : '#5A7464', fontWeight: active ? 600 : 400,
                fontSize:14, textDecoration:'none', transition:'all 0.15s', whiteSpace:'nowrap',
                borderLeft: active ? '3px solid #2D6A4F' : '3px solid transparent',
              }}>
                <Icon size={18} style={{ flexShrink:0 }} />
                {!collapsed && item.label}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div style={{ padding:'12px 8px', borderTop:'1px solid #E8F0EB' }}>
          <button onClick={handleLogout} style={{
            display:'flex', alignItems:'center', gap:12, padding:'11px 12px', borderRadius:8,
            background:'none', color:'#E53E3E', fontWeight:500, fontSize:14, width:'100%', whiteSpace:'nowrap'
          }}>
            <LogOut size={18} />
            {!collapsed && 'LogOut'}
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <div style={{ marginLeft: collapsed ? 64 : 240, flex:1, display:'flex', flexDirection:'column', transition:'margin-left 0.25s' }}>
        {/* Top bar */}
        <header style={{ height:60, background:'white', boxShadow:'0 1px 8px rgba(0,0,0,0.06)', display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 24px', position:'sticky', top:0, zIndex:40 }}>
          <div style={{ display:'flex', alignItems:'center', gap:16 }}>
            <button onClick={() => setCollapsed(!collapsed)} style={{ background:'none', color:'#5A7464' }}>
              {collapsed ? <Menu size={20} /> : <X size={20} />}
            </button>
            <div style={{ fontSize:13, color:'#5A7464' }}>
              {MENU.find(m => isActive(m.path))?.label || 'Admin'}
            </div>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:16 }}>
            <button style={{ background:'none', color:'#5A7464', position:'relative' }}>
              <Bell size={18} />
              <span style={{ position:'absolute', top:-2, right:-2, width:8, height:8, background:'#E53E3E', borderRadius:'50%' }}></span>
            </button>
            <div style={{ display:'flex', alignItems:'center', gap:8 }}>
              <div style={{ width:32, height:32, background:'linear-gradient(135deg,#2D6A4F,#52B788)', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center' }}>
                <span style={{ color:'white', fontSize:13, fontWeight:700 }}>A</span>
              </div>
              <span style={{ fontSize:14, fontWeight:600, color:'#1A2B22' }}>Admin</span>
            </div>
          </div>
        </header>

        {/* Content */}
        <main style={{ flex:1, padding:24 }}>
          <Outlet />
        </main>

        <footer style={{ padding:'16px 24px', fontSize:13, color:'#5A7464', borderTop:'1px solid #E8F0EB', background:'white', textAlign:'center' }}>
          © 2026 Manas Healthcare. All rights reserved.
        </footer>
      </div>
    </div>
  );
}
