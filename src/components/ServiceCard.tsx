'use client';

import { Service } from '@/types';

interface ServiceCardProps {
  service: Service;
  isSelected: boolean;
  onSelect: (service: Service) => void;
}

export default function ServiceCard({ service, isSelected, onSelect }: ServiceCardProps) {
  return (
    <button
      onClick={() => onSelect(service)}
      className={`w-full p-4 rounded-xl border-2 transition-all duration-200 text-left hover:shadow-md ${
        isSelected
          ? 'border-blue-500 bg-blue-50 shadow-md'
          : 'border-gray-100 bg-white hover:border-blue-200'
      }`}
    >
      <div className="flex items-start gap-4">
        <div
          className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl ${
            isSelected ? 'bg-blue-100' : 'bg-gray-50'
          }`}
        >
          {service.icon}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className={`font-semibold ${isSelected ? 'text-blue-700' : 'text-gray-900'}`}>
            {service.name}
          </h3>
          <p className="text-sm text-gray-500 mt-1 line-clamp-2">{service.description}</p>
          <p className="text-xs text-gray-400 mt-2">{service.duration} min</p>
        </div>
        <div
          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
            isSelected ? 'border-blue-500 bg-blue-500' : 'border-gray-300'
          }`}
        >
          {isSelected && (
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          )}
        </div>
      </div>
    </button>
  );
}
