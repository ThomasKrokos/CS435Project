import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect, useMemo } from 'react';
import { View, Button, ScrollView, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useNavigation } from '@react-navigation/native';

const WorkoutGenerator = ({ route }) => {
  const [RoutineForms, setRoutineForms] = useState([]);
  const [formName, setFormName] = useState('');
  const [splitName, setSplitName] = useState('');
  const [selectedDays, setSelectedDays] = useState([]);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const params = useMemo(() => route.params || {}, [route.params])
  const [updated, update] = useState(false)
  const navigation = useNavigation();
  DropDownPicker.setMode("BADGE");
  const [items, setItems] = useState([
    { label: 'Push, Pull, Legs', value: 'ppl' },
    { label: 'Full Body', value: 'fb' },
  ]);
  const days = [{
    label: 'Sunday',
    value: 'Sunday'
  },
  {
    label: 'Monday',
    value: 'Monday'
  },
  {
    label: 'Tuesday',
    value: 'Tuesday'
  },
  {
    label: 'Wednesday',
    value: 'Wednesday'
  },
  {
    label: 'Thursday',
    value: 'Thursday'
  },
  {
    label: 'Friday',
    value: 'Friday'
  },
  {
    label: 'Saturday',
    value: 'Saturday'
  },
  ]

  useEffect(() => {
    if (formName !== '') {
      formName.forEach((name) => {
        addRoutineForm(name);
      });
    }
  }, [formName]);

  useEffect(() => {
    if (params.name != undefined && params.workouts != []) saveRoutineForm(params.name, params.workouts);
  }, [params, saveRoutineForm])

  const MakeSplit = (item) => {
    setSplitName(item.label);
    if (item.value === 'ppl') setFormName(["Push", "Pull", "Legs"]);
    else if (item.value === 'fb') setFormName(["Full Body"]);
  }

  const addRoutineForm = (name) => {
    const newForm = {
      name: name,
      workouts: [],
      component: (
        <View >
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('WorkoutForm', { name: newForm.name, workouts: newForm.workouts })} >
            <Text style={styles.smallButtonText}> Edit Form </Text>
          </TouchableOpacity>
        </View>
      ),
    };
    setRoutineForms((prevForms) => [...prevForms, newForm]);
  };

  // add a second check to verify they want to delete it
  const removeRoutineForm = async (index) => {
    const newRoutineForms = [...RoutineForms];
    newRoutineForms.splice(index, 1);
    if (newRoutineForms.length === 0) {
      try {
        await AsyncStorage.removeItem('split');
      } catch (error) {
        console.log("Error removing split");
      }
    };
    setRoutineForms(newRoutineForms);
  };

  const saveRoutineForm = (name, workouts) => {
    const form = RoutineForms.find((aForm) => aForm.name == name);
    form.workouts = workouts;
    update(!updated);
  }

  const saveRoutine = async () => {
    let complete = true;
    for (x = 0; x < RoutineForms.length; x++) {
      if (RoutineForms[x].workouts.length == 0) complete = false;
    }
    if (selectedDays.length == 0) complete = false;

    if (complete) {
      try {
        await AsyncStorage.setItem('workoutDays', JSON.stringify(selectedDays));
      } catch (error) {
        console.log("Error: " + error);
      }

      try {
        await AsyncStorage.setItem('split', JSON.stringify(splitName));
        navigation.navigate('MyWorkouts', { name: splitName });
      } catch (error) {
        console.log("Error saving split name: " + error);
      }
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.homeIcon} onPress={() => navigation.navigate('Home')}>
        <Image
          source={require("../assets/close.png")}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <Text style={styles.header}>Create a Workout Plan!</Text>
      {RoutineForms.length > 0 && (
        <View style={styles.daySelect}>
          <Text style={styles.daysHeader}>What days of the week would you like to workout?</Text>
          <DropDownPicker
            multiple={true}
            min={0}
            max={7}
            open={open2}
            value={selectedDays}
            setValue={setSelectedDays}
            items={days}
            setOpen={setOpen2}
          />
        </View>
      )}
      <ScrollView contentContainerStyle={styles.scrollView}>
        {RoutineForms.map((form, index) => (
          <View key={index} style={styles.formContainer}>
            <Text style={styles.formName}>{form.name}</Text>
            <View
              style={styles.hr}
            />
            {form.workouts.length == 0 && (
              <View>{form.component}</View>
            )}
            {form.workouts.length > 0 && (
              <Text style={styles.editButton}>Workout Created!</Text>
            )}
            <TouchableOpacity style={styles.button} onPress={() => removeRoutineForm(index)} >
              <Text style={styles.smallButtonText}> Remove Routine </Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      {splitName != "" && (
        <TouchableOpacity style={styles.button} onPress={saveRoutine} >
          <Text style={styles.buttonText}> Save Routine </Text>
        </TouchableOpacity>
      )}
      {RoutineForms.length == 0 && (
        <View style={styles.dropdown}>
          <Text style={{ fontSize: 17 }}>Select your split: </Text>
          <DropDownPicker
            open={open}
            items={items}
            setOpen={setOpen}
            setItems={setItems}
            onSelectItem={(item) => MakeSplit(item)}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  formName: {
    textAlign: 'center',
  },
  homeIcon: {
    position: 'absolute',
    top: '5%',
    right: '5%',
  },
  daySelect: {
    marginTop: '10%'
  },
  daysHeader: {
    alignSelf: 'center',
    fontSize: 15,
    marginBottom: '2.5%'
  },
  header: {
    fontSize: 20,
    marginTop: '20%',
  },
  button: {
    backgroundColor: 'black',
    marginTop: '2.5%'
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    paddingHorizontal: '2.5%',
    paddingVertical: '2.5%'
  },
  smallButtonText: {
    color: 'white',
    alignSelf: 'center',
    fontSize: 15,
    paddingHorizontal: '2%',
    paddingVertical: '2%'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  editButton: {
    marginVertical: '5%',
    alignSelf: 'center',
    paddingHorizontal: '2.5%'
  },
  scrollView: {
    alignItems: 'center',
    marginTop: '10%',
  },
  formContainer: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 15,
    paddingVertical: '5%',
    paddingHorizontal: '5%',
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
  hr: {
    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginBottom: 5,
  },
  dropdown: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: '17.5%',
    width: '95%'
  }
});

export default WorkoutGenerator;
