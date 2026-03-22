import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';

type DateAndFileInputProps = {
  selectedDate: Date;
  onSelect: (value: Date) => void;
}

// TODO: implement File Attachment Soon
export default function DateAndFileInputs({ selectedDate, onSelect } : DateAndFileInputProps) {
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const formattedDate = `${String(date.getMonth() + 1).padStart(2, '0')} / ${String(date.getDate()).padStart(2, '0')} / ${date.getFullYear()}`;

  const togglePicker = () => {
    setShowPicker(!showPicker);
  };

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (event.type === 'set' && selectedDate) {
      setDate(selectedDate);
      onSelect(selectedDate);
    }

    if (Platform.OS === 'android') {
      setShowPicker(false);
    }
  };

  return (
    <View style={styles.row}>
      <TouchableOpacity style={styles.dateCard} activeOpacity={0.7} onPress={togglePicker}>
        <Ionicons name="calendar-outline" size={20} color="#64748B" />
        <Text style={styles.dateText}>{formattedDate}</Text>
        <Ionicons name="calendar" size={18} color="#94A3B8" />
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={onChange}
        />
      )}

      {/*<TouchableOpacity style={styles.fileCard} activeOpacity={0.7}>*/}
      {/*  <Ionicons name="attach" size={24} color="#64748B" />*/}
      {/*  <Text style={styles.fileText}>Add file</Text>*/}
      {/*</TouchableOpacity>*/}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
  },
  dateCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },
  dateText: {
    flex: 1,
    fontSize: 15,
    fontWeight: '700',
    color: '#1E293B',
    marginLeft: 12,
  },
  fileCard: {
    width: 80,
    backgroundColor: 'white',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },
  fileText: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '500',
    marginTop: 4,
  },
});