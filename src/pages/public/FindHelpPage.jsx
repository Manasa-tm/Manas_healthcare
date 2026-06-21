import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const CONCERNS = [
  { id:'anxiety', emoji:'😟', title:'Anxiety & Stress', desc:'Persistent worry, panic attacks, or overwhelm? Evidence-based therapies like CBT and mindfulness can help you reclaim calm and control.', therapies:['CBT','Mindfulness-Based Therapy','Breathwork'] },
  { id:'mood', emoji:'😔', title:'Mood & Emotions', desc:'Depression, low mood, or emotional dysregulation can affect every aspect of your life. Our therapists help you understand and shift these patterns.', therapies:['CBT','DBT','Behavioural Activation'] },
  { id:'trauma', emoji:'💔', title:'Trauma & Abuse', desc:'Whether recent or from the past, trauma leaves lasting marks. EMDR, trauma-focused CBT, and somatic approaches can bring relief and recovery.', therapies:['EMDR','Trauma-Focused CBT','Somatic Therapy'] },
  { id:'child', emoji:'🧒', title:'Children & Adolescents', desc:'Children and teenagers have unique emotional needs. Our specialists use play therapy, art therapy, and family approaches tailored to young minds.', therapies:['Play Therapy','Art Therapy','Family Therapy'] },
  { id:'relationships', emoji:'💑', title:'Relationships & Family', desc:'Conflict, communication breakdowns, grief, or life transitions — we help couples and families rebuild connection and navigate challenges together.', therapies:['Couples Counselling','Family Therapy','Attachment-Based Therapy'] },
  { id:'selfharm', emoji:'🆘', title:'Self-Harm & Suicidal Thoughts', desc:'If you or someone you love is struggling with self-harm or suicidal thoughts, please reach out immediately. You are not alone.', therapies:['DBT','Crisis Support','Safety Planning'], urgent: true },
  { id:'sleep', emoji:'😴', title:'Sleep Disorders', desc:'Insomnia, sleep anxiety, or disrupted sleep patterns can worsen mental and physical health. We offer targeted sleep-focused therapy.', therapies:['CBT for Insomnia (CBT-I)','Sleep Hygiene','Mindfulness'] },
  { id:'work', emoji:'🏢', title:'Work & Burnout', desc:'Workplace stress, burnout, and career transitions demand attention. We help professionals build resilience and rediscover meaning.', therapies:['Stress Management','CBT','Executive Coaching'] },
  { id:'growth', emoji:'🌿', title:'Self-Growth & Wellbeing', desc:'Not every reason to see a therapist involves crisis. Many people seek therapy for personal growth, confidence, and a more fulfilling life.', therapies:['Psychotherapy','Positive Psychology','Mindfulness'] },
];

const THERAPY_TYPES = [
  { abbr:'CBT', name:'Cognitive Behaviour Therapy', desc:'CBT helps identify and change negative thought patterns that drive unhelpful behaviours and emotions. It is one of the most researched and effective therapies.' },
  { abbr:'DBT', name:'Dialectical Behaviour Therapy', desc:'DBT combines mindfulness with skills for emotional regulation, distress tolerance, and interpersonal effectiveness. Originally developed for BPD, now used broadly.' },
  { abbr:'EMDR', name:'Eye Movement Desensitisation Reprocessing', desc:'EMDR is a structured therapy specifically designed to reduce the distress associated with traumatic memories. It involves guided eye movements or tapping.' },
  { abbr:'MBT', name:'Mindfulness-Based Therapy', desc:'Incorporating mindfulness practices into therapy helps clients stay present, reduce rumination, and develop a compassionate relationship with themselves.' },
  { abbr:'FCT', name:'Family & Couples Therapy', desc:'Addresses relationship dynamics, communication patterns, and unresolved conflicts within couples or family systems to foster healthier relationships.' },
  { abbr:'PSY', name:'Psychiatry & Medication Management', desc:'Our psychiatrists conduct thorough evaluations and manage medications when required, working alongside therapists for integrated care.' },
];

