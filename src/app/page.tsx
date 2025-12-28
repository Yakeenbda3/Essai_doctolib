'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { services, doctorInfo, generateWeekSchedule } from '@/lib/data';
import { BookingData, BookingStep, Service, PatientInfo, DaySchedule } from '@/types';

export default function Home() {
  const [currentStep, setCurrentStep] = useState<BookingStep>('services');
  const [booking, setBooking] = useState<BookingData>({
    service: null,
    date: null,
    time: null,
    patientInfo: null,
  });

  // Date/time picker state
  const [weekStart, setWeekStart] = useState(() => new Date());
  const [schedule, setSchedule] = useState<DaySchedule[]>([]);
  const [selectedDay, setSelectedDay] = useState<DaySchedule | null>(null);

  useEffect(() => {
    const newSchedule = generateWeekSchedule(weekStart);
    setSchedule(newSchedule);
    // Auto-select first day with available slots
    const firstAvailable = newSchedule.find(day => day.slots.some(s => s.available));
    if (firstAvailable && !selectedDay) {
      setSelectedDay(firstAvailable);
    }
  }, [weekStart]);

  // Form state
  const [formData, setFormData] = useState<PatientInfo>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    birthDate: '',
    notes: '',
  });

  const handleServiceSelect = (service: Service) => {
    setBooking((prev) => ({ ...prev, service }));
    setCurrentStep('datetime');
  };

  const handleTimeSelect = (time: string) => {
    if (selectedDay) {
      setBooking((prev) => ({ ...prev, date: selectedDay.date, time }));
      setCurrentStep('info');
    }
  };

  const handleDaySelect = (day: DaySchedule) => {
    setSelectedDay(day);
    setBooking((prev) => ({ ...prev, date: day.date, time: null }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBooking((prev) => ({ ...prev, patientInfo: formData }));
    setCurrentStep('confirmation');
  };

  const handleNewBooking = () => {
    setBooking({ service: null, date: null, time: null, patientInfo: null });
    setFormData({ firstName: '', lastName: '', email: '', phone: '', birthDate: '', notes: '' });
    setCurrentStep('services');
  };

  const goBack = () => {
    if (currentStep === 'datetime') setCurrentStep('services');
    else if (currentStep === 'info') setCurrentStep('datetime');
  };

  const goToNextWeek = () => {
    const next = new Date(weekStart);
    next.setDate(next.getDate() + 7);
    setWeekStart(next);
    setSelectedDay(null);
  };

  const goToPrevWeek = () => {
    const prev = new Date(weekStart);
    prev.setDate(prev.getDate() - 7);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (prev >= today) {
      setWeekStart(prev);
      setSelectedDay(null);
    }
  };

  const getWeekLabel = () => {
    if (schedule.length === 0) return '';
    const firstDay = schedule[0];
    const monthNames = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
    return `Semaine du ${firstDay.dayNumber} ${monthNames[firstDay.date.getMonth()]}`;
  };

  const formatFullDate = (date: Date, time: string) => {
    const days = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
    const months = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
    return `${days[date.getDay()]} ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()} à ${time}`;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* PAGE 1: SERVICE SELECTION */}
      {currentStep === 'services' && (
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <header className="flex items-start justify-between p-6 border-b border-gray-100">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm leading-tight text-center">
                  CENTRE<br/>MÉDICAL<br/>PONT DE L&apos;ARC
                </span>
              </div>
              <div>
                <p className="text-xs text-gray-500">Centre Médical Office de l&apos;Arc - 4 Rue Frédéric R ROSA, 13090 Aix-en-Provence</p>
              </div>
            </div>
            <div className="text-right text-xs text-gray-500">
              <p>4 rue Frédéric Rosa</p>
              <p>13090 Aix-en-Provence</p>
              <p className="text-blue-600">{doctorInfo.phone}</p>
              <p className="text-blue-600">{doctorInfo.email}</p>
            </div>
          </header>

          {/* Services List */}
          <div className="p-6">
            <h1 className="text-xl font-semibold text-gray-900 mb-6">Prendre rendez-vous pour</h1>

            <div className="border border-gray-200 rounded-xl overflow-hidden">
              {services.map((service) => (
                <div key={service.id} className="service-card">
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <div className="w-12 h-12 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                      <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-medium text-gray-900">{service.name}</h3>
                      {service.description && (
                        <p className="text-sm text-gray-500 truncate">{service.description}</p>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => handleServiceSelect(service)}
                    className="btn-choose"
                  >
                    Choisir
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Info Boxes */}
          <div className="px-6 pb-6 space-y-4">
            {/* Emergency Info */}
            <div className="info-box warning">
              <p className="font-semibold text-amber-800">Informations Urgence / Emergency</p>
              <p className="text-amber-700 text-sm mt-1">
                <strong>Important:</strong> en cas d&apos;urgence veuillez téléphoner directement au <strong>15</strong>.
              </p>
              <p className="text-amber-700 text-sm">
                <strong>Important:</strong> in case of emergency please call directly at <strong>{doctorInfo.phone}</strong>. If no let <strong>15</strong>
              </p>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-3">
              <span className="badge badge-primary">MÉDECINE GÉNÉRALE ET SPÉCIALISÉE URGENCES</span>
              <span className="badge badge-outline">CONVENTIONNÉ SECTEUR 2 AVEC L&apos;ASSURANCE MALADIE</span>
            </div>

            <p className="text-sm text-gray-600">{doctorInfo.credentials}</p>

            {/* Note Box */}
            <div className="info-box note">
              <p className="font-semibold text-gray-700">À noter</p>
              <p className="text-gray-600 text-sm mt-1">
                Un médecin collaborateur adjoint ou un remplaçant peut <span className="text-blue-600">vous recevoir en l&apos;absence du Dr GRIMAUD</span> dans ce cas vous serez informés avant.
              </p>
            </div>

            {/* Telemedicine Box */}
            <div className="info-box info">
              <p className="font-semibold text-blue-800">RDV Télémédecine</p>
              <p className="text-blue-700 text-sm mt-1">
                Merci de penser a vous munir de votre <strong>carte vitale et mutuelle</strong> ou à défaut de vos attestations de droit.
              </p>
              <p className="text-blue-700 text-sm">
                Pour les bénéficiaires de la CMU aussi.
              </p>
              <p className="text-blue-700 text-sm">
                <strong>Moyens de paiement:</strong> virement bancaire, chèques, espèces.
              </p>
            </div>

            {/* Links */}
            <div className="text-sm">
              <a href="#" className="text-blue-600 hover:underline">www.ameli.direct.amelie.fr</a>
              <p className="text-gray-500 mt-1">Démarche RSE et RGPD</p>
            </div>
          </div>
        </div>
      )}

      {/* PAGE 2: DATE & TIME SELECTION */}
      {currentStep === 'datetime' && (
        <div className="max-w-3xl mx-auto p-6">
          {/* Back Button */}
          <button onClick={goBack} className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Retour
          </button>

          {/* Icon & Title */}
          <div className="text-center mb-8">
            <div className="icon-circle mx-auto mb-4">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Choisissez votre créneau</h1>
            <p className="text-gray-500">Service sélectionné: <strong>{booking.service?.name}</strong></p>
          </div>

          {/* Week Navigation */}
          <div className="flex items-center justify-between mb-6">
            <button onClick={goToPrevWeek} className="flex items-center gap-1 text-gray-500 hover:text-gray-700">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Semaine précédente
            </button>
            <span className="font-medium text-gray-900">{getWeekLabel()}</span>
            <button onClick={goToNextWeek} className="flex items-center gap-1 text-gray-500 hover:text-gray-700">
              Semaine suivante
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Day Selector */}
          <div className="grid grid-cols-5 gap-2 mb-8">
            {schedule.map((day) => (
              <button
                key={day.date.toISOString()}
                onClick={() => handleDaySelect(day)}
                className={`day-card ${selectedDay?.date.toISOString() === day.date.toISOString() ? 'selected' : ''}`}
              >
                <p className="text-sm text-gray-500">{day.dayName}</p>
                <p className="text-2xl font-semibold text-gray-900 my-1">{day.dayNumber}</p>
                <p className="text-xs text-gray-400">{day.month}</p>
              </button>
            ))}
          </div>

          {/* Time Slots */}
          {selectedDay && (
            <div>
              <p className="text-center text-gray-600 mb-4">
                Créneaux disponibles pour le {selectedDay.dayName.toLowerCase()}. {selectedDay.dayNumber} {selectedDay.month.toLowerCase()}
              </p>
              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
                {selectedDay.slots.map((slot) => (
                  <button
                    key={slot.time}
                    onClick={() => slot.available && handleTimeSelect(slot.time)}
                    disabled={!slot.available}
                    className={`time-slot ${slot.available ? '' : 'unavailable'} ${booking.time === slot.time ? 'selected' : ''}`}
                  >
                    {slot.time}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* PAGE 3: PATIENT INFORMATION */}
      {currentStep === 'info' && (
        <div className="max-w-xl mx-auto p-6">
          {/* Back Button */}
          <button onClick={goBack} className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Retour
          </button>

          {/* Icon & Title */}
          <div className="text-center mb-8">
            <div className="icon-circle mx-auto mb-4">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Vos informations</h1>
            <p className="text-gray-500">
              {booking.service?.name} • {booking.date && booking.time && formatFullDate(booking.date, booking.time)}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Prénom *</label>
                <input
                  type="text"
                  required
                  placeholder="Votre prénom"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nom *</label>
                <input
                  type="text"
                  required
                  placeholder="Votre nom"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
              <input
                type="email"
                required
                placeholder="votre.email@exemple.fr"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone *</label>
              <input
                type="tel"
                required
                placeholder="06 12 34 56 78"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date de naissance *</label>
              <input
                type="date"
                required
                value={formData.birthDate}
                onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Motif de consultation (optionnel)</label>
              <textarea
                rows={3}
                placeholder="Décrivez brièvement le motif de votre consultation..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              />
            </div>

            {/* RGPD Note */}
            <div className="info-box note">
              <p className="text-gray-600 text-sm">
                <strong>Note:</strong> Vos données personnelles sont traitées de manière confidentielle et conformément au RGPD.
              </p>
            </div>

            <button type="submit" className="btn-primary">
              Confirmer le rendez-vous
            </button>
          </form>
        </div>
      )}

      {/* PAGE 4: CONFIRMATION */}
      {currentStep === 'confirmation' && (
        <div className="max-w-xl mx-auto p-6">
          {/* Success Icon & Title */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Rendez-vous confirmé !</h1>
            <p className="text-gray-500">Un email de confirmation a été envoyé à {booking.patientInfo?.email}</p>
          </div>

          {/* Booking Summary */}
          <div className="bg-gray-50 rounded-xl p-6 mb-6 space-y-4">
            <div className="flex items-center gap-4">
              <div className="icon-circle-sm">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-500">Service</p>
                <p className="font-medium text-gray-900">{booking.service?.name}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="icon-circle-sm">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-500">Date et heure</p>
                <p className="font-medium text-gray-900 capitalize">
                  {booking.date && booking.time && formatFullDate(booking.date, booking.time)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="icon-circle-sm">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-500">Lieu</p>
                <p className="font-medium text-gray-900">{doctorInfo.address.name}</p>
                <p className="text-sm text-gray-500">{doctorInfo.address.street}, {doctorInfo.address.postalCode} {doctorInfo.address.city}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="icon-circle-sm">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-500">Patient</p>
                <p className="font-medium text-gray-900">{booking.patientInfo?.firstName} {booking.patientInfo?.lastName}</p>
              </div>
            </div>
          </div>

          {/* Important Info */}
          <div className="info-box warning mb-4">
            <p className="font-semibold text-amber-800">Informations importantes</p>
            <ul className="text-amber-700 text-sm mt-2 space-y-1">
              <li>• Merci de vous munir de votre carte vitale et mutuelle</li>
              <li>• En cas d&apos;empêchement, veuillez annuler au moins 24h à l&apos;avance</li>
              <li>• Moyens de paiement: virement bancaire, chèques, espèces</li>
            </ul>
          </div>

          <div className="info-box emergency mb-6">
            <p className="text-red-700 text-sm">
              <strong>Urgence:</strong> En cas d&apos;urgence, appelez le <strong>15</strong> ou le <strong>{doctorInfo.phone}</strong>
            </p>
          </div>

          <button onClick={handleNewBooking} className="btn-primary">
            Prendre un autre rendez-vous
          </button>
        </div>
      )}
    </div>
  );
}
