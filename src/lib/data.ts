import { Service, DaySchedule, TimeSlot } from '@/types';

export const services: Service[] = [
  {
    id: 'consultation',
    name: 'Consultation',
    description: 'Adulte(s) connu(s)',
    image: '/images/consultation.jpg',
    duration: 15,
  },
  {
    id: 'nouveau-patient',
    name: 'Nouveau patient',
    description: '',
    image: '/images/nouveau-patient.jpg',
    duration: 30,
  },
  {
    id: 'echographie',
    name: 'Échographie',
    description: 'Rein - Vésicule - Grossesse - Musculo-squelettique - Endocavitaire -',
    image: '/images/echographie.jpg',
    duration: 30,
  },
  {
    id: 'depistage-covid',
    name: 'Dépistage Covid Antigénique PCR',
    description: 'A PCR, Sein, RDV, Antique, Prélèvement Déplacements Résultat utérus médical',
    image: '/images/depistage.jpg',
    duration: 15,
  },
  {
    id: 'grossesse',
    name: 'Grossesse',
    description: 'Suivi obstétrical et échographie',
    image: '/images/grossesse.jpg',
    duration: 30,
  },
  {
    id: 'gynecologie',
    name: 'Gynécologie médicale',
    description: 'Troubles du VPC, Contraception, Spire de S.I.U. Ménopause',
    image: '/images/gynecologie.jpg',
    duration: 30,
  },
  {
    id: 'telemedecine',
    name: 'Télémédecine dont COVID-19',
    description: 'Permet vos RDV dans le cabinet téléconseol',
    image: '/images/telemedecine.jpg',
    duration: 15,
  },
  {
    id: 'aptitude-sportive',
    name: 'Aptitude sportive',
    description: 'Viocellini - Certificat médicopportment -',
    image: '/images/aptitude.jpg',
    duration: 20,
  },
  {
    id: 'suture',
    name: 'Suture',
    description: 'ClosedSolution',
    image: '/images/suture.jpg',
    duration: 30,
  },
  {
    id: 'allaitement-pediatrie',
    name: 'allaitement/pédiatrie',
    description: '',
    image: '/images/pediatrie.jpg',
    duration: 30,
  },
  {
    id: 'conseils-voyageurs',
    name: 'Conseils aux voyageurs / Travel advice',
    description: 'Colonial époque - Prévention - Certifie ride assessment',
    image: '/images/voyageurs.jpg',
    duration: 20,
  },
  {
    id: 'pressotherapie',
    name: 'PRESSOTHERAPIE',
    description: '',
    image: '/images/pressotherapie.jpg',
    duration: 45,
  },
  {
    id: 'rdv-professionnel',
    name: 'RENDEZ-VOUS PROFESSIONNEL',
    description: '',
    image: '/images/professionnel.jpg',
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

// Generate week schedule starting from a specific date
export function generateWeekSchedule(startDate: Date): DaySchedule[] {
  const days: DaySchedule[] = [];
  const dayNames = ['Dim.', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Sam.'];
  const monthNamesShort = ['Janv.', 'Fév.', 'Mars', 'Avr.', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'];

  // Start from Monday
  const monday = new Date(startDate);
  const dayOfWeek = monday.getDay();
  const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
  monday.setDate(monday.getDate() + diff);

  // Only show weekdays (Mon-Fri)
  for (let i = 0; i < 5; i++) {
    const date = new Date(monday);
    date.setDate(monday.getDate() + i);

    const slots: TimeSlot[] = [];

    // Generate time slots from 08:00 to 18:00
    const times = [
      '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
      '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
      '16:00', '16:30', '17:00', '17:30', '18:00'
    ];

    times.forEach((time) => {
      // Simulate availability - some slots are taken
      const hour = parseInt(time.split(':')[0]);
      let available = true;

      // Lunch time less available
      if (hour === 12 || hour === 13) {
        available = Math.random() > 0.7;
      } else {
        available = Math.random() > 0.4;
      }

      slots.push({ time, available });
    });

    days.push({
      date,
      dayName: dayNames[date.getDay()],
      dayNumber: date.getDate(),
      month: monthNamesShort[date.getMonth()],
      slots,
    });
  }

  return days;
}
