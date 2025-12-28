'use client';

import { useState, useEffect } from 'react';

// Types
interface Service {
  id: string;
  name: string;
  description: string;
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

// Data
const services: Service[] = [
  { id: '1', name: 'Consultation', description: 'Adulte(s) connu(s)' },
  { id: '2', name: 'Nouveau patient', description: '' },
  { id: '3', name: 'Échographie', description: 'Rein - Vésicule - Grossesse - Musculo-squelettique' },
  { id: '4', name: 'Dépistage Covid Antigénique PCR', description: 'PCR, Sein, Utérus, Prostate, Mélanome, Poumons' },
  { id: '5', name: 'Grossesse', description: 'Suivi obstétrical et échographie' },
  { id: '6', name: 'Gynécologie médicale', description: 'Troubles du cycle, Contraception, DIU, Ménopause' },
  { id: '7', name: 'Télémédecine dont COVID-19', description: 'Consultation à distance' },
  { id: '8', name: 'Aptitude sportive', description: 'Certificat médical - Électrocardiogramme' },
  { id: '9', name: 'Suture', description: 'Anesthésie locale' },
  { id: '10', name: 'Allaitement/pédiatrie', description: '' },
  { id: '11', name: 'Conseils aux voyageurs / Travel advice', description: 'Prévention - Country risk assessment' },
  { id: '12', name: 'Pressothérapie', description: '' },
  { id: '13', name: 'Rendez-vous professionnel', description: '' },
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

  // Generate week days
  useEffect(() => {
    const dayNames = ['Dim.', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Sam.'];
    const monthNames = ['Janv.', 'Fév.', 'Mars', 'Avr.', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'];

    const monday = new Date(weekStart);
    const dow = monday.getDay();
    monday.setDate(monday.getDate() - (dow === 0 ? 6 : dow - 1));

    const newDays: DayData[] = [];
    for (let i = 0; i < 5; i++) {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      newDays.push({
        date: d,
        dayName: dayNames[d.getDay()],
        dayNum: d.getDate(),
        month: monthNames[d.getMonth()]
      });
    }
    setDays(newDays);
    if (!selectedDay && newDays.length > 0) {
      setSelectedDay(newDays[2]); // Select Wednesday by default
    }
  }, [weekStart]);

  // Generate random available slots when day changes
  useEffect(() => {
    if (selectedDay) {
      const available = timeSlots.filter(() => Math.random() > 0.4);
      setAvailableSlots(available);
    }
  }, [selectedDay?.date.toISOString()]);

  const getWeekLabel = () => {
    if (days.length === 0) return '';
    const months = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
    return `Semaine du ${days[0].dayNum} ${months[days[0].date.getMonth()]}`;
  };

  const formatDate = (date: Date, time: string) => {
    const days = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
    const months = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
    return `${days[date.getDay()]} ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()} à ${time}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(4);
  };

  // Styles
  const styles = {
    container: {
      maxWidth: '800px',
      margin: '0 auto',
      padding: '0 20px',
    } as React.CSSProperties,

    // Header
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      padding: '20px 0',
      borderBottom: '1px solid #e5e7eb',
      gap: '20px',
      flexWrap: 'wrap' as const,
    } as React.CSSProperties,

    logo: {
      width: '60px',
      height: '60px',
      background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#fff',
      fontSize: '8px',
      fontWeight: 700,
      textAlign: 'center' as const,
      lineHeight: 1.2,
      flexShrink: 0,
    } as React.CSSProperties,

    headerLeft: {
      display: 'flex',
      gap: '12px',
      alignItems: 'flex-start',
    } as React.CSSProperties,

    headerRight: {
      textAlign: 'right' as const,
      fontSize: '12px',
      color: '#6b7280',
    } as React.CSSProperties,

    // Services
    title: {
      fontSize: '20px',
      fontWeight: 600,
      margin: '24px 0 16px',
      color: '#111827',
    } as React.CSSProperties,

    servicesList: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '12px',
    } as React.CSSProperties,

    serviceItem: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '16px',
      background: '#fff',
      borderRadius: '12px',
      border: '1px solid #e5e7eb',
      gap: '12px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
    } as React.CSSProperties,

    serviceInfo: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      flex: 1,
      minWidth: 0,
    } as React.CSSProperties,

    serviceImage: {
      width: '44px',
      height: '44px',
      borderRadius: '8px',
      background: '#e5e7eb',
      flexShrink: 0,
    } as React.CSSProperties,

    serviceText: {
      minWidth: 0,
    } as React.CSSProperties,

    serviceName: {
      fontWeight: 500,
      color: '#111827',
      fontSize: '15px',
    } as React.CSSProperties,

    serviceDesc: {
      fontSize: '13px',
      color: '#6b7280',
      whiteSpace: 'nowrap' as const,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    } as React.CSSProperties,

    chooseBtn: {
      background: '#3b82f6',
      color: '#fff',
      border: 'none',
      padding: '8px 20px',
      borderRadius: '20px',
      fontSize: '14px',
      fontWeight: 500,
      flexShrink: 0,
    } as React.CSSProperties,

    // Info boxes
    infoBox: {
      padding: '16px',
      borderRadius: '8px',
      marginTop: '16px',
      fontSize: '14px',
    } as React.CSSProperties,

    warningBox: {
      background: '#fef3c7',
      borderLeft: '4px solid #f59e0b',
    } as React.CSSProperties,

    infoBoxBlue: {
      background: '#dbeafe',
      borderLeft: '4px solid #3b82f6',
    } as React.CSSProperties,

    grayBox: {
      background: '#f3f4f6',
    } as React.CSSProperties,

    badge: {
      display: 'inline-block',
      padding: '8px 16px',
      borderRadius: '20px',
      fontSize: '12px',
      fontWeight: 500,
      marginRight: '8px',
      marginTop: '16px',
    } as React.CSSProperties,

    badgePrimary: {
      background: '#3b82f6',
      color: '#fff',
    } as React.CSSProperties,

    badgeOutline: {
      background: '#fff',
      border: '1px solid #d1d5db',
      color: '#4b5563',
    } as React.CSSProperties,

    // Page 2 - Date picker
    backBtn: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      background: 'none',
      border: 'none',
      color: '#6b7280',
      fontSize: '15px',
      padding: '20px 0',
    } as React.CSSProperties,

    centerContent: {
      textAlign: 'center' as const,
    } as React.CSSProperties,

    iconCircle: {
      width: '64px',
      height: '64px',
      background: '#dbeafe',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 16px',
    } as React.CSSProperties,

    pageTitle: {
      fontSize: '28px',
      fontWeight: 700,
      color: '#111827',
      marginBottom: '8px',
    } as React.CSSProperties,

    subtitle: {
      color: '#6b7280',
      marginBottom: '32px',
    } as React.CSSProperties,

    weekNav: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '24px',
    } as React.CSSProperties,

    navBtn: {
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
      background: 'none',
      border: 'none',
      color: '#6b7280',
      fontSize: '14px',
    } as React.CSSProperties,

    daysGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(5, 1fr)',
      gap: '8px',
      marginBottom: '32px',
    } as React.CSSProperties,

    dayCard: {
      padding: '16px 8px',
      textAlign: 'center' as const,
      borderRadius: '12px',
      border: '2px solid transparent',
      background: '#fff',
      cursor: 'pointer',
    } as React.CSSProperties,

    dayCardSelected: {
      background: '#dbeafe',
      borderColor: '#3b82f6',
    } as React.CSSProperties,

    dayName: {
      fontSize: '13px',
      color: '#6b7280',
    } as React.CSSProperties,

    dayNum: {
      fontSize: '28px',
      fontWeight: 600,
      color: '#111827',
      margin: '4px 0',
    } as React.CSSProperties,

    dayMonth: {
      fontSize: '12px',
      color: '#9ca3af',
    } as React.CSSProperties,

    slotsLabel: {
      textAlign: 'center' as const,
      color: '#6b7280',
      marginBottom: '16px',
      fontSize: '15px',
    } as React.CSSProperties,

    slotsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(70px, 1fr))',
      gap: '8px',
    } as React.CSSProperties,

    slot: {
      padding: '10px',
      textAlign: 'center' as const,
      borderRadius: '8px',
      border: '1px solid #e5e7eb',
      background: '#fff',
      fontSize: '14px',
      fontWeight: 500,
      color: '#374151',
      cursor: 'pointer',
    } as React.CSSProperties,

    slotUnavailable: {
      background: '#f9fafb',
      color: '#d1d5db',
      cursor: 'not-allowed',
      border: '1px solid transparent',
    } as React.CSSProperties,

    slotSelected: {
      background: '#3b82f6',
      color: '#fff',
      borderColor: '#3b82f6',
    } as React.CSSProperties,

    // Page 3 - Form
    formContainer: {
      maxWidth: '500px',
      margin: '0 auto',
    } as React.CSSProperties,

    formGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '16px',
    } as React.CSSProperties,

    formField: {
      marginBottom: '16px',
    } as React.CSSProperties,

    formLabel: {
      display: 'block',
      fontSize: '14px',
      fontWeight: 500,
      color: '#374151',
      marginBottom: '8px',
    } as React.CSSProperties,

    formInput: {
      width: '100%',
      padding: '14px 16px',
      background: '#f3f4f6',
      border: 'none',
      borderRadius: '10px',
      fontSize: '16px',
      color: '#111827',
      outline: 'none',
    } as React.CSSProperties,

    formTextarea: {
      width: '100%',
      padding: '14px 16px',
      background: '#f3f4f6',
      border: 'none',
      borderRadius: '10px',
      fontSize: '16px',
      color: '#111827',
      outline: 'none',
      resize: 'none' as const,
      minHeight: '100px',
    } as React.CSSProperties,

    noteBox: {
      background: '#f3f4f6',
      padding: '16px',
      borderRadius: '10px',
      fontSize: '14px',
      color: '#374151',
      marginBottom: '24px',
    } as React.CSSProperties,

    submitBtn: {
      width: '100%',
      padding: '16px',
      background: '#3b82f6',
      color: '#fff',
      border: 'none',
      borderRadius: '30px',
      fontSize: '16px',
      fontWeight: 600,
    } as React.CSSProperties,

    // Page 4 - Confirmation
    successIcon: {
      width: '80px',
      height: '80px',
      background: '#dcfce7',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 20px',
    } as React.CSSProperties,

    summaryBox: {
      background: '#f9fafb',
      borderRadius: '12px',
      padding: '24px',
      marginBottom: '24px',
    } as React.CSSProperties,

    summaryItem: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '16px',
      marginBottom: '20px',
    } as React.CSSProperties,

    summaryIcon: {
      width: '40px',
      height: '40px',
      background: '#dbeafe',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
    } as React.CSSProperties,

    summaryLabel: {
      fontSize: '13px',
      color: '#6b7280',
    } as React.CSSProperties,

    summaryValue: {
      fontWeight: 500,
      color: '#111827',
    } as React.CSSProperties,
  };

  // PAGE 1: Services
  if (step === 1) {
    return (
      <div style={styles.container}>
        {/* Header */}
        <header style={styles.header}>
          <div style={styles.headerLeft}>
            <div style={styles.logo}>CENTRE<br/>MÉDICAL<br/>PONT DE L&apos;ARC</div>
            <div>
              <div style={{ fontSize: '12px', color: '#6b7280' }}>
                Centre Médical Pont de l&apos;Arc - 4 Rue Frédéric ROSA, 13090 Aix-en-Provence
              </div>
            </div>
          </div>
          <div style={styles.headerRight}>
            <div>4 rue Frédéric Rosa</div>
            <div>13090 Aix-en-Provence</div>
            <div style={{ color: '#3b82f6' }}>04 86 31 94 11</div>
            <div style={{ color: '#3b82f6' }}>aixecho462@gmail.com</div>
          </div>
        </header>

        {/* Services */}
        <h1 style={styles.title}>Prendre rendez-vous pour</h1>

        <div style={styles.servicesList}>
          {services.map((service) => (
            <div key={service.id} style={styles.serviceItem}>
              <div style={styles.serviceInfo}>
                <div style={styles.serviceImage} />
                <div style={styles.serviceText}>
                  <div style={styles.serviceName}>{service.name}</div>
                  {service.description && (
                    <div style={styles.serviceDesc}>{service.description}</div>
                  )}
                </div>
              </div>
              <button
                style={styles.chooseBtn}
                onClick={() => { setSelectedService(service); setStep(2); }}
              >
                Choisir
              </button>
            </div>
          ))}
        </div>

        {/* Info boxes */}
        <div style={{ ...styles.infoBox, ...styles.warningBox }}>
          <div style={{ fontWeight: 600, color: '#92400e', marginBottom: '4px' }}>
            Informations Urgence / Emergency
          </div>
          <div style={{ color: '#92400e' }}>
            <strong>Important:</strong> en cas d&apos;urgence veuillez téléphoner directement au <strong>15</strong>.
          </div>
          <div style={{ color: '#92400e' }}>
            <strong>Important:</strong> in case of emergency please call directly at <strong>04 86 31 94 11</strong>. If no let <strong>15</strong>
          </div>
        </div>

        <div>
          <span style={{ ...styles.badge, ...styles.badgePrimary }}>
            MÉDECINE GÉNÉRALE ET SPÉCIALISÉE URGENCES
          </span>
          <span style={{ ...styles.badge, ...styles.badgeOutline }}>
            CONVENTIONNÉ SECTEUR 2 AVEC L&apos;ASSURANCE MALADIE
          </span>
        </div>

        <div style={{ marginTop: '16px', fontSize: '14px', color: '#6b7280' }}>
          Maître de Stage des Universités
        </div>

        <div style={{ ...styles.infoBox, ...styles.grayBox }}>
          <div style={{ fontWeight: 600, marginBottom: '4px' }}>À noter</div>
          <div>
            Un médecin collaborateur adjoint ou un remplaçant peut{' '}
            <span style={{ color: '#3b82f6' }}>vous recevoir en l&apos;absence du Dr GRIMAUD</span>{' '}
            dans ce cas vous serez informés avant.
          </div>
        </div>

        <div style={{ ...styles.infoBox, ...styles.infoBoxBlue }}>
          <div style={{ fontWeight: 600, color: '#1e40af', marginBottom: '4px' }}>RDV Télémédecine</div>
          <div style={{ color: '#1e40af' }}>
            Merci de penser a vous munir de votre <strong>carte vitale et mutuelle</strong> ou à défaut de vos attestations de droit.
          </div>
          <div style={{ color: '#1e40af' }}>Pour les bénéficiaires de la CMU aussi.</div>
          <div style={{ color: '#1e40af' }}><strong>Moyens de paiement:</strong> virement bancaire, chèques, espèces.</div>
        </div>

        <div style={{ marginTop: '16px', marginBottom: '40px', fontSize: '14px' }}>
          <a href="#" style={{ color: '#3b82f6' }}>www.ameli.direct.amelie.fr</a>
          <div style={{ color: '#9ca3af', marginTop: '4px' }}>Démarche RSE et RGPD</div>
        </div>
      </div>
    );
  }

  // PAGE 2: Date & Time
  if (step === 2) {
    return (
      <div style={styles.container}>
        <button style={styles.backBtn} onClick={() => setStep(1)}>
          <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Retour
        </button>

        <div style={styles.centerContent}>
          <div style={styles.iconCircle}>
            <svg width="28" height="28" fill="none" stroke="#3b82f6" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h1 style={styles.pageTitle}>Choisissez votre créneau</h1>
          <p style={styles.subtitle}>Service sélectionné: <strong>{selectedService?.name}</strong></p>
        </div>

        <div style={styles.weekNav}>
          <button style={styles.navBtn} onClick={() => {
            const prev = new Date(weekStart);
            prev.setDate(prev.getDate() - 7);
            setWeekStart(prev);
          }}>
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Semaine précédente
          </button>
          <span style={{ fontWeight: 500 }}>{getWeekLabel()}</span>
          <button style={styles.navBtn} onClick={() => {
            const next = new Date(weekStart);
            next.setDate(next.getDate() + 7);
            setWeekStart(next);
          }}>
            Semaine suivante
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <div style={styles.daysGrid}>
          {days.map((day) => (
            <button
              key={day.date.toISOString()}
              onClick={() => setSelectedDay(day)}
              style={{
                ...styles.dayCard,
                ...(selectedDay?.date.toDateString() === day.date.toDateString() ? styles.dayCardSelected : {})
              }}
            >
              <div style={styles.dayName}>{day.dayName}</div>
              <div style={styles.dayNum}>{day.dayNum}</div>
              <div style={styles.dayMonth}>{day.month}</div>
            </button>
          ))}
        </div>

        {selectedDay && (
          <>
            <p style={styles.slotsLabel}>
              Créneaux disponibles pour le {selectedDay.dayName.toLowerCase()} {selectedDay.dayNum} {selectedDay.month.toLowerCase()}
            </p>
            <div style={styles.slotsGrid}>
              {timeSlots.map((time) => {
                const isAvailable = availableSlots.includes(time);
                const isSelected = selectedTime === time;
                return (
                  <button
                    key={time}
                    onClick={() => {
                      if (isAvailable) {
                        setSelectedTime(time);
                        setStep(3);
                      }
                    }}
                    style={{
                      ...styles.slot,
                      ...(isSelected ? styles.slotSelected : {}),
                      ...(!isAvailable ? styles.slotUnavailable : {})
                    }}
                  >
                    {time}
                  </button>
                );
              })}
            </div>
          </>
        )}
        <div style={{ height: '40px' }} />
      </div>
    );
  }

  // PAGE 3: Patient Form
  if (step === 3) {
    return (
      <div style={styles.container}>
        <button style={styles.backBtn} onClick={() => setStep(2)}>
          <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Retour
        </button>

        <div style={styles.formContainer}>
          <div style={styles.centerContent}>
            <div style={styles.iconCircle}>
              <svg width="28" height="28" fill="none" stroke="#3b82f6" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h1 style={styles.pageTitle}>Vos informations</h1>
            <p style={styles.subtitle}>
              {selectedService?.name} • {selectedDay && selectedTime && formatDate(selectedDay.date, selectedTime)}
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div style={styles.formGrid}>
              <div>
                <label style={styles.formLabel}>Prénom *</label>
                <input
                  type="text"
                  required
                  placeholder="Votre prénom"
                  style={styles.formInput}
                  value={patient.firstName}
                  onChange={(e) => setPatient({ ...patient, firstName: e.target.value })}
                />
              </div>
              <div>
                <label style={styles.formLabel}>Nom *</label>
                <input
                  type="text"
                  required
                  placeholder="Votre nom"
                  style={styles.formInput}
                  value={patient.lastName}
                  onChange={(e) => setPatient({ ...patient, lastName: e.target.value })}
                />
              </div>
            </div>

            <div style={styles.formField}>
              <label style={styles.formLabel}>Email *</label>
              <input
                type="email"
                required
                placeholder="votre.email@exemple.fr"
                style={styles.formInput}
                value={patient.email}
                onChange={(e) => setPatient({ ...patient, email: e.target.value })}
              />
            </div>

            <div style={styles.formField}>
              <label style={styles.formLabel}>Téléphone *</label>
              <input
                type="tel"
                required
                placeholder="06 12 34 56 78"
                style={styles.formInput}
                value={patient.phone}
                onChange={(e) => setPatient({ ...patient, phone: e.target.value })}
              />
            </div>

            <div style={styles.formField}>
              <label style={styles.formLabel}>Date de naissance *</label>
              <input
                type="date"
                required
                style={styles.formInput}
                value={patient.birthDate}
                onChange={(e) => setPatient({ ...patient, birthDate: e.target.value })}
              />
            </div>

            <div style={styles.formField}>
              <label style={styles.formLabel}>Motif de consultation (optionnel)</label>
              <textarea
                placeholder="Décrivez brièvement le motif de votre consultation..."
                style={styles.formTextarea}
                value={patient.notes}
                onChange={(e) => setPatient({ ...patient, notes: e.target.value })}
              />
            </div>

            <div style={styles.noteBox}>
              <strong>Note:</strong> Vos données personnelles sont traitées de manière confidentielle et conformément au RGPD.
            </div>

            <button type="submit" style={styles.submitBtn}>
              Confirmer le rendez-vous
            </button>
          </form>
        </div>
        <div style={{ height: '40px' }} />
      </div>
    );
  }

  // PAGE 4: Confirmation
  return (
    <div style={styles.container}>
      <div style={{ ...styles.formContainer, paddingTop: '40px' }}>
        <div style={styles.centerContent}>
          <div style={styles.successIcon}>
            <svg width="40" height="40" fill="none" stroke="#22c55e" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 style={styles.pageTitle}>Rendez-vous confirmé !</h1>
          <p style={styles.subtitle}>Un email de confirmation a été envoyé à {patient.email}</p>
        </div>

        <div style={styles.summaryBox}>
          <div style={styles.summaryItem}>
            <div style={styles.summaryIcon}>
              <svg width="20" height="20" fill="none" stroke="#3b82f6" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <div>
              <div style={styles.summaryLabel}>Service</div>
              <div style={styles.summaryValue}>{selectedService?.name}</div>
            </div>
          </div>

          <div style={styles.summaryItem}>
            <div style={styles.summaryIcon}>
              <svg width="20" height="20" fill="none" stroke="#3b82f6" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <div style={styles.summaryLabel}>Date et heure</div>
              <div style={styles.summaryValue}>
                {selectedDay && selectedTime && formatDate(selectedDay.date, selectedTime)}
              </div>
            </div>
          </div>

          <div style={styles.summaryItem}>
            <div style={styles.summaryIcon}>
              <svg width="20" height="20" fill="none" stroke="#3b82f6" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <div style={styles.summaryLabel}>Lieu</div>
              <div style={styles.summaryValue}>Centre Médical Pont de l&apos;Arc</div>
              <div style={{ fontSize: '13px', color: '#6b7280' }}>4 Rue Frédéric ROSA, 13090 Aix-en-Provence</div>
            </div>
          </div>

          <div style={{ ...styles.summaryItem, marginBottom: 0 }}>
            <div style={styles.summaryIcon}>
              <svg width="20" height="20" fill="none" stroke="#3b82f6" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div>
              <div style={styles.summaryLabel}>Patient</div>
              <div style={styles.summaryValue}>{patient.firstName} {patient.lastName}</div>
            </div>
          </div>
        </div>

        <div style={{ ...styles.infoBox, ...styles.warningBox, marginTop: 0 }}>
          <div style={{ fontWeight: 600, color: '#92400e', marginBottom: '8px' }}>Informations importantes</div>
          <ul style={{ color: '#92400e', paddingLeft: '16px', margin: 0 }}>
            <li>Merci de vous munir de votre carte vitale et mutuelle</li>
            <li>En cas d&apos;empêchement, veuillez annuler au moins 24h à l&apos;avance</li>
            <li>Moyens de paiement: virement bancaire, chèques, espèces</li>
          </ul>
        </div>

        <div style={{
          ...styles.infoBox,
          background: '#fee2e2',
          borderLeft: '4px solid #ef4444',
          marginBottom: '24px'
        }}>
          <span style={{ color: '#991b1b' }}>
            <strong>Urgence:</strong> En cas d&apos;urgence, appelez le <strong>15</strong> ou le <strong>04 86 31 94 11</strong>
          </span>
        </div>

        <button
          style={styles.submitBtn}
          onClick={() => {
            setStep(1);
            setSelectedService(null);
            setSelectedDay(null);
            setSelectedTime(null);
            setPatient({ firstName: '', lastName: '', email: '', phone: '', birthDate: '', notes: '' });
          }}
        >
          Prendre un autre rendez-vous
        </button>
      </div>
      <div style={{ height: '40px' }} />
    </div>
  );
}
