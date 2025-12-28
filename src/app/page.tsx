'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

// Types
interface Service {
  id: string;
  name: string;
  description: string;
  icon: string;
}

interface DayData {
  date: Date;
  dayName: string;
  dayNum: number;
  month: string;
}

interface PatientData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  birthDate: string;
  notes: string;
}

// Data with icons
const services: Service[] = [
  { id: '1', name: 'Consultation', description: 'Adulte(s) connu(s)', icon: '🩺' },
  { id: '2', name: 'Nouveau patient', description: 'Première visite', icon: '👤' },
  { id: '3', name: 'Échographie', description: 'Rein, Vésicule, Grossesse, Musculo-squelettique', icon: '📊' },
  { id: '4', name: 'Dépistage Covid', description: 'PCR et Antigénique', icon: '🧬' },
  { id: '5', name: 'Grossesse', description: 'Suivi obstétrical et échographie', icon: '🤱' },
  { id: '6', name: 'Gynécologie médicale', description: 'Contraception, DIU, Ménopause', icon: '💜' },
  { id: '7', name: 'Télémédecine', description: 'Consultation à distance', icon: '💻' },
  { id: '8', name: 'Aptitude sportive', description: 'Certificat médical, ECG', icon: '🏃' },
  { id: '9', name: 'Suture', description: 'Anesthésie locale', icon: '🩹' },
  { id: '10', name: 'Pédiatrie', description: 'Allaitement et soins enfants', icon: '👶' },
  { id: '11', name: 'Conseils voyageurs', description: 'Prévention et vaccinations', icon: '✈️' },
  { id: '12', name: 'Pressothérapie', description: 'Drainage lymphatique', icon: '💆' },
  { id: '13', name: 'RDV Professionnel', description: 'Consultations professionnelles', icon: '💼' },
];

const timeSlots = [
  '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
  '16:00', '16:30', '17:00', '17:30', '18:00'
];

