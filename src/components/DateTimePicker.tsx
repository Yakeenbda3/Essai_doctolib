'use client';

import { useState, useEffect } from 'react';
import { DaySchedule, TimeSlot } from '@/types';
import { generateWeekSchedule } from '@/lib/data';

interface DateTimePickerProps {
  selectedDate: Date | null;
  selectedTime: string | null;
  onSelect: (date: Date, time: string) => void;
}

export default function DateTimePicker({
  selectedDate,
  selectedTime,
  onSelect,
}: DateTimePickerProps) {
  const [weekStart, setWeekStart] = useState(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today;
  });
  const [schedule, setSchedule] = useState<DaySchedule[]>([]);

  useEffect(() => {
    setSchedule(generateWeekSchedule(weekStart));
  }, [weekStart]);

  const goToPreviousWeek = () => {
    const newStart = new Date(weekStart);
    newStart.setDate(weekStart.getDate() - 7);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (newStart >= today) {
      setWeekStart(newStart);
    }
  };

  const goToNextWeek = () => {
    const newStart = new Date(weekStart);
    newStart.setDate(weekStart.getDate() + 7);
    setWeekStart(newStart);
  };

  const canGoPrevious = () => {
    const newStart = new Date(weekStart);
    newStart.setDate(weekStart.getDate() - 7);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return newStart >= today;
  };

  const isSelected = (day: DaySchedule, slot: TimeSlot) => {
    if (!selectedDate || !selectedTime) return false;
    return (
      day.date.toDateString() === selectedDate.toDateString() &&
      slot.time === selectedTime
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Navigation */}
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        <button
          onClick={goToPreviousWeek}
          disabled={!canGoPrevious()}
          className="flex items-center gap-2 text-gray-500 hover:text-blue-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="text-sm font-medium">Précédent</span>
        </button>
        <h3 className="text-lg font-semibold text-gray-900">Choisir une date</h3>
        <button
          onClick={goToNextWeek}
          className="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors"
        >
          <span className="text-sm font-medium">Suivant</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="overflow-x-auto">
        <div className="grid grid-cols-7 min-w-[700px]">
          {/* Day Headers */}
          {schedule.map((day) => (
            <div
              key={day.date.toISOString()}
              className="p-3 text-center border-b border-r border-gray-100 last:border-r-0 bg-gray-50"
            >
              <p className="text-sm font-medium text-gray-900">{day.dayName}</p>
              <p className="text-xs text-gray-500">
                {day.dayNumber} {day.month}
              </p>
            </div>
          ))}

          {/* Time Slots */}
          {schedule.map((day) => (
            <div
              key={`slots-${day.date.toISOString()}`}
              className="border-r border-gray-100 last:border-r-0 p-2 space-y-2 min-h-[400px]"
            >
              {day.slots.map((slot) => (
                <button
                  key={`${day.date.toISOString()}-${slot.time}`}
                  onClick={() => slot.available && onSelect(day.date, slot.time)}
                  disabled={!slot.available}
                  className={`w-full py-2 px-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                    isSelected(day, slot)
                      ? 'bg-blue-600 text-white shadow-md'
                      : slot.available
                      ? 'bg-blue-50 text-blue-700 hover:bg-blue-100 hover:shadow-sm'
                      : 'bg-gray-50 text-gray-300 cursor-not-allowed'
                  }`}
                >
                  {slot.time}
                </button>
              ))}
              {day.slots.filter((s) => s.available).length === 0 && (
                <p className="text-xs text-gray-400 text-center py-4">
                  Aucune disponibilité
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
