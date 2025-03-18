'use client';

import { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, SafeAreaView } from 'react-native';
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
  type FieldError,
} from 'react-hook-form';
import { Calendar, X, ChevronLeft, ChevronRight } from 'lucide-react-native';

interface FormDateInputProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  error?: FieldError;
  placeholder?: string;
  minDate?: Date;
  maxDate?: Date;
}

// Helper functions for date handling
const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const getDaysInMonth = (year: number, month: number) => {
  return new Date(year, month + 1, 0).getDate();
};

const getFirstDayOfMonth = (year: number, month: number) => {
  return new Date(year, month, 1).getDay();
};

export function FormDateInput<T extends FieldValues>({
  name,
  control,
  label,
  error,
  placeholder = 'Select a date',
  minDate,
  maxDate,
}: FormDateInputProps<T>) {
  const [showPicker, setShowPicker] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const formatDate = (date: Date | null): string => {
    if (!date) return '';
    return `${MONTHS[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  };

  const goToPreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const isDateDisabled = (date: Date) => {
    if (minDate && date < minDate) return true;
    if (maxDate && date > maxDate) return true;
    return false;
  };

  const renderCalendar = (selectedDate: Date | null, onChange: (date: Date) => void) => {
    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    const firstDayOfMonth = getFirstDayOfMonth(currentYear, currentMonth);

    const days = [];
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<View key={`empty-${i}`} style={styles.dayCell} />);
    }

    // Add cells for each day of the month
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(currentYear, currentMonth, i);
      const isSelected =
        selectedDate &&
        selectedDate.getDate() === i &&
        selectedDate.getMonth() === currentMonth &&
        selectedDate.getFullYear() === currentYear;
      const isDisabled = isDateDisabled(date);

      days.push(
        <TouchableOpacity
          key={`day-${i}`}
          style={[
            styles.dayCell,
            isSelected && styles.selectedDay,
            isDisabled && styles.disabledDay,
          ]}
          onPress={() => {
            if (!isDisabled) {
              onChange(date);
            }
          }}
          disabled={isDisabled}
        >
          <Text
            style={[
              styles.dayText,
              isSelected && styles.selectedDayText,
              isDisabled && styles.disabledDayText,
            ]}
          >
            {i}
          </Text>
        </TouchableOpacity>
      );
    }

    return days;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => {
          const date = value ? new Date(value) : null;

          if (date) {
            // Initialize the calendar to the selected date's month and year
            if (currentMonth !== date.getMonth() || currentYear !== date.getFullYear()) {
              setCurrentMonth(date.getMonth());
              setCurrentYear(date.getFullYear());
            }
          }

          return (
            <>
              <TouchableOpacity
                style={[styles.dateContainer, error && styles.dateError]}
                onPress={() => setShowPicker(true)}
              >
                <Text style={[styles.dateText, !date && styles.placeholderText]}>
                  {date ? formatDate(date) : placeholder}
                </Text>
                <Calendar size={20} color="#6B7280" />
              </TouchableOpacity>

              <Modal visible={showPicker} animationType="slide" transparent={true}>
                <View style={styles.modalOverlay}>
                  <SafeAreaView style={styles.modalContent}>
                    <View style={styles.modalHeader}>
                      <Text style={styles.modalTitle}>{label}</Text>
                      <TouchableOpacity
                        onPress={() => setShowPicker(false)}
                        style={styles.closeButton}
                      >
                        <X size={24} color="#374151" />
                      </TouchableOpacity>
                    </View>

                    <View style={styles.calendarContainer}>
                      <View style={styles.calendarHeader}>
                        <TouchableOpacity onPress={goToPreviousMonth} style={styles.navButton}>
                          <ChevronLeft size={24} color="#374151" />
                        </TouchableOpacity>
                        <Text style={styles.calendarTitle}>
                          {MONTHS[currentMonth]} {currentYear}
                        </Text>
                        <TouchableOpacity onPress={goToNextMonth} style={styles.navButton}>
                          <ChevronRight size={24} color="#374151" />
                        </TouchableOpacity>
                      </View>

                      <View style={styles.weekdaysContainer}>
                        {DAYS.map((day) => (
                          <Text key={day} style={styles.weekdayText}>
                            {day}
                          </Text>
                        ))}
                      </View>

                      <View style={styles.daysContainer}>
                        {renderCalendar(date, (selectedDate) => {
                          onChange(selectedDate.toISOString());
                        })}
                      </View>
                    </View>

                    <TouchableOpacity
                      style={styles.confirmButton}
                      onPress={() => setShowPicker(false)}
                    >
                      <Text style={styles.confirmButtonText}>Confirm</Text>
                    </TouchableOpacity>
                  </SafeAreaView>
                </View>
              </Modal>
            </>
          );
        }}
      />
      {error && <Text style={styles.errorText}>{error.message}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    width: '100%',
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 6,
    color: '#374151',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    backgroundColor: '#F9FAFB',
    height: 48,
    paddingHorizontal: 12,
  },
  dateError: {
    borderColor: '#EF4444',
  },
  dateText: {
    fontSize: 16,
    color: '#1F2937',
  },
  placeholderText: {
    color: '#9CA3AF',
  },
  errorText: {
    color: '#EF4444',
    fontSize: 12,
    marginTop: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    maxHeight: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  closeButton: {
    padding: 4,
  },
  calendarContainer: {
    padding: 16,
  },
  calendarHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  navButton: {
    padding: 8,
  },
  calendarTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  weekdaysContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  weekdayText: {
    flex: 1,
    textAlign: 'center',
    fontWeight: '500',
    color: '#6B7280',
  },
  daysContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayCell: {
    width: '14.28%', // 100% / 7 days
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 2,
  },
  dayText: {
    fontSize: 16,
    color: '#1F2937',
  },
  selectedDay: {
    backgroundColor: '#4F46E5',
    borderRadius: 100,
  },
  selectedDayText: {
    color: 'white',
    fontWeight: '600',
  },
  disabledDay: {
    opacity: 0.4,
  },
  disabledDayText: {
    color: '#9CA3AF',
  },
  confirmButton: {
    margin: 16,
    backgroundColor: '#4F46E5',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
