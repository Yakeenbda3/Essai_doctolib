'use client';

import { doctorInfo } from '@/lib/data';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Doctor Info */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">{doctorInfo.name}</h3>
            <p className="text-sm text-gray-500 mb-2">{doctorInfo.specialty}</p>
            <p className="text-sm text-blue-600 mb-1">{doctorInfo.convention}</p>
            <p className="text-sm text-gray-500">{doctorInfo.credentials}</p>
          </div>

          {/* Address */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Adresse</h3>
            <p className="text-sm text-gray-500">
              {doctorInfo.address.name}<br />
              {doctorInfo.address.street}<br />
              {doctorInfo.address.postalCode} {doctorInfo.address.city}
            </p>
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(
                `${doctorInfo.address.street}, ${doctorInfo.address.postalCode} ${doctorInfo.address.city}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-600 hover:underline mt-2 inline-block"
            >
              Voir sur la carte
            </a>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Contact</h3>
            <p className="text-sm text-gray-500 mb-2">
              <strong>Téléphone:</strong>{' '}
              <a href={`tel:${doctorInfo.phone}`} className="text-blue-600 hover:underline">
                {doctorInfo.phone}
              </a>
            </p>
            <p className="text-sm text-gray-500 mb-2">
              <strong>Email:</strong>{' '}
              <a href={`mailto:${doctorInfo.email}`} className="text-blue-600 hover:underline">
                {doctorInfo.email}
              </a>
            </p>
            <p className="text-sm text-red-600 font-medium">
              Urgences: appelez le 15
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-gray-100">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-500">
            <p>
              Un médecin collaborateur adjoint ou un remplaçant peut vous recevoir en l&apos;absence
              du Dr GRIMAUD, dans ce cas vous serez informés avant.
            </p>
          </div>
          <div className="mt-4 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-400">
            <p>RDV Télémédecine disponible</p>
            <p>Démarche RSE et RGPD</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
