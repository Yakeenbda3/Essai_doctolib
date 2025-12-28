export interface Service {
  id: string;
  name: string;
  description: string;
  image: string;
  duration: number;
}

export interface TimeSlot {
  time: string;
  available: boolean;
}

export interface DaySchedule {
  date: Date;
  dayName: string;
  dayNumber: number;
  month: string;
  slots: TimeSlot[];
}

export interface BookingData {
  service: Service | null;
  date: Date | null;
  time: string | null;
  patientInfo: PatientInfo | null;
}

export interface PatientInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  birthDate: string;
  notes: string;
}

export type BookingStep = 'services' | 'datetime' | 'info' | 'confirmation';
