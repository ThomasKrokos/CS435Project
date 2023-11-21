import React, { useMemo, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';

const CalendarComponent = ({ workoutForms }) => {
  const [selected, setSelected] = useState('');

  const marked = useMemo(() => {
    let markedDates = {};

    workoutForms.forEach((form) => {
      form.schedule.forEach((day) => {
        markedDates[day] = {
          customStyles: {
            container: {
              backgroundColor: 'green',
              borderRadius: 5,
            },
            text: {
              color: 'white',
            },
          },
          marked: true,
        };
      });
    });

    markedDates[selected] = {
      selected: true,
      disableTouchEvent: true,
      selectedColor: 'orange',
      selectedTextColor: 'red',
    };

    return markedDates;
  }, [selected, workoutForms]);

  return (
    <View style={styles.container}>
      <Calendar
        enableSwipeMonths
        style={styles.calendar}
        onDayPress={(day) => setSelected(day.dateString)}
        markedDates={marked}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  calendar: {
    marginBottom: 10,
  },
});

export default CalendarComponent;