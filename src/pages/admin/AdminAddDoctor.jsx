import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { doctorsDB } from '../../data/db';
import { ArrowLeft, Upload, X, Image } from 'lucide-react';

const LOCATIONS = ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Hyderabad', 'Pune', 'Kolkata'];
const SPECIALIZATIONS = [
  'Psychiatry & Medication Management', 'CBT & Anxiety', 'Child & Adolescent Psychiatry',
  'Trauma & EMDR', 'Family & Couples Therapy', 'Mindfulness-Based Therapy',
  'DBT', 'Geriatric Counselling', 'General Counselling'
];
const DAYS = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
const TIME_SLOTS = ['09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00'];

export default function AdminAddDoctor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '+91',
    location: '', experience: '', degree: 'MBBS', university: '',
    passingYear: '', specialization: '', bio: '', status: 1,
    availability: { Mon:[], Tue:[], Wed:[], Thu:[], Fri:[], Sat:[], Sun:[] }
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const handleImageFile = (file) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file (JPG, PNG, etc.)');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert('Image must be less than 5MB');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = e.target.result;
      setImagePreview(base64);
      setForm(p => ({ ...p, image: base64 }));
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    handleImageFile(file);
  };

  const handleDragOver = (e) => { e.preventDefault(); setDragOver(true); };
  const handleDragLeave = () => setDragOver(false);

  const removeImage = () => {
    setImagePreview(null);
    setForm(p => ({ ...p, image: null }));
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  useEffect(() => {
    if (isEdit) {
      const doc = doctorsDB.getById(id);
      if (doc) {
        setForm({ ...doc });
        if (doc.image) setImagePreview(doc.image);
      }
    }
  }, [id, isEdit]);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(p => ({ ...p, [name]: value }));
  };

  const toggleSlot = (day, slot) => {
    setForm(p => {
      const daySlots = p.availability[day] || [];
      const updated = daySlots.includes(slot)
        ? daySlots.filter(s => s !== slot)
        : [...daySlots, slot].sort();
      return { ...p, availability: { ...p.availability, [day]: updated } };
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      if (isEdit) {
        doctorsDB.update(id, form);
      } else {
        doctorsDB.add(form);
      }
      setLoading(false);
      setSuccess(true);
      setTimeout(() => navigate('/admin/doctors'), 1200);
    }, 700);
  };

  return (
    <div className="fade-in">
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:24, flexWrap:'wrap', gap:12 }}>
        <div style={{ display:'flex', alignItems:'center', gap:12 }}>
          <Link to="/admin/doctors" style={{ display:'flex', alignItems:'center', gap:6, fontSize:14, color:'#5A7464' }}>
            <ArrowLeft size={15} /> {isEdit ? '< Edit Doctor' : '< Add Doctor'}
          </Link>
        </div>
        <button type="submit" form="doctor-form" disabled={loading} className="btn btn-primary">
          {loading ? 'Saving...' : success ? '✓ Saved!' : 'Add to List'}
        </button>
      </div>

      <form id="doctor-form" onSubmit={handleSubmit}>
        {/* PERSONAL DETAILS */}
        <div style={{ background:'white', borderRadius:16, padding:28, boxShadow:'0 2px 12px rgba(0,0,0,0.06)', marginBottom:20 }}>
          <h2 style={{ fontFamily:'Playfair Display', fontSize:'1.2rem', color:'#1B4332', marginBottom:24, paddingBottom:12, borderBottom:'1px solid #E8F0EB' }}>Personal Details</h2>
          <div className="grid-3">
            <div className="form-group">
              <label className="form-label">First Name *</label>
              <input name="firstName" value={form.firstName} onChange={handleChange} required className="form-input" placeholder="Enter First Name" />
            </div>
            <div className="form-group">
              <label className="form-label">Last Name *</label>
              <input name="lastName" value={form.lastName} onChange={handleChange} required className="form-input" placeholder="Enter Last Name" />
            </div>
            <div className="form-group">
              <label className="form-label">Mobile Number *</label>
              <input name="phone" value={form.phone} onChange={handleChange} required className="form-input" placeholder="+91" />
            </div>
            <div className="form-group">
              <label className="form-label">Email Id *</label>
              <input name="email" type="email" value={form.email} onChange={handleChange} required className="form-input" placeholder="xyz@gmail.com" />
            </div>
            <div className="form-group">
              <label className="form-label">Location</label>
              <select name="location" value={form.location} onChange={handleChange} className="form-input">
                <option value="">Select Location</option>
                {LOCATIONS.map(l => <option key={l}>{l}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Experience (years) *</label>
              <input name="experience" type="number" min="0" max="50" value={form.experience} onChange={handleChange} required className="form-input" placeholder="00" />
            </div>
            <div className="form-group">
              <label className="form-label">Degree *</label>
              <input name="degree" value={form.degree} onChange={handleChange} required className="form-input" placeholder="MBBS" />
            </div>
            <div className="form-group">
              <label className="form-label">University</label>
              <input name="university" value={form.university} onChange={handleChange} className="form-input" placeholder="xyz university" />
            </div>
            <div className="form-group">
              <label className="form-label">Passing Year</label>
              <input name="passingYear" type="number" min="1970" max="2030" value={form.passingYear} onChange={handleChange} className="form-input" placeholder="2019" />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Specialization *</label>
            <select name="specialization" value={form.specialization} onChange={handleChange} required className="form-input">
              <option value="">Select Specialization</option>
              {SPECIALIZATIONS.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Bio Description</label>
            <textarea name="bio" value={form.bio} onChange={handleChange} className="form-input" rows={5} placeholder="Write a professional bio for this doctor..." />
          </div>

          <div className="form-group">
            <label className="form-label">Status</label>
            <div style={{ display:'flex', gap:12 }}>
              {[['Active',1],['Inactive',0]].map(([l,v]) => (
                <label key={l} style={{ display:'flex', alignItems:'center', gap:6, cursor:'pointer', fontSize:14, padding:'8px 16px', border:`1.5px solid ${form.status === v ? '#2D6A4F' : '#D1D5DB'}`, borderRadius:8, background: form.status === v ? '#EEF4F0' : 'white' }}>
                  <input type="radio" name="status" value={v} checked={form.status === v} onChange={() => setForm(p => ({ ...p, status: v }))} style={{ display:'none' }} />
                  {l}
                </label>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Profile Image</label>

            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={e => handleImageFile(e.target.files[0])}
            />

            {imagePreview ? (
              /* IMAGE PREVIEW */
              <div style={{ position: 'relative', display: 'inline-block' }}>
                <img
                  src={imagePreview}
                  alt="Doctor profile"
                  style={{ width: 160, height: 160, objectFit: 'cover', borderRadius: 12, border: '2px solid #C8DDD1', display: 'block' }}
                />
                <button
                  type="button"
                  onClick={removeImage}
                  style={{ position: 'absolute', top: -8, right: -8, width: 28, height: 28, background: '#E53E3E', color: 'white', border: 'none', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 6px rgba(0,0,0,0.2)' }}
                >
                  <X size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  style={{ marginTop: 10, display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#2D6A4F', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}
                >
                  <Upload size={13} /> Change Image
                </button>
              </div>
            ) : (
              /* DRAG & DROP ZONE */
              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onClick={() => fileInputRef.current?.click()}
                style={{
                  border: `2px dashed ${dragOver ? '#2D6A4F' : '#C8DDD1'}`,
                  borderRadius: 12,
                  padding: '36px 24px',
                  textAlign: 'center',
                  background: dragOver ? '#EEF4F0' : '#F8FAF9',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                <div style={{ width: 52, height: 52, background: '#EEF4F0', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px' }}>
                  <Image size={24} color="#2D6A4F" />
                </div>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#1B4332', marginBottom: 6 }}>
                  {dragOver ? 'Drop image here' : 'Drag & Drop or Click to Upload'}
                </div>
                <div style={{ fontSize: 12, color: '#5A7464' }}>Supports JPG, PNG, WEBP · Max 5MB</div>
                <button
                  type="button"
                  onClick={e => { e.stopPropagation(); fileInputRef.current?.click(); }}
                  className="btn btn-primary btn-sm"
                  style={{ marginTop: 16 }}
                >
                  <Upload size={13} /> + Upload Image
                </button>
              </div>
            )}
          </div>
        </div>

        {/* AVAILABILITY */}
        <div style={{ background:'white', borderRadius:16, padding:28, boxShadow:'0 2px 12px rgba(0,0,0,0.06)', marginBottom:20 }}>
          <h2 style={{ fontFamily:'Playfair Display', fontSize:'1.2rem', color:'#1B4332', marginBottom:24, paddingBottom:12, borderBottom:'1px solid #E8F0EB' }}>Weekly Availability</h2>
          <p style={{ fontSize:13, color:'#5A7464', marginBottom:20 }}>Select the time slots when this doctor is available for appointments.</p>
          {DAYS.map(day => (
            <div key={day} style={{ display:'flex', alignItems:'center', gap:12, marginBottom:14, flexWrap:'wrap' }}>
              <div style={{ width:40, fontSize:13, fontWeight:700, color:'#1B4332' }}>{day}</div>
              <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
                {TIME_SLOTS.map(slot => {
                  const active = (form.availability[day] || []).includes(slot);
                  return (
                    <button key={slot} type="button" onClick={() => toggleSlot(day, slot)} style={{
                      padding:'5px 12px', borderRadius:6, fontSize:12, fontWeight:600, cursor:'pointer', transition:'all 0.15s',
                      background: active ? '#2D6A4F' : '#F0F7F2', color: active ? 'white' : '#2D6A4F',
                      border:`1px solid ${active ? '#2D6A4F' : '#C8DDD1'}`
                    }}>{slot}</button>
                  );
                })}
              </div>
              {(form.availability[day] || []).length === 0 && (
                <span style={{ fontSize:11, color:'#aaa', fontStyle:'italic' }}>No slots — day off</span>
              )}
            </div>
          ))}
        </div>

        {/* SUBMIT */}
        <div style={{ display:'flex', justifyContent:'flex-end', gap:12 }}>
          <Link to="/admin/doctors" className="btn btn-outline">Cancel</Link>
          <button type="submit" disabled={loading} className="btn btn-primary btn-lg">
            {loading ? 'Saving...' : success ? '✓ Saved!' : isEdit ? 'Update Doctor' : 'Add to List'}
          </button>
        </div>
      </form>
    </div>
  );
}
