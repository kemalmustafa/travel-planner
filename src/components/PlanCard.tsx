type TimeSlot = {
  activity: string;
  description: string;
  tip: string;
  photo?: string | null;
};

type DayPlan = {
  day: number;
  title: string;
  morning: TimeSlot;
  afternoon: TimeSlot;
  evening: TimeSlot;
};

const SLOT_CONFIG = [
  { key: 'morning', label: 'Morning', icon: '🌅', color: '#f97316', bg: 'rgba(249,115,22,0.08)', border: 'rgba(249,115,22,0.2)' },
  { key: 'afternoon', label: 'Afternoon', icon: '☀️', color: '#eab308', bg: 'rgba(234,179,8,0.08)', border: 'rgba(234,179,8,0.2)' },
  { key: 'evening', label: 'Evening', icon: '🌙', color: '#a78bfa', bg: 'rgba(167,139,250,0.08)', border: 'rgba(167,139,250,0.2)' },
];

export default function PlanCard({ plan }: { plan: DayPlan }) {
  return (
    <div style={{
      background: 'rgba(255,255,255,0.03)',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: '20px',
      overflow: 'hidden',
      backdropFilter: 'blur(12px)',
      fontFamily: "'DM Sans', sans-serif",
    }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(249,115,22,0.15), rgba(236,72,153,0.1))',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        padding: '20px 28px',
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
      }}>
        <div style={{
          width: '40px', height: '40px', borderRadius: '12px',
          background: 'linear-gradient(135deg, #f97316, #ec4899)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '13px', fontWeight: 700, color: '#fff', flexShrink: 0,
          boxShadow: '0 4px 12px rgba(249,115,22,0.4)',
        }}>
          {plan.day}
        </div>
        <div>
          <p style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '3px' }}>
            Day {plan.day}
          </p>
          <h3 style={{ fontSize: '17px', fontWeight: 600, color: '#fff', lineHeight: 1.2 }}>
            {plan.title}
          </h3>
        </div>
      </div>

      {/* Slots */}
      <div style={{ padding: '8px 16px 16px' }}>
        {SLOT_CONFIG.map((slot) => {
          const data = plan[slot.key as keyof DayPlan] as TimeSlot;
          return (
            <div key={slot.key} style={{
              margin: '8px 0',
              background: slot.bg,
              border: '1px solid ' + slot.border,
              borderRadius: '14px',
              overflow: 'hidden',
            }}>
              
              {data.photo && (
                <div style={{ width: '100%', height: '160px', overflow: 'hidden', position: 'relative' }}>
                  <img
                    src={data.photo}
                    alt={data.activity}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)',
                  }} />
                  <div style={{ position: 'absolute', bottom: '12px', left: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '16px' }}>{slot.icon}</span>
                    <span style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: slot.color }}>
                      {slot.label}
                    </span>
                  </div>
                </div>
              )}

              <div style={{ padding: '16px 20px' }}>
                
                {!data.photo && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <span style={{ fontSize: '16px' }}>{slot.icon}</span>
                    <span style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: slot.color }}>
                      {slot.label}
                    </span>
                  </div>
                )}

                <p style={{ fontSize: '15px', fontWeight: 600, color: '#fff', marginBottom: '6px' }}>
                  {data.activity}
                </p>
                <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, marginBottom: data.tip ? '10px' : '0' }}>
                  {data.description}
                </p>
                {data.tip && (
                  <div style={{
                    display: 'flex', gap: '8px', alignItems: 'flex-start',
                    background: 'rgba(255,255,255,0.05)', borderRadius: '8px', padding: '8px 12px',
                  }}>
                    <span style={{ fontSize: '12px', marginTop: '1px' }}>💡</span>
                    <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.6 }}>{data.tip}</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
