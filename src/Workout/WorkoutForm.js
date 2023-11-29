import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { View, ScrollView, Image, TextInput, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const WorkoutForm = ({ route }) => {
    const { name, workoutList } = route.params;
    const [workouts, setWorkouts] = useState([]);
    const [formName] = useState(name);
    const navigation = useNavigation();

    useEffect(() => {
        if (workoutList != undefined) setWorkouts(workoutList);
    }, workoutList);

    const handleInputChange = (index, fieldName, value) => {
        const updatedWorkouts = [...workouts];
        updatedWorkouts[index][fieldName] = value;
        setWorkouts(updatedWorkouts);
    };

    const addWorkout = () => {
        const newWorkout = {
            name: '',
            sets: '',
            reps: '',
            weight: '',
        };
        setWorkouts([...workouts, newWorkout]);
    };

    const removeWorkout = (index) => {
        const updatedWorkouts = [...workouts];
        updatedWorkouts.splice(index, 1);
        setWorkouts(updatedWorkouts);
    };

    const saveForm = async () => {
        const formData = {
            formName: formName.trim(),
            workouts: [...workouts],
        }

        try {
            await AsyncStorage.setItem(JSON.stringify(formName), JSON.stringify(formData));
        } catch (error) {
            console.log("Error saving form")
        }
        if (workoutList == undefined) navigation.navigate('Workouts', { name: formData.formName, workouts: formData.workouts });
        else navigation.navigate('MyWorkouts');
    };

    return (
        <View style={styles.routineForm}>
            <TouchableOpacity style={styles.homeIcon} onPress={() => navigation.pop()}>
                <Image
                    source={require("../../assets/close.png")}
                    resizeMode="contain"
                />
            </TouchableOpacity>
            <View style={styles.formContainer}>
                <Text style={styles.name}>{formName}</Text>
                <View
                    style={styles.hr}
                />
                {workouts.length == 0 && (
                    <View style={styles.emptyText}>
                        <Text>No Workouts to Display.</Text>
                    </View>
                )}
                <ScrollView>
                    {workouts.map((workout, index) => (
                        <View key={index} style={styles.workoutContainer}>
                            <Text style={styles.count}>{index + 1 + " )"}</Text>
                            <TextInput
                                style={styles.workoutInput}
                                value={workout.name}
                                placeholder="Workout Name "
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
                </ScrollView>
                <View style={styles.addWorkout}>
                    <Button title="Add Workout" onPress={addWorkout} />
                </View>
            </View>
            {workouts.length > 0 && (
                <View style={styles.saveForm}>
                    <Button title="Save Form" onPress={saveForm} />
                </View>
            )}
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
    homeIcon: {
        position: 'absolute',
        top: '5%',
        right: '5%',
    },
    scrollView: {
        alignItems: 'center',
    },
    formContainer: {
        width: '95%',
        marginBottom: 10,
        marginTop: '25%',
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 15,
        paddingVertical: '5%',
        paddingHorizontal: '4%',
        backgroundColor: 'white',
        maxHeight: '80%',
    },
    formNameContainer: {
        marginTop: 20,
    },
    workoutInput: {
        textAlign: 'center',
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        marginLeft: '2.5%',
    },
    workoutName: {
        width: '40%',
        textAlign: 'center',
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        marginLeft: '2.5%',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 10,
    },
    routineForm: {
        marginTop: 20,
        marginBottom: 20,
        height: '100%',
        width: '100%',
        alignItems: 'center',
    },
    labels: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    label: {
        fontWeight: 'bold',
        paddingHorizontal: '5%',
    },
    workoutContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    closeIcon: {
        paddingLeft: 20,
        paddingTop: 10,
    },
    text: {
        fontSize: 15,
        marginLeft: '2.5%',
    },
    colon: {
        paddingBottom: 5,
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
    dropdown: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    count: {
        fontSize: 15,
        paddingRight: 10,
        paddingBottom: -5,
    },
    name: {
        fontSize: 20,
        alignSelf: 'center',
        marginBottom: '2.5%',
    },
    addWorkout: {
        alignSelf: 'center',
        position: 'relative',
        paddingTop: '2.5%',
        width: 'fit-content'
    },
    saveForm: {
        position: 'absolute',
        bottom: '5%',
    },
    hr: {
        borderBottomColor: 'black',
        borderBottomWidth: StyleSheet.hairlineWidth,
        marginBottom: 15,
    },
    emptyText: {
        alignItems: 'center',
        paddingBottom: 10,
    }
});

export default WorkoutForm;