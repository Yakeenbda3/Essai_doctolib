'use client';

import { BookingData } from '@/types';
import { doctorInfo } from '@/lib/data';

interface ConfirmationProps {
  booking: BookingData;
  onNewBooking: () => void;
}

export default function Confirmation({ booking, onNewBooking }: ConfirmationProps) {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Success Banner */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-8 text-white text-center mb-6">
        <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold mb-2">Rendez-vous confirmé !</h2>
        <p className="text-green-100">
          Un email de confirmation a été envoyé à {booking.patientInfo?.email}
        </p>
      </div>

      {/* Booking Details */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Détails du rendez-vous</h3>

        <div className="space-y-4">
          <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-xl">
              {booking.service?.icon}
            </div>
            <div>
              <p className="text-sm text-gray-500">Prestation</p>
              <p className="font-medium text-gray-900">{booking.service?.name}</p>
              <p className="text-sm text-gray-500">{booking.service?.duration} minutes</p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-500">Date et heure</p>
              <p className="font-medium text-gray-900 capitalize">
                {booking.date && formatDate(booking.date)}
              </p>
              <p className="text-sm text-blue-600 font-semibold">{booking.time}</p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-500">Lieu</p>
              <p className="font-medium text-gray-900">{doctorInfo.address.name}</p>
              <p className="text-sm text-gray-500">
                {doctorInfo.address.street}, {doctorInfo.address.postalCode} {doctorInfo.address.city}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-500">Patient</p>
              <p className="font-medium text-gray-900">
                {booking.patientInfo?.firstName} {booking.patientInfo?.lastName}
              </p>
              <p className="text-sm text-gray-500">{booking.patientInfo?.email}</p>
            </div>
          </div>
        </div>

        {/* Important Info */}
        <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-xl">
          <h4 className="font-semibold text-amber-800 mb-2">Informations importantes</h4>
          <ul className="text-sm text-amber-700 space-y-1">
            <li>• Merci de vous munir de votre carte vitale et mutuelle</li>
            <li>• En cas d&apos;empêchement, veuillez annuler au moins 24h à l&apos;avance</li>
            <li>• Moyens de paiement: virement bancaire, chèques, espèces</li>
          </ul>
        </div>

        {/* Emergency Info */}
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl">
          <p className="text-sm text-red-700">
            <strong>Urgence :</strong> En cas d&apos;urgence, veuillez téléphoner directement au{' '}
            <strong>15</strong> ou au <strong>{doctorInfo.phone}</strong>
          </p>
        </div>

        {/* Actions */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <button onClick={onNewBooking} className="btn-primary flex-1">
            Prendre un autre rendez-vous
          </button>
          <button
            onClick={() => window.print()}
            className="flex-1 py-3 px-6 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
          >
            Imprimer
          </button>
        </div>
      </div>
    </div>
  );
}