export default function FindHelpPage() {
  return (
    <div className="fade-in">
      <div className="page-hero">
        <div className="container">
          <h1>Find Help</h1>
          <p>Whatever you're going through, there is support available. Explore concerns and therapies to find the right path for you.</p>
        </div>
      </div>

      {/* CONCERNS */}
      <section className="section" style={{ background:'white' }} id="concerns">
        <div className="container">
          <div className="text-center" style={{ marginBottom:48 }}>
            <div style={{ fontSize:12, fontWeight:700, letterSpacing:2, color:'#2D6A4F', textTransform:'uppercase', marginBottom:10 }}>By Concern</div>
            <h2 style={{ fontSize:'2rem', color:'#1B4332' }}>What Are You Dealing With?</h2>
          </div>
          <div className="grid-3">
            {CONCERNS.map(c => (
              <div key={c.id} id={c.id} style={{ background: c.urgent ? 'linear-gradient(135deg,#FFF5F5,#FEE2E2)' : '#F8FAF9', borderRadius:16, padding:28, border: c.urgent ? '2px solid #E53E3E' : '1.5px solid #E8F0EB' }}>
                <div style={{ fontSize:40, marginBottom:16 }}>{c.emoji}</div>
                <h3 style={{ fontFamily:'Playfair Display', fontSize:'1.2rem', color: c.urgent ? '#E53E3E' : '#1B4332', marginBottom:10 }}>{c.title}</h3>
                <p style={{ fontSize:13, color:'#5A7464', lineHeight:1.7, marginBottom:16 }}>{c.desc}</p>
                <div style={{ display:'flex', flexWrap:'wrap', gap:6, marginBottom:20 }}>
                  {c.therapies.map(t => <span key={t} style={{ fontSize:11, background:'#EEF4F0', color:'#2D6A4F', padding:'3px 10px', borderRadius:20, fontWeight:600 }}>{t}</span>)}
                </div>
                <Link to="/book-consultation" className="btn btn-primary btn-sm">
                  Get Support <ArrowRight size={12} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* THERAPIES */}
      <section className="section" style={{ background:'#F8FAF9' }} id="therapies">
        <div className="container">
          <div className="text-center" style={{ marginBottom:48 }}>
            <div style={{ fontSize:12, fontWeight:700, letterSpacing:2, color:'#2D6A4F', textTransform:'uppercase', marginBottom:10 }}>By Therapy</div>
            <h2 style={{ fontSize:'2rem', color:'#1B4332' }}>Our Therapeutic Approaches</h2>
          </div>
          <div className="grid-3">
            {THERAPY_TYPES.map(t => (
              <div key={t.abbr} style={{ background:'white', borderRadius:16, padding:28, boxShadow:'0 2px 12px rgba(0,0,0,0.06)' }}>
                <div style={{ width:48, height:48, background:'linear-gradient(135deg,#2D6A4F,#52B788)', borderRadius:10, display:'flex', alignItems:'center', justifyContent:'center', marginBottom:16 }}>
                  <span style={{ color:'white', fontWeight:700, fontSize:13 }}>{t.abbr}</span>
                </div>
                <h3 style={{ fontFamily:'inherit', fontSize:15, fontWeight:700, color:'#1B4332', marginBottom:10 }}>{t.name}</h3>
                <p style={{ fontSize:13, color:'#5A7464', lineHeight:1.7 }}>{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CRISIS BOX */}
      <section style={{ background:'#1B4332', color:'white', padding:'48px 0' }}>
        <div className="container text-center">
          <h2 style={{ fontSize:'1.8rem', marginBottom:12 }}>In Crisis? Reach Out Now.</h2>
          <p style={{ opacity:0.85, maxWidth:480, margin:'0 auto 24px' }}>
            If you or someone you know is in immediate danger, please contact emergency services or a crisis helpline immediately.
          </p>
          <div style={{ display:'flex', gap:16, justifyContent:'center', flexWrap:'wrap' }}>
            <div style={{ background:'rgba(255,255,255,0.1)', borderRadius:10, padding:'12px 24px', fontSize:14 }}>Call: <strong>9152987821</strong></div>
            <div style={{ background:'rgba(255,255,255,0.1)', borderRadius:10, padding:'12px 24px', fontSize:14 }}>Manas Foundation: <strong>1860-2662-345</strong></div>
            <div style={{ background:'rgba(255,255,255,0.1)', borderRadius:10, padding:'12px 24px', fontSize:14 }}>Emergency: <strong>112</strong></div>
          </div>
        </div>
      </section>
    </div>
  );
}
