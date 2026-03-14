'use client';

import { useState } from 'react';
import PlanCard from '@/components/PlanCard';

type TimeSlot = {
  activity: string;
  description: string;
  tip: string;
};

type DayPlan = {
  day: number;
  title: string;
  morning: TimeSlot;
  afternoon: TimeSlot;
  evening: TimeSlot;
};

type TravelPlan = {
  city: string;
  days: DayPlan[];
};

const INTERESTS = ['Culture & History', 'Food & Dining', 'Nature & Outdoors', 'Art & Museums', 'Nightlife', 'Shopping'];

export default function HomePage() {
  const [city, setCity] = useState('');
  const [days, setDays] = useState(3);
  const [interests, setInterests] = useState<string[]>([]);
  const [plan, setPlan] = useState<TravelPlan | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const toggleInterest = (interest: string) => {
    setInterests((prev) =>
      prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!city.trim()) return;
    setLoading(true);
    setError('');
    setPlan(null);

    try {
      const res = await fetch('/api/plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ city, days, interests: interests.join(', ') }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Something went wrong.');
      setPlan(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#0a0a0f', fontFamily: "'DM Sans', sans-serif", color: '#fff' }}>

      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,700;1,700&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .glow-btn {
          position: relative;
          overflow: hidden;
          transition: transform 0.2s;
        }
        .glow-btn:hover { transform: translateY(-2px); }
        .glow-btn::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.15), transparent);
          opacity: 0;
          transition: opacity 0.2s;
        }
        .glow-btn:hover::after { opacity: 1; }

        .interest-chip {
          transition: all 0.2s;
          cursor: pointer;
          border: none;
          font-family: 'DM Sans', sans-serif;
        }
        .interest-chip:hover { transform: translateY(-1px); }

        .card-fade {
          animation: fadeUp 0.5s ease forwards;
          opacity: 0;
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        input[type=range] {
          -webkit-appearance: none;
          height: 4px;
          border-radius: 2px;
          background: linear-gradient(to right, #f97316, #ec4899);
          outline: none;
          width: 100%;
        }
        input[type=range]::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #fff;
          cursor: pointer;
          box-shadow: 0 0 8px rgba(249,115,22,0.6);
        }

        ::placeholder { color: rgba(255,255,255,0.25); }

        .mesh-bg {
          background-color: #0a0a0f;
          background-image:
            radial-gradient(ellipse 80% 60% at 20% 0%, rgba(249,115,22,0.12) 0%, transparent 60%),
            radial-gradient(ellipse 60% 50% at 80% 100%, rgba(139,92,246,0.1) 0%, transparent 60%),
            radial-gradient(ellipse 40% 40% at 50% 50%, rgba(236,72,153,0.06) 0%, transparent 70%);
        }
      `}</style>

      {/* BG mesh */}
      <div className="mesh-bg" style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }} />

      <div style={{ position: 'relative', zIndex: 1 }}>

        {/* HERO */}
        <div style={{ maxWidth: '760px', margin: '0 auto', padding: '100px 24px 64px', textAlign: 'center' }}>

          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(249,115,22,0.15)', border: '1px solid rgba(249,115,22,0.3)', borderRadius: '100px', padding: '6px 16px', marginBottom: '40px' }}>
            <span style={{ fontSize: '14px' }}>✈️</span>
            <span style={{ fontSize: '12px', fontWeight: 500, color: '#fb923c', letterSpacing: '0.05em' }}>Powered by Gemini AI</span>
          </div>

          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(44px, 7vw, 80px)', fontWeight: 700, lineHeight: 1.05, marginBottom: '24px' }}>
            Your Dream Trip,{' '}
            <em style={{ color: '#f97316', fontStyle: 'italic' }}>Planned</em>
            <br />in Seconds.
          </h1>

          <p style={{ fontSize: '17px', fontWeight: 300, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, maxWidth: '480px', margin: '0 auto 56px' }}>
            Enter any destination and get a personalized day-by-day itinerary crafted by AI — morning, afternoon & evening.
          </p>

          {/* FORM */}
          <form onSubmit={handleSubmit}
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '24px', padding: '40px', textAlign: 'left', backdropFilter: 'blur(12px)' }}>

            {/* City input */}
            <div style={{ marginBottom: '32px' }}>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: '12px' }}>
                Destination
              </label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', fontSize: '18px' }}>🌍</span>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Tokyo, Paris, Istanbul..."
                  required
                  style={{ width: '100%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '16px 16px 16px 48px', fontSize: '16px', color: '#fff', outline: 'none', fontFamily: "'DM Sans', sans-serif", transition: 'border-color 0.2s' }}
                  onFocus={(e) => e.target.style.borderColor = 'rgba(249,115,22,0.5)'}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                />
              </div>
            </div>

            {/* Days slider */}
            <div style={{ marginBottom: '32px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <label style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>
                  Duration
                </label>
                <span style={{ fontSize: '22px', fontWeight: 600, color: '#f97316' }}>
                  {days} <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', fontWeight: 400 }}>{days === 1 ? 'day' : 'days'}</span>
                </span>
              </div>
              <input type="range" min={1} max={7} value={days} onChange={(e) => setDays(Number(e.target.value))} />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
                {[1,2,3,4,5,6,7].map((n) => (
                  <span key={n} style={{ fontSize: '11px', color: n === days ? '#f97316' : 'rgba(255,255,255,0.2)', fontWeight: n === days ? 600 : 400, transition: 'color 0.2s' }}>{n}</span>
                ))}
              </div>
            </div>

            {/* Interests */}
            <div style={{ marginBottom: '36px' }}>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: '14px' }}>
                Interests <span style={{ color: 'rgba(255,255,255,0.2)', textTransform: 'none', letterSpacing: 0 }}>(optional)</span>
              </label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {INTERESTS.map((interest) => {
                  const active = interests.includes(interest);
                  return (
                    <button
                      key={interest}
                      type="button"
                      onClick={() => toggleInterest(interest)}
                      className="interest-chip"
                      style={{
                        padding: '8px 16px',
                        borderRadius: '100px',
                        fontSize: '13px',
                        fontWeight: 500,
                        background: active ? 'linear-gradient(135deg, #f97316, #ec4899)' : 'rgba(255,255,255,0.06)',
                        color: active ? '#fff' : 'rgba(255,255,255,0.5)',
                        border: active ? 'none' : '1px solid rgba(255,255,255,0.1)',
                        boxShadow: active ? '0 4px 15px rgba(249,115,22,0.3)' : 'none',
                      }}
                    >
                      {interest}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="glow-btn"
              style={{
                width: '100%',
                padding: '18px',
                borderRadius: '14px',
                border: 'none',
                background: loading ? 'rgba(249,115,22,0.3)' : 'linear-gradient(135deg, #f97316 0%, #ec4899 100%)',
                color: '#fff',
                fontSize: '15px',
                fontWeight: 600,
                cursor: loading ? 'not-allowed' : 'pointer',
                fontFamily: "'DM Sans', sans-serif",
                letterSpacing: '0.02em',
                boxShadow: loading ? 'none' : '0 8px 30px rgba(249,115,22,0.35)',
              }}
            >
              {loading ? (
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                  <svg style={{ animation: 'spin 1s linear infinite', width: '16px', height: '16px' }} viewBox="0 0 24 24" fill="none">
                    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                    <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="3"/>
                    <path d="M12 2a10 10 0 0 1 10 10" stroke="#fff" strokeWidth="3" strokeLinecap="round"/>
                  </svg>
                  Creating your itinerary...
                </span>
              ) : '✈️ Generate Travel Plan'}
            </button>

            {error && (
              <p style={{ marginTop: '16px', fontSize: '13px', color: '#f87171', textAlign: 'center' }}>{error}</p>
            )}
          </form>
        </div>

        {/* PLAN */}
        {plan && (
          <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 24px 100px' }}>
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 700 }}>
                {plan.days.length} Days in{' '}
                <span style={{ color: '#f97316' }}>{plan.city}</span>
              </h2>
              <p style={{ marginTop: '12px', fontSize: '14px', color: 'rgba(255,255,255,0.35)' }}>Your personalized itinerary is ready ↓</p>
              <button
                onClick={() => window.print()}
                style={{
                  padding: '12px 28px',
                  borderRadius: '12px',
                  border: 'none',
                  background: 'linear-gradient(135deg, #f97316, #ec4899)',
                  color: '#fff',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  marginBottom: '32px',
                }}
              >
                🖨️ Save as PDF
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {plan.days.map((day, i) => (
                <div key={day.day} className="card-fade" style={{ animationDelay: i * 0.1 + 's' }}>
                  <PlanCard plan={day} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
