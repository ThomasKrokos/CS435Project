import React, { useState } from 'react';
import { View, Button, ScrollView, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import DropDownPicker from 'react-native-dropdown-picker';


function RoutineForm() {
  const [workouts, setWorkouts] = useState([]);
  const [formName, setFormName] = useState('');
  const [selectedDays, setSelectedDays] = useState([]);

  const addWorkout = () => {
    const newWorkout = {
      name: formName,
      sets: '',
      reps: '',
      weight: '',
    };
    setWorkouts([...workouts, newWorkout]);
  };

  const handleInputChange = (index, fieldName, value) => {
    const updatedWorkouts = [...workouts];
    updatedWorkouts[index][fieldName] = value;
    setWorkouts(updatedWorkouts);
  };

  const removeWorkout = (index) => {
    const updatedWorkouts = [...workouts];
    updatedWorkouts.splice(index, 1);
    setWorkouts(updatedWorkouts);
  };

  // const handleDayToggle = (day) => {
  //   const updatedSelectedDays = selectedDays.includes(day)
  //     ? selectedDays.filter((selectedDay) => selectedDay !== day)
  //     : [...selectedDays, day];
  //   setSelectedDays(updatedSelectedDays);
  // };

  return (
    <View style={styles.RoutineForm}>
      {workouts.map((workout, index) => (
        <View key={index} style={styles.workoutContainer}>
          <TextInput
            style={styles.workoutInput}
            value={workout.name}
            placeholder="Workout Name"
            onChangeText={(text) => handleInputChange(index, 'name', text)}
          />
          <Text style={styles.colon}>:</Text>
          <TextInput
            style={styles.workoutInput}
            value={workout.sets}
            placeholder="Sets"
            onChangeText={(text) => handleInputChange(index, 'sets', text)}
          />
          <Text style={styles.text}>x</Text>
          <TextInput
            style={styles.workoutInput}
            value={workout.reps}
            placeholder="Reps"
            onChangeText={(text) => handleInputChange(index, 'reps', text)}
          />
          <TextInput
            style={styles.workoutInput}
            value={workout.weight}
            placeholder="Weight"
            onChangeText={(text) => handleInputChange(index, 'weight', text)}
          />
          <Text style={styles.text}>lbs</Text>
          <TouchableOpacity onPress={() => removeWorkout(index)}>
            <Icon name="close" style={styles.closeIcon} size={20} color="red" />
          </TouchableOpacity>
        </View>
      ))}
      <Button title="Add Workout" onPress={addWorkout} />
      {/* <View style={styles.dayToggleContainer}>
        <Text>Select Workout Days:</Text>
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <TouchableOpacity
            key={day}
            style={[
              styles.dayToggle,
              selectedDays.includes(day) && styles.selectedDayToggle,
            ]}
            onPress={() => handleDayToggle(day)}
          >
            <Text>{day}</Text>
          </TouchableOpacity>
        ))}
      </View> */}
    </View>
  );
}

function RoutineFormContainer() {
  const [RoutineForms, setRoutineForms] = useState([]);
  const [formName, setFormName] = useState('');
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'Push, Pull, Legs', value: 'ppl' },
    { label: 'Full Body', value: 'fb' },
    { label: 'Custom', value: 'c' }
  ]);

  // const CreateForm = (value) => {
  //   if(value === "ppl") setFormName("Push")
  //   if(value === "fb") setFormName("Full Body")
  //   if(Value === "Custom") setFormName("Custom")
  // }

  const addRoutineForm = (value) => {
    if (value === "ppl") setFormName("Push");
    if (value === "fb") setFormName("Full Body");
    if (Value === "c") setFormName("Custom");
    if (formName.trim() !== '') {
      const newForm = {
        name: formName,
        component: <RoutineForm key={RoutineForms.length} />,
      };
      const newRoutineForms = [...RoutineForms, newForm];
      setRoutineForms(newRoutineForms);
      setFormName('');
    }
  };

  const removeRoutineForm = (index) => {
    const newRoutineForms = [...RoutineForms];
    newRoutineForms.splice(index, 1);
    setRoutineForms(newRoutineForms);
  };

  return (
    <View style={styles.container}>
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        onSelectItem={(value) => addRoutineForm}
      />
      <ScrollView contentContainerStyle={styles.scrollView}>
        {RoutineForms.map((form, index) => (
          <View key={index} style={styles.formContainer}>
            <Text style={styles.formName}>{form.name}</Text>
            {form.component}
            <Button title="Remove Form" onPress={() => removeRoutineForm(index)} />
          </View>
        ))}
      </ScrollView>
      <View style={styles.formNameContainer}>
        <TextInput
          style={styles.input}
          value={formName}
          onChangeText={(text) => setFormName(text)}
          placeholder="Enter Form Name"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  formName: {
    textAlign: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  scrollView: {
    alignItems: 'center',
  },
  formContainer: {
    marginBottom: 10,
  },
  formNameContainer: {
    marginTop: 20,
  },
  workoutInput: {
    height: 40,
    textAlign: 'center',
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    marginBottom: 10,
    marginLeft: '2.5%',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
  RoutineForm: {
    marginTop: 20,
    marginBottom: 20,
    width: '100%',
  },
  labels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
  },
  workoutContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  closeIcon: {
    marginLeft: 15,
  },
  text: {
    fontSize: 15,
    marginLeft: '2.5%',
  },
  colon: {
    paddingBottom: 15,
    fontSize: 20,
  },
  dayToggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  dayToggle: {
    padding: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'gray',
  },
  selectedDayToggle: {
    backgroundColor: 'lightblue',
  },
});

export default RoutineFormContainer;