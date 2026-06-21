import React, { useState, useEffect } from 'react';
import { appointmentsDB, doctorsDB } from '../../data/db';
import { ArrowRight, CheckCircle } from 'lucide-react';

const CONCERNS = [
  'Anxiety & Stress', 'Mood & Depression', 'Trauma & Abuse',
  'Relationships & Family', 'Children & Adolescents', 'Work & Burnout',
  'Sleep Disorder', 'Self-Harm', 'Psychiatry & Medication', 'Other'
];

export default function BookConsultationPage() {
  const [step, setStep] = useState(1);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [booked, setBooked] = useState(false);
  const [form, setForm] = useState({
    patientName: '', email: '', contact: '', age: '', gender: '',
    consultationFor: '', sessionType: 'Online', doctor: '',
    slot: '', location: '', notes: ''
  });

  useEffect(() => {
    setDoctors(doctorsDB.getAll().filter(d => d.status === 1));
  }, []);

  const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = e => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      appointmentsDB.add(form);
      setLoading(false);
      setBooked(true);
    }, 1000);
  };

  const isStep1Valid = form.patientName && form.email && form.contact && form.age && form.gender;
  const isStep2Valid = form.consultationFor && form.doctor;
  const isStep3Valid = form.slot;

  if (booked) {
    return (
      <div className="fade-in" style={{ minHeight:'80vh', display:'flex', alignItems:'center', justifyContent:'center', padding:'80px 24px' }}>
        <div style={{ textAlign:'center', maxWidth:480 }}>
          <div style={{ width:80, height:80, background:'#EEF4F0', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 24px' }}>
            <CheckCircle size={40} color="#2D6A4F" />
          </div>
          <h2 style={{ fontFamily:'Playfair Display', fontSize:'2rem', color:'#1B4332', marginBottom:12 }}>Appointment Booked!</h2>
          <p style={{ color:'#5A7464', lineHeight:1.7, marginBottom:8 }}>
            Thank you, <strong>{form.patientName}</strong>. Your consultation has been successfully booked.
          </p>
          <p style={{ color:'#5A7464', fontSize:14, marginBottom:32 }}>
            A confirmation will be sent to <strong>{form.email}</strong>. Our team will reach you at <strong>{form.contact}</strong> to confirm the slot.
          </p>
          <div style={{ background:'#F8FAF9', borderRadius:16, padding:20, marginBottom:28, textAlign:'left' }}>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
              {[
                ['Doctor', form.doctor],
                ['Session', form.sessionType],
                ['Concern', form.consultationFor],
                ['Slot', form.slot],
              ].map(([k, v]) => (
                <div key={k}>
                  <div style={{ fontSize:11, fontWeight:700, color:'#5A7464', textTransform:'uppercase', letterSpacing:1 }}>{k}</div>
                  <div style={{ fontSize:14, color:'#1B4332', fontWeight:600, marginTop:2 }}>{v}</div>
                </div>
              ))}
            </div>
          </div>
          <button onClick={() => { setBooked(false); setStep(1); setForm({ patientName:'', email:'', contact:'', age:'', gender:'', consultationFor:'', sessionType:'Online', doctor:'', slot:'', location:'', notes:'' }); }}
            className="btn btn-primary">Book Another <ArrowRight size={14} /></button>
        </div>
      </div>
    );
  }

  return (
    <div className="fade-in">
      <div className="page-hero" style={{ paddingBottom:40 }}>
        <div className="container">
          <h1>Book a Consultation</h1>
          <p>Take the first step toward better mental health. Fill in your details below and we'll confirm your slot.</p>
        </div>
      </div>

      <section className="section" style={{ background:'white' }}>
        <div className="container" style={{ maxWidth:720 }}>

          {/* STEPS INDICATOR */}
          <div style={{ display:'flex', alignItems:'center', marginBottom:48, justifyContent:'center' }}>
            {[1,2,3].map((s, i) => (
              <React.Fragment key={s}>
                <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:8 }}>
                  <div style={{
                    width:40, height:40, borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center',
                    background: step >= s ? '#2D6A4F' : '#E8F0EB',
                    color: step >= s ? 'white' : '#5A7464', fontWeight:700, fontSize:15, transition:'all 0.3s'
                  }}>{step > s ? '✓' : s}</div>
                  <div style={{ fontSize:12, fontWeight:600, color: step >= s ? '#2D6A4F' : '#5A7464', whiteSpace:'nowrap' }}>
                    {['Personal Info', 'Consultation', 'Slot & Confirm'][i]}
                  </div>
                </div>
                {i < 2 && <div style={{ flex:1, height:2, background: step > s ? '#2D6A4F' : '#E8F0EB', margin:'0 12px', marginBottom:24, transition:'background 0.3s' }}></div>}
              </React.Fragment>
            ))}
          </div>

          <form onSubmit={handleSubmit}>
            {/* STEP 1: PERSONAL INFO */}
            {step === 1 && (
              <div className="card fade-in">
                <h3 style={{ fontFamily:'Playfair Display', fontSize:'1.4rem', color:'#1B4332', marginBottom:24 }}>Personal Information</h3>
                <div className="grid-2">
                  <div className="form-group">
                    <label className="form-label">Full Name *</label>
                    <input name="patientName" value={form.patientName} onChange={handleChange} required className="form-input" placeholder="Enter your full name" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email Address *</label>
                    <input name="email" type="email" value={form.email} onChange={handleChange} required className="form-input" placeholder="your@email.com" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Phone Number *</label>
                    <input name="contact" value={form.contact} onChange={handleChange} required className="form-input" placeholder="+91 00000 00000" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Age *</label>
                    <input name="age" type="number" min="5" max="100" value={form.age} onChange={handleChange} required className="form-input" placeholder="Your age" />
                  </div>
                  <div className="form-group" style={{ gridColumn:'span 2' }}>
                    <label className="form-label">Gender *</label>
                    <div style={{ display:'flex', gap:12, flexWrap:'wrap' }}>
                      {['Male','Female','Non-binary','Prefer not to say'].map(g => (
                        <label key={g} style={{ display:'flex', alignItems:'center', gap:6, cursor:'pointer', fontSize:14, color:'#1A2B22', padding:'8px 16px', border:`1.5px solid ${form.gender === g ? '#2D6A4F' : '#D1D5DB'}`, borderRadius:8, background: form.gender === g ? '#EEF4F0' : 'white', transition:'all 0.15s' }}>
                          <input type="radio" name="gender" value={g} checked={form.gender === g} onChange={handleChange} style={{ display:'none' }} />
                          {g}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
                <div style={{ display:'flex', justifyContent:'flex-end', marginTop:8 }}>
                  <button type="button" onClick={() => setStep(2)} disabled={!isStep1Valid} className="btn btn-primary">
                    Next: Consultation Details <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: CONSULTATION */}
            {step === 2 && (
              <div className="card fade-in">
                <h3 style={{ fontFamily:'Playfair Display', fontSize:'1.4rem', color:'#1B4332', marginBottom:24 }}>Consultation Details</h3>
                <div className="form-group">
                  <label className="form-label">What are you seeking help for? *</label>
                  <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(160px,1fr))', gap:8 }}>
                    {CONCERNS.map(c => (
                      <label key={c} style={{ display:'flex', alignItems:'center', gap:8, cursor:'pointer', fontSize:13, color:'#1A2B22', padding:'10px 14px', border:`1.5px solid ${form.consultationFor === c ? '#2D6A4F' : '#D1D5DB'}`, borderRadius:8, background: form.consultationFor === c ? '#EEF4F0' : 'white', transition:'all 0.15s' }}>
                        <input type="radio" name="consultationFor" value={c} checked={form.consultationFor === c} onChange={handleChange} style={{ display:'none' }} />
                        {c}
                      </label>
                    ))}
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Session Type *</label>
                  <div style={{ display:'flex', gap:12 }}>
                    {['Online','In-Person'].map(s => (
                      <label key={s} style={{ display:'flex', alignItems:'center', gap:8, cursor:'pointer', fontSize:14, padding:'10px 20px', border:`1.5px solid ${form.sessionType === s ? '#2D6A4F' : '#D1D5DB'}`, borderRadius:8, background: form.sessionType === s ? '#EEF4F0' : 'white', transition:'all 0.15s' }}>
                        <input type="radio" name="sessionType" value={s} checked={form.sessionType === s} onChange={handleChange} style={{ display:'none' }} />
                        {s === 'Online' ? '💻' : '🏥'} {s}
                      </label>
                    ))}
                  </div>
                </div>
                {form.sessionType === 'In-Person' && (
                  <div className="form-group">
                    <label className="form-label">Preferred Location</label>
                    <select name="location" value={form.location} onChange={handleChange} className="form-input">
                      <option value="">Select location</option>
                      <option>Bengaluru - Main Clinic</option>
                    </select>
                  </div>
                )}
                <div className="form-group">
                  <label className="form-label">Select Therapist *</label>
                  <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
                    {doctors.map(doc => (
                      <label key={doc.id} style={{ cursor:'pointer', borderRadius:12, border:`1.5px solid ${form.doctor === `${doc.firstName} ${doc.lastName}` ? '#2D6A4F' : '#D1D5DB'}`, background: form.doctor === `${doc.firstName} ${doc.lastName}` ? '#EEF4F0' : 'white', padding:14, transition:'all 0.15s', display:'flex', gap:12, alignItems:'center' }}>
                        <input type="radio" name="doctor" value={`${doc.firstName} ${doc.lastName}`} checked={form.doctor === `${doc.firstName} ${doc.lastName}`} onChange={handleChange} style={{ display:'none' }} />
                        <div style={{ width:36, height:36, background:'linear-gradient(135deg,#EEF4F0,#D1FAE5)', borderRadius:8, display:'flex', alignItems:'center', justifyContent:'center', fontSize:20, flexShrink:0 }}>👩‍⚕️</div>
                        <div>
                          <div style={{ fontSize:13, fontWeight:700, color:'#1B4332' }}>{doc.firstName} {doc.lastName}</div>
                          <div style={{ fontSize:11, color:'#5A7464' }}>{doc.specialization}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
                <div style={{ display:'flex', justifyContent:'space-between', marginTop:8 }}>
                  <button type="button" onClick={() => setStep(1)} className="btn btn-outline">← Back</button>
                  <button type="button" onClick={() => setStep(3)} disabled={!isStep2Valid} className="btn btn-primary">Next: Pick a Slot <ArrowRight size={14} /></button>
                </div>
              </div>
            )}

            {/* STEP 3: SLOT & CONFIRM */}
            {step === 3 && (
              <div className="card fade-in">
                <h3 style={{ fontFamily:'Playfair Display', fontSize:'1.4rem', color:'#1B4332', marginBottom:24 }}>Choose Your Slot</h3>
                <div className="form-group">
                  <label className="form-label">Preferred Date & Time *</label>
                  <input name="slot" type="datetime-local" value={form.slot} onChange={handleChange} required className="form-input"
                    min={new Date().toISOString().slice(0,16)} />
                </div>
                <div className="form-group">
                  <label className="form-label">Additional Notes (optional)</label>
                  <textarea name="notes" value={form.notes} onChange={handleChange} className="form-input" rows={4}
                    placeholder="Is there anything else you'd like us to know before your session?" />
                </div>

                {/* SUMMARY */}
                <div style={{ background:'#F8FAF9', borderRadius:12, padding:20, marginBottom:20 }}>
                  <div style={{ fontSize:13, fontWeight:700, color:'#1B4332', marginBottom:12 }}>📋 Booking Summary</div>
                  <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
                    {[
                      ['Patient', form.patientName],
                      ['Email', form.email],
                      ['Phone', form.contact],
                      ['Doctor', form.doctor],
                      ['Concern', form.consultationFor],
                      ['Session', form.sessionType],
                    ].map(([k,v]) => (
                      <div key={k}>
                        <div style={{ fontSize:11, fontWeight:600, color:'#5A7464', textTransform:'uppercase', letterSpacing:0.8 }}>{k}</div>
                        <div style={{ fontSize:13, color:'#1A2B22', marginTop:2 }}>{v || '—'}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ display:'flex', justifyContent:'space-between', marginTop:8 }}>
                  <button type="button" onClick={() => setStep(2)} className="btn btn-outline">← Back</button>
                  <button type="submit" disabled={!isStep3Valid || loading} className="btn btn-primary btn-lg">
                    {loading ? 'Booking...' : 'Confirm Booking ✓'}
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </section>
    </div>
  );
}
