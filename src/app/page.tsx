'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StepIndicator from '@/components/StepIndicator';
import ServiceCard from '@/components/ServiceCard';
import DateTimePicker from '@/components/DateTimePicker';
import PatientForm from '@/components/PatientForm';
import Confirmation from '@/components/Confirmation';
import { services, doctorInfo } from '@/lib/data';
import { BookingData, BookingStep, Service, PatientInfo } from '@/types';

export default function Home() {
  const [currentStep, setCurrentStep] = useState<BookingStep>('services');
  const [booking, setBooking] = useState<BookingData>({
    service: null,
    date: null,
    time: null,
    patientInfo: null,
  });

  const handleServiceSelect = (service: Service) => {
    setBooking((prev) => ({ ...prev, service }));
  };

  const handleDateTimeSelect = (date: Date, time: string) => {
    setBooking((prev) => ({ ...prev, date, time }));
  };

  const handlePatientSubmit = (patientInfo: PatientInfo) => {
    setBooking((prev) => ({ ...prev, patientInfo }));
    setCurrentStep('confirmation');
  };

  const handleNewBooking = () => {
    setBooking({
      service: null,
      date: null,
      time: null,
      patientInfo: null,
    });
    setCurrentStep('services');
  };

  const goToNextStep = () => {
    if (currentStep === 'services' && booking.service) {
      setCurrentStep('datetime');
    } else if (currentStep === 'datetime' && booking.date && booking.time) {
      setCurrentStep('info');
    }
  };

  const goToPreviousStep = () => {
    if (currentStep === 'datetime') {
      setCurrentStep('services');
    } else if (currentStep === 'info') {
      setCurrentStep('datetime');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      {currentStep !== 'confirmation' && <StepIndicator currentStep={currentStep} />}

      <main className="flex-1 py-8">
        <div className="max-w-6xl mx-auto px-4">
          {/* Services Step */}
          {currentStep === 'services' && (
            <div>
              {/* Doctor Hero */}
              <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-6 md:p-8 mb-8 text-white">
                <div className="flex flex-col md:flex-row md:items-center gap-6">
                  <div className="w-24 h-24 bg-white/20 rounded-2xl flex items-center justify-center">
                    <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-2">{doctorInfo.name}</h2>
                    <p className="text-blue-100 mb-1">{doctorInfo.specialty}</p>
                    <p className="text-blue-200 text-sm">{doctorInfo.convention}</p>
                  </div>
                </div>
              </div>

              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Prendre rendez-vous pour
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {services.map((service) => (
                  <ServiceCard
                    key={service.id}
                    service={service}
                    isSelected={booking.service?.id === service.id}
                    onSelect={handleServiceSelect}
                  />
                ))}
              </div>

              {/* Continue Button */}
              <div className="flex justify-end">
                <button
                  onClick={goToNextStep}
                  disabled={!booking.service}
                  className="btn-primary flex items-center gap-2"
                >
                  Continuer
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          )}

          {/* DateTime Step */}
          {currentStep === 'datetime' && (
            <div>
              {/* Selected Service */}
              <div className="bg-white rounded-xl p-4 border border-gray-100 mb-6 flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center text-2xl">
                  {booking.service?.icon}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{booking.service?.name}</p>
                  <p className="text-sm text-gray-500">Avec {doctorInfo.name}</p>
                </div>
              </div>

              <h2 className="text-xl font-semibold text-gray-900 mb-6">Quand</h2>

              <DateTimePicker
                selectedDate={booking.date}
                selectedTime={booking.time}
                onSelect={handleDateTimeSelect}
              />

              {/* Navigation */}
              <div className="flex justify-between mt-8">
                <button
                  onClick={goToPreviousStep}
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Retour
                </button>
                <button
                  onClick={goToNextStep}
                  disabled={!booking.date || !booking.time}
                  className="btn-primary flex items-center gap-2"
                >
                  Continuer
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          )}

          {/* Patient Info Step */}
          {currentStep === 'info' && (
            <div>
              {/* Selected Service & Time */}
              <div className="bg-white rounded-xl p-4 border border-gray-100 mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center text-2xl">
                      {booking.service?.icon}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{booking.service?.name}</p>
                      <p className="text-sm text-gray-500">Avec {doctorInfo.name}</p>
                    </div>
                  </div>
                  <div className="sm:ml-auto flex items-center gap-2 text-blue-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="font-medium">
                      {booking.date?.toLocaleDateString('fr-FR', {
                        weekday: 'long',
                        day: 'numeric',
                        month: 'long',
                      })}{' '}
                      à {booking.time}
                    </span>
                  </div>
                </div>
              </div>

              <PatientForm
                initialData={booking.patientInfo}
                onSubmit={handlePatientSubmit}
              />

              {/* Back Button */}
              <div className="mt-4">
                <button
                  onClick={goToPreviousStep}
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Retour
                </button>
              </div>
            </div>
          )}

          {/* Confirmation Step */}
          {currentStep === 'confirmation' && (
            <Confirmation booking={booking} onNewBooking={handleNewBooking} />
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