export default function Home() {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedDay, setSelectedDay] = useState<DayData | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [weekStart, setWeekStart] = useState(new Date());
  const [days, setDays] = useState<DayData[]>([]);
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [patient, setPatient] = useState<PatientData>({
    firstName: '', lastName: '', email: '', phone: '', birthDate: '', notes: ''
  });

  useEffect(() => {
    const dayNames = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
    const monthNames = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'];
    const monday = new Date(weekStart);
    const dow = monday.getDay();
    monday.setDate(monday.getDate() - (dow === 0 ? 6 : dow - 1));
    const newDays: DayData[] = [];
    for (let i = 0; i < 5; i++) {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      newDays.push({ date: d, dayName: dayNames[d.getDay()], dayNum: d.getDate(), month: monthNames[d.getMonth()] });
    }
    setDays(newDays);
    if (!selectedDay && newDays.length > 0) setSelectedDay(newDays[2]);
  }, [weekStart]);

  useEffect(() => {
    if (selectedDay) {
      setAvailableSlots(timeSlots.filter(() => Math.random() > 0.35));
    }
  }, [selectedDay?.date.toISOString()]);

  const getWeekLabel = () => {
    if (days.length === 0) return '';
    const months = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
    return `${days[0].dayNum} - ${days[4].dayNum} ${months[days[0].date.getMonth()]}`;
  };

  const formatDate = (date: Date, time: string) => {
    const d = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
    const m = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
    return `${d[date.getDay()]} ${date.getDate()} ${m[date.getMonth()]} à ${time}`;
  };

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setStep(4); };

  // Premium color palette
  const colors = {
    primary: '#0066FF',
    primaryLight: '#E8F1FF',
    primaryDark: '#0052CC',
    accent: '#00C48C',
    accentLight: '#E6FAF5',
    background: '#F8FAFC',
    card: '#FFFFFF',
    text: '#0F172A',
    textSecondary: '#64748B',
    textMuted: '#94A3B8',
    border: '#E2E8F0',
    borderLight: '#F1F5F9',
    warning: '#FF9500',
    warningLight: '#FFF8E6',
    error: '#FF3B30',
    errorLight: '#FFF0F0',
    success: '#00C48C',
    successLight: '#E6FAF5',
  };

  // Navbar
  const Navbar = () => (
    <nav style={{
      background: 'rgba(255,255,255,0.95)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderBottom: `1px solid ${colors.border}`,
      position: 'sticky',
      top: 0,
      zIndex: 1000,
    }}>
      <div style={{
        maxWidth: '1000px',
        margin: '0 auto',
        padding: '16px 24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Image src="/logo.png" alt="CMPA" width={120} height={48} style={{ height: '48px', width: 'auto' }} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <a href="tel:0486319411" style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            color: colors.text, textDecoration: 'none', fontSize: '14px', fontWeight: 500,
          }}>
            <div style={{
              width: '36px', height: '36px', borderRadius: '10px',
              background: colors.primaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="18" height="18" fill="none" stroke={colors.primary} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <span style={{ color: colors.textSecondary }}>04 86 31 94 11</span>
          </a>
          <button style={{
            background: colors.primary, color: '#fff', border: 'none',
            padding: '10px 20px', borderRadius: '10px', fontSize: '14px', fontWeight: 600,
            cursor: 'pointer', transition: 'all 0.2s',
          }}>
            Urgence: 15
          </button>
        </div>
      </div>
    </nav>
  );

  // PAGE 1: Services
  if (step === 1) {
    return (
      <div style={{ minHeight: '100vh', background: colors.background }}>
        <Navbar />

        {/* Hero Section */}
        <div style={{
          background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`,
          padding: '48px 24px',
          color: '#fff',
        }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', opacity: 0.9 }}>
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              </svg>
              <span style={{ fontSize: '14px' }}>4 Rue Frédéric ROSA, 13090 Aix-en-Provence</span>
            </div>
            <h1 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '8px', letterSpacing: '-0.5px' }}>
              Centre Médical Pont de l&apos;Arc
            </h1>
            <p style={{ fontSize: '16px', opacity: 0.9 }}>
              Dr. Laurent GRIMAUD • Médecine Générale et Spécialisée
            </p>
          </div>
        </div>

        {/* Services Grid */}
        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '32px 24px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: colors.text, marginBottom: '24px' }}>
            Prendre rendez-vous
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
            {services.map((service) => (
              <button
                key={service.id}
                onClick={() => { setSelectedService(service); setStep(2); }}
                style={{
                  display: 'flex', alignItems: 'center', gap: '16px',
                  padding: '20px', background: colors.card, border: `1px solid ${colors.border}`,
                  borderRadius: '16px', cursor: 'pointer', textAlign: 'left',
                  transition: 'all 0.2s ease', boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.borderColor = colors.primary;
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,102,255,0.15)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.borderColor = colors.border;
                  e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.04)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div style={{
                  width: '52px', height: '52px', borderRadius: '14px',
                  background: colors.primaryLight, display: 'flex',
                  alignItems: 'center', justifyContent: 'center', fontSize: '24px', flexShrink: 0,
                }}>
                  {service.icon}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 600, color: colors.text, fontSize: '15px', marginBottom: '4px' }}>
                    {service.name}
                  </div>
                  <div style={{ fontSize: '13px', color: colors.textSecondary, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {service.description}
                  </div>
                </div>
                <svg width="20" height="20" fill="none" stroke={colors.textMuted} viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            ))}
          </div>

          {/* Info Cards */}
          <div style={{ marginTop: '32px', display: 'grid', gap: '16px' }}>
            <div style={{
              padding: '20px', borderRadius: '16px',
              background: colors.warningLight, border: `1px solid ${colors.warning}20`,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <div style={{
                  width: '40px', height: '40px', borderRadius: '12px',
                  background: `${colors.warning}20`, display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <svg width="20" height="20" fill="none" stroke={colors.warning} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <span style={{ fontWeight: 600, color: '#92400e', fontSize: '15px' }}>Urgences</span>
              </div>
              <p style={{ color: '#78350f', fontSize: '14px', lineHeight: 1.6 }}>
                En cas d&apos;urgence, appelez le <strong>15</strong> (SAMU) ou le <strong>04 86 31 94 11</strong>
              </p>
            </div>

            <div style={{
              padding: '20px', borderRadius: '16px',
              background: colors.primaryLight, border: `1px solid ${colors.primary}20`,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <div style={{
                  width: '40px', height: '40px', borderRadius: '12px',
                  background: `${colors.primary}20`, display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <svg width="20" height="20" fill="none" stroke={colors.primary} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span style={{ fontWeight: 600, color: colors.primaryDark, fontSize: '15px' }}>Informations pratiques</span>
              </div>
              <p style={{ color: '#1e40af', fontSize: '14px', lineHeight: 1.6 }}>
                Pensez à vous munir de votre <strong>carte vitale</strong> et <strong>mutuelle</strong>.<br />
                Paiements acceptés : CB, chèques, espèces.
              </p>
            </div>
          </div>

          {/* Badges */}
          <div style={{ marginTop: '24px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            <span style={{
              padding: '8px 16px', borderRadius: '100px', fontSize: '12px', fontWeight: 600,
              background: colors.primary, color: '#fff',
            }}>
              Conventionné Secteur 2
            </span>
            <span style={{
              padding: '8px 16px', borderRadius: '100px', fontSize: '12px', fontWeight: 500,
              background: colors.card, color: colors.textSecondary, border: `1px solid ${colors.border}`,
            }}>
              Maître de Stage des Universités
            </span>
          </div>
        </div>
      </div>
    );
  }

  // PAGE 2: Date & Time Selection
  if (step === 2) {
    return (
      <div style={{ minHeight: '100vh', background: colors.background }}>
        <Navbar />
        <div style={{ maxWidth: '700px', margin: '0 auto', padding: '32px 24px' }}>
          {/* Back Button */}
          <button onClick={() => setStep(1)} style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            background: 'none', border: 'none', color: colors.textSecondary,
            fontSize: '14px', cursor: 'pointer', marginBottom: '32px', padding: 0,
          }}>
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Retour
          </button>

          {/* Selected Service Card */}
          <div style={{
            padding: '16px 20px', background: colors.card, borderRadius: '14px',
            border: `1px solid ${colors.border}`, marginBottom: '32px',
            display: 'flex', alignItems: 'center', gap: '16px',
          }}>
            <div style={{
              width: '48px', height: '48px', borderRadius: '12px',
              background: colors.primaryLight, display: 'flex',
              alignItems: 'center', justifyContent: 'center', fontSize: '22px',
            }}>
              {selectedService?.icon}
            </div>
            <div>
              <div style={{ fontWeight: 600, color: colors.text }}>{selectedService?.name}</div>
              <div style={{ fontSize: '13px', color: colors.textSecondary }}>Dr. Laurent GRIMAUD</div>
            </div>
          </div>

          {/* Title */}
          <h1 style={{ fontSize: '28px', fontWeight: 700, color: colors.text, marginBottom: '8px', letterSpacing: '-0.5px' }}>
            Choisissez une date
          </h1>
          <p style={{ color: colors.textSecondary, marginBottom: '32px' }}>{getWeekLabel()}</p>

          {/* Week Navigation */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <button onClick={() => { const p = new Date(weekStart); p.setDate(p.getDate() - 7); setWeekStart(p); }} style={{
              display: 'flex', alignItems: 'center', gap: '4px',
              background: 'none', border: 'none', color: colors.textSecondary, cursor: 'pointer', fontSize: '14px',
            }}>
              <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Précédent
            </button>
            <button onClick={() => { const n = new Date(weekStart); n.setDate(n.getDate() + 7); setWeekStart(n); }} style={{
              display: 'flex', alignItems: 'center', gap: '4px',
              background: 'none', border: 'none', color: colors.textSecondary, cursor: 'pointer', fontSize: '14px',
            }}>
              Suivant
              <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Days */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px', marginBottom: '32px' }}>
            {days.map((day) => {
              const isSelected = selectedDay?.date.toDateString() === day.date.toDateString();
              return (
                <button key={day.date.toISOString()} onClick={() => setSelectedDay(day)} style={{
                  padding: '16px 8px', textAlign: 'center', cursor: 'pointer',
                  background: isSelected ? colors.primary : colors.card,
                  border: `2px solid ${isSelected ? colors.primary : colors.border}`,
                  borderRadius: '16px', transition: 'all 0.2s',
                }}>
                  <div style={{ fontSize: '12px', color: isSelected ? 'rgba(255,255,255,0.8)' : colors.textSecondary, marginBottom: '4px' }}>
                    {day.dayName}
                  </div>
                  <div style={{ fontSize: '24px', fontWeight: 700, color: isSelected ? '#fff' : colors.text }}>
                    {day.dayNum}
                  </div>
                  <div style={{ fontSize: '11px', color: isSelected ? 'rgba(255,255,255,0.7)' : colors.textMuted }}>
                    {day.month}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Time Slots */}
          {selectedDay && (
            <>
              <h2 style={{ fontSize: '16px', fontWeight: 600, color: colors.text, marginBottom: '16px' }}>
                Horaires disponibles
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))', gap: '10px' }}>
                {timeSlots.map((time) => {
                  const isAvailable = availableSlots.includes(time);
                  return (
                    <button key={time} onClick={() => isAvailable && (setSelectedTime(time), setStep(3))} disabled={!isAvailable} style={{
                      padding: '14px 8px', textAlign: 'center', fontSize: '14px', fontWeight: 600,
                      background: isAvailable ? colors.card : colors.borderLight,
                      color: isAvailable ? colors.primary : colors.textMuted,
                      border: `1.5px solid ${isAvailable ? colors.primary : 'transparent'}`,
                      borderRadius: '12px', cursor: isAvailable ? 'pointer' : 'not-allowed',
                      transition: 'all 0.15s',
                    }}>
                      {time}
                    </button>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  // PAGE 3: Patient Form
  if (step === 3) {
    return (
      <div style={{ minHeight: '100vh', background: colors.background }}>
        <Navbar />
        <div style={{ maxWidth: '500px', margin: '0 auto', padding: '32px 24px' }}>
          <button onClick={() => setStep(2)} style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            background: 'none', border: 'none', color: colors.textSecondary,
            fontSize: '14px', cursor: 'pointer', marginBottom: '32px', padding: 0,
          }}>
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Retour
          </button>

          {/* Appointment Summary */}
          <div style={{
            padding: '20px', background: colors.primaryLight, borderRadius: '16px', marginBottom: '32px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{
                width: '52px', height: '52px', borderRadius: '14px', background: colors.card,
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px',
              }}>
                {selectedService?.icon}
              </div>
              <div>
                <div style={{ fontWeight: 600, color: colors.text, marginBottom: '4px' }}>{selectedService?.name}</div>
                <div style={{ fontSize: '14px', color: colors.primary, fontWeight: 500 }}>
                  {selectedDay && selectedTime && formatDate(selectedDay.date, selectedTime)}
                </div>
              </div>
            </div>
          </div>

          <h1 style={{ fontSize: '28px', fontWeight: 700, color: colors.text, marginBottom: '8px' }}>Vos coordonnées</h1>
          <p style={{ color: colors.textSecondary, marginBottom: '32px' }}>Renseignez vos informations pour confirmer</p>

          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: colors.text, marginBottom: '8px' }}>Prénom</label>
                <input type="text" required placeholder="Jean" value={patient.firstName} onChange={(e) => setPatient({ ...patient, firstName: e.target.value })}
                  style={{ width: '100%', padding: '14px 16px', background: colors.card, border: `1.5px solid ${colors.border}`, borderRadius: '12px', fontSize: '16px', outline: 'none', transition: 'border 0.2s' }}
                  onFocus={(e) => e.currentTarget.style.borderColor = colors.primary}
                  onBlur={(e) => e.currentTarget.style.borderColor = colors.border}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: colors.text, marginBottom: '8px' }}>Nom</label>
                <input type="text" required placeholder="Dupont" value={patient.lastName} onChange={(e) => setPatient({ ...patient, lastName: e.target.value })}
                  style={{ width: '100%', padding: '14px 16px', background: colors.card, border: `1.5px solid ${colors.border}`, borderRadius: '12px', fontSize: '16px', outline: 'none' }}
                  onFocus={(e) => e.currentTarget.style.borderColor = colors.primary}
                  onBlur={(e) => e.currentTarget.style.borderColor = colors.border}
                />
              </div>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: colors.text, marginBottom: '8px' }}>Email</label>
              <input type="email" required placeholder="jean.dupont@email.com" value={patient.email} onChange={(e) => setPatient({ ...patient, email: e.target.value })}
                style={{ width: '100%', padding: '14px 16px', background: colors.card, border: `1.5px solid ${colors.border}`, borderRadius: '12px', fontSize: '16px', outline: 'none' }}
                onFocus={(e) => e.currentTarget.style.borderColor = colors.primary}
                onBlur={(e) => e.currentTarget.style.borderColor = colors.border}
              />
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: colors.text, marginBottom: '8px' }}>Téléphone</label>
              <input type="tel" required placeholder="06 12 34 56 78" value={patient.phone} onChange={(e) => setPatient({ ...patient, phone: e.target.value })}
                style={{ width: '100%', padding: '14px 16px', background: colors.card, border: `1.5px solid ${colors.border}`, borderRadius: '12px', fontSize: '16px', outline: 'none' }}
                onFocus={(e) => e.currentTarget.style.borderColor = colors.primary}
                onBlur={(e) => e.currentTarget.style.borderColor = colors.border}
              />
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: colors.text, marginBottom: '8px' }}>Date de naissance</label>
              <input type="date" required value={patient.birthDate} onChange={(e) => setPatient({ ...patient, birthDate: e.target.value })}
                style={{ width: '100%', padding: '14px 16px', background: colors.card, border: `1.5px solid ${colors.border}`, borderRadius: '12px', fontSize: '16px', outline: 'none' }}
                onFocus={(e) => e.currentTarget.style.borderColor = colors.primary}
                onBlur={(e) => e.currentTarget.style.borderColor = colors.border}
              />
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: colors.text, marginBottom: '8px' }}>Motif (optionnel)</label>
              <textarea placeholder="Décrivez brièvement le motif de consultation..." value={patient.notes} onChange={(e) => setPatient({ ...patient, notes: e.target.value })}
                style={{ width: '100%', padding: '14px 16px', background: colors.card, border: `1.5px solid ${colors.border}`, borderRadius: '12px', fontSize: '16px', outline: 'none', resize: 'none', minHeight: '100px' }}
                onFocus={(e) => e.currentTarget.style.borderColor = colors.primary}
                onBlur={(e) => e.currentTarget.style.borderColor = colors.border}
              />
            </div>

            <div style={{ padding: '16px', background: colors.borderLight, borderRadius: '12px', marginBottom: '24px' }}>
              <p style={{ fontSize: '13px', color: colors.textSecondary, lineHeight: 1.6 }}>
                <strong style={{ color: colors.text }}>Confidentialité :</strong> Vos données sont traitées conformément au RGPD et ne seront jamais partagées.
              </p>
            </div>

            <button type="submit" style={{
              width: '100%', padding: '18px', background: colors.primary, color: '#fff',
              border: 'none', borderRadius: '14px', fontSize: '16px', fontWeight: 600, cursor: 'pointer',
              transition: 'all 0.2s',
            }}>
              Confirmer le rendez-vous
            </button>
          </form>
        </div>
      </div>
    );
  }

  // PAGE 4: Confirmation
  return (
    <div style={{ minHeight: '100vh', background: colors.background }}>
      <Navbar />
      <div style={{ maxWidth: '500px', margin: '0 auto', padding: '48px 24px', textAlign: 'center' }}>
        {/* Success Animation */}
        <div style={{
          width: '88px', height: '88px', borderRadius: '50%',
          background: colors.successLight, display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 24px',
        }}>
          <svg width="44" height="44" fill="none" stroke={colors.success} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 style={{ fontSize: '28px', fontWeight: 700, color: colors.text, marginBottom: '8px' }}>Rendez-vous confirmé !</h1>
        <p style={{ color: colors.textSecondary, marginBottom: '32px' }}>
          Un email de confirmation a été envoyé à<br /><strong style={{ color: colors.text }}>{patient.email}</strong>
        </p>

        {/* Summary Card */}
        <div style={{ background: colors.card, borderRadius: '20px', padding: '24px', textAlign: 'left', border: `1px solid ${colors.border}`, marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', paddingBottom: '20px', borderBottom: `1px solid ${colors.borderLight}` }}>
            <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: colors.primaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>
              {selectedService?.icon}
            </div>
            <div>
              <div style={{ fontWeight: 600, color: colors.text, marginBottom: '4px' }}>{selectedService?.name}</div>
              <div style={{ fontSize: '14px', color: colors.primary, fontWeight: 500 }}>
                {selectedDay && selectedTime && formatDate(selectedDay.date, selectedTime)}
              </div>
            </div>
          </div>

          <div style={{ paddingTop: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', marginBottom: '16px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: colors.borderLight, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="18" height="18" fill="none" stroke={colors.textSecondary} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
              </div>
              <div>
                <div style={{ fontSize: '13px', color: colors.textMuted, marginBottom: '2px' }}>Adresse</div>
                <div style={{ fontWeight: 500, color: colors.text, fontSize: '14px' }}>Centre Médical Pont de l&apos;Arc</div>
                <div style={{ fontSize: '13px', color: colors.textSecondary }}>4 Rue Frédéric ROSA, 13090 Aix-en-Provence</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: colors.borderLight, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="18" height="18" fill="none" stroke={colors.textSecondary} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <div style={{ fontSize: '13px', color: colors.textMuted, marginBottom: '2px' }}>Patient</div>
                <div style={{ fontWeight: 500, color: colors.text, fontSize: '14px' }}>{patient.firstName} {patient.lastName}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Info Card */}
        <div style={{ background: colors.warningLight, borderRadius: '16px', padding: '20px', textAlign: 'left', marginBottom: '24px' }}>
          <div style={{ fontWeight: 600, color: '#92400e', marginBottom: '12px', fontSize: '14px' }}>Rappels importants</div>
          <ul style={{ color: '#78350f', fontSize: '13px', lineHeight: 1.8, paddingLeft: '16px', margin: 0 }}>
            <li>Apportez votre carte vitale et mutuelle</li>
            <li>Annulez 24h à l&apos;avance si empêché</li>
            <li>CB, chèques et espèces acceptés</li>
          </ul>
        </div>

        <button onClick={() => { setStep(1); setSelectedService(null); setSelectedDay(null); setSelectedTime(null); setPatient({ firstName: '', lastName: '', email: '', phone: '', birthDate: '', notes: '' }); }}
          style={{
            width: '100%', padding: '18px', background: colors.primary, color: '#fff',
            border: 'none', borderRadius: '14px', fontSize: '16px', fontWeight: 600, cursor: 'pointer',
          }}>
          Prendre un autre rendez-vous
        </button>
      </div>
    </div>
  );
}
