// import AsyncStorage from '@react-native-async-storage/async-storage';
// import React, { useState, useEffect, useMemo } from 'react';
// import { View, Button, ScrollView, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import DropDownPicker from 'react-native-dropdown-picker';
// import { useNavigation } from '@react-navigation/native';

// const RoutineFormContainer = ({route}) => {
//   const [RoutineForms, setRoutineForms] = useState([]);
//   const [formName, setFormName] = useState('');
//   const [open, setOpen] = useState(false);
//   // const params = useMemo(() => route.params || {}, [route.params])
//   const [items, setItems] = useState([
//     { label: 'Push, Pull, Legs', value: 'ppl' },
//     { label: 'Full Body', value: 'fb' },
//   ]);
//   const navigation = useNavigation();

//   useEffect(() => {
//     if (formName !== '') {
//       formName.forEach((name) => {
//         addRoutineForm(name);
//       });
//     }
//   }, [formName]);

//   // useEffect(() => {
//   //   saveRoutineForm(params.formData);
//   // }, [params, saveRoutineForm])

//   const MakeSplit = async (item) => {
//     try {
//       await AsyncStorage.setItem('split', JSON.stringify(item.label));
//     } catch (error) {
//       console.log("Error saving split name");
//     }
//     if (item.value === 'ppl') setFormName(["Push", "Pull", "Legs"]);
//     else if (item.value === 'fb') setFormName(["Full Body"]);
//   }

//   const addRoutineForm = (name) => {
//     const newForm = {
//       name: name,
//       workouts: [],
//       component: (
//         <View>
//           <Button title="Edit Form" onPress={() => navigation.navigate('WorkoutForm', { name: newForm.name, workouts: newForm.workouts })} />
//         </View>
//       ),
//     };
//     setRoutineForms((prevForms) => [...prevForms, newForm]);
//   };

//   const removeRoutineForm = async (index) => {
//     const newRoutineForms = [...RoutineForms];
//     newRoutineForms.splice(index, 1);
//     if (newRoutineForms.length === 0) {
//       try {
//         await AsyncStorage.removeItem('split');
//       } catch (error) {
//         console.log("Error removing split");
//       }
//     };
//     setRoutineForms(newRoutineForms);
//   };

//   const saveRoutineForm = (formData) => {
//     console.log(formData.name);
//     // const form = RoutineForms.find((aForm) => aForm.name == formData.name);
//     // form.workouts = formData.workouts;
//   }

//   return (
//     <View style={styles.container}>
//       <ScrollView contentContainerStyle={styles.scrollView}>
//         {RoutineForms.map((form, index) => (
//           <View key={index} style={styles.formContainer}>
//             <Text style={styles.formName}>{form.name}</Text>
//             {form.workouts.length == 0 && (
//               <View>{form.component}</View>
//             )}
//             <Button title="Remove Form" onPress={() => removeRoutineForm(index)} />
//           </View>
//         ))}
//       </ScrollView>
//       {RoutineForms.length == 0 && (
//         <View style={styles.dropdown}>
//           <Text style={{ fontSize: 17 }}>Select your split: </Text>
//           <DropDownPicker
//             open={open}
//             items={items}
//             setOpen={setOpen}
//             setItems={setItems}
//             onSelectItem={(item) => MakeSplit(item)}
//           />
//         </View>
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   formName: {
//     textAlign: 'center',
//   },
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
//   scrollView: {
//     alignItems: 'center',
//   },
//   formContainer: {
//     marginBottom: 10,
//     borderWidth: 1,
//     borderColor: 'black',
//     borderRadius: 15,
//     paddingVertical: '5%',
//     paddingHorizontal: '5%',
//   },
//   formNameContainer: {
//     marginTop: 20,
//   },
//   workoutInput: {
//     height: 40,
//     textAlign: 'center',
//     borderBottomColor: 'gray',
//     borderBottomWidth: 1,
//     marginBottom: 10,
//     marginLeft: '2.5%',
//   },
//   input: {
//     height: 40,
//     borderColor: 'gray',
//     borderWidth: 1,
//     marginBottom: 10,
//     paddingLeft: 10,
//   },
//   RoutineForm: {
//     marginTop: 20,
//     marginBottom: 20,
//     width: '100%',
//   },
//   labels: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 10,
//   },
//   label: {
//     fontWeight: 'bold',
//   },
//   workoutContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   closeIcon: {
//     marginLeft: 15,
//   },
//   text: {
//     fontSize: 15,
//     marginLeft: '2.5%',
//   },
//   colon: {
//     paddingBottom: 15,
//     fontSize: 20,
//   },
//   dayToggleContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 10,
//   },
//   dayToggle: {
//     padding: 5,
//     borderRadius: 5,
//     borderWidth: 1,
//     borderColor: 'gray',
//   },
//   selectedDayToggle: {
//     backgroundColor: 'lightblue',
//   },
//   dropdown: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     position: 'absolute',
//     top: 0,
//     width: '95%'
//   }
// });

// export default RoutineFormContainer;
