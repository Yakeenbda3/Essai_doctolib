import { Service, DaySchedule, TimeSlot } from '@/types';

export const services: Service[] = [
  {
    id: 'consultation',
    name: 'Consultation',
    description: 'Consultation médicale générale',
    icon: '🩺',
    duration: 15,
  },
  {
    id: 'nouveau-patient',
    name: 'Nouveau patient',
    description: 'Première consultation pour nouveaux patients',
    icon: '👤',
    duration: 30,
  },
  {
    id: 'echographie',
    name: 'Échographie',
    description: 'Utérus, Vésicule, Grossesse, Musculo-squelettique, Endocavitaire',
    icon: '📊',
    duration: 30,
  },
  {
    id: 'depistage-covid',
    name: 'Dépistage Covid Antigénique PCR',
    description: 'Lèvres, Sein, Utérus, Prostate, Mélanome, Poumons',
    icon: '🧪',
    duration: 15,
  },
  {
    id: 'grossesse',
    name: 'Grossesse',
    description: 'Suivi, examen clinique et échographie',
    icon: '🤰',
    duration: 30,
  },
  {
    id: 'gynecologie',
    name: 'Gynécologie médicale',
    description: 'Troubles du cycle, Contraception, pose de DIU, Ménopause, Frottis MST',
    icon: '💜',
    duration: 30,
  },
  {
    id: 'telemedecine',
    name: 'Télémédecine dont COVID-19',
    description: 'Consultation à distance par vidéo',
    icon: '💻',
    duration: 15,
  },
  {
    id: 'aptitude-sportive',
    name: 'Aptitude sportive',
    description: 'Tous sports - Électrocardiogramme',
    icon: '🏃',
    duration: 20,
  },
  {
    id: 'suture',
    name: 'Suture',
    description: 'Anesthésie locale',
    icon: '🩹',
    duration: 30,
  },
  {
    id: 'etudiant-stagiaire',
    name: 'Étudiant/Stagiaire',
    description: 'Consultation pour étudiants et stagiaires',
    icon: '🎓',
    duration: 15,
  },
  {
    id: 'conseils-voyageurs',
    name: 'Conseils aux voyageurs / Travel advice',
    description: 'Évaluation des risques sanitaires selon le pays, Prévention, Country risk assessment',
    icon: '✈️',
    duration: 20,
  },
  {
    id: 'pressotherapie',
    name: 'Pressothérapie',
    description: 'Traitement par pression',
    icon: '💆',
    duration: 45,
  },
  {
    id: 'rdv-professionnel',
    name: 'Rendez-vous professionnel',
    description: 'Consultations professionnelles',
    icon: '💼',
    duration: 30,
  },
];

export const doctorInfo = {
  name: 'Dr. Laurent GRIMAUD',
  title: 'Médecin Généraliste',
  specialty: 'Médecine Générale et Spécialisée Urgences',
  convention: 'Conventionné Secteur 2 avec l\'Assurance Maladie',
  credentials: 'Maître de Stage des Universités',
  address: {
    name: 'Centre Médical Pont de l\'Arc',
    street: '4 Rue Frédéric ROSA',
    postalCode: '13090',
    city: 'Aix-en-Provence',
    country: 'France',
  },
  phone: '04 86 31 94 11',
  emergency: '15',
  email: 'aixecho462@gmail.com',
  website: 'www.ameli.direct.amelie.fr',
};

// Generate mock schedule for a week
export function generateWeekSchedule(startDate: Date): DaySchedule[] {
  const days: DaySchedule[] = [];
  const dayNames = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
  const monthNames = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];

  for (let i = 0; i < 7; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);

    const dayOfWeek = date.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

    const slots: TimeSlot[] = [];
    const startHour = 8;
    const endHour = 18;

    for (let hour = startHour; hour <= endHour; hour++) {
      // Create slots at :00 and :30
      for (const minutes of ['00', '30']) {
        if (hour === endHour && minutes === '30') continue;

        const time = `${hour.toString().padStart(2, '0')}:${minutes}`;

        // Weekend has limited availability, some random availability during week
        let available = false;
        if (!isWeekend) {
          // Simulate some booked slots randomly
          available = Math.random() > 0.3;
          // Lunch break typically unavailable
          if (hour === 12 || hour === 13) {
            available = false;
          }
        } else if (dayOfWeek === 6) {
          // Saturday morning only
          available = hour >= 8 && hour < 12 && Math.random() > 0.5;
        }

        slots.push({ time, available });
      }
    }

    days.push({
      date,
      dayName: dayNames[dayOfWeek],
      dayNumber: date.getDate(),
      month: monthNames[date.getMonth()],
      slots,
    });
  }

  return days;
}
