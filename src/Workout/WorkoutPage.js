import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { View, ScrollView, Image, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const WorkoutPage = () => {
    const [split, setSplit] = useState('');
    const [forms, setForms] = useState([]);
    const [workoutDays, setWorkoutDays] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        getSplit();
    }, []);

    useEffect(() => {
        getWorkouts();
        getWorkoutDays();
    }, [split, forms]);

    const getSplit = async () => {
        try {
            const mySplit = await AsyncStorage.getItem('split');
            setSplit(JSON.parse(mySplit));
        } catch (error) {
            console.log("Error: " + error);
        }
    }

    const getWorkouts = async () => {
        if (split == "Full Body") {
            try {
                const form = await AsyncStorage.getItem(JSON.stringify('Full Body'));
                setForms([JSON.parse(form)]);
            } catch (error) {
                console.log("Error: " + error);
            }
        }
        else if (split == "Push, Pull, Legs") {
            let pplForms = ['Push', 'Pull', 'Legs'];
            for (x = 0; x < 3; x++) {
                try {
                    const form = await AsyncStorage.getItem(JSON.stringify(pplForms[x]));
                    pplForms[x] = form;
                } catch (error) {
                    console.log("Error: " + error);
                }
            }
            setForms([JSON.parse(pplForms[0]), JSON.parse(pplForms[1]), JSON.parse(pplForms[2])]);
        }
    }

    const getWorkoutDays = async () => {
        try {
            const days = await AsyncStorage.getItem('workoutDays');
            if (days !== null) {
                setWorkoutDays(JSON.parse(days));
            }
        } catch (error) {
            console.log("Error: " + error);
        }
    }

    const deleteSplit = async () => {
        try {
            await AsyncStorage.removeItem('split');
            navigation.popToTop();
        } catch (error) {
            console.log("Error deleting split");
        }
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.homeIcon} onPress={() => navigation.navigate('Home')}>
                <Image
                    source={require("../../assets/close.png")}
                    resizeMode="contain"
                />
            </TouchableOpacity>
            <Text style={styles.header}>My Workouts</Text>
            <View style={styles.daysContainer}>
                <Text style={styles.daysHeader}>Scheduled Workout Days: </Text>
                <Text>
                    {workoutDays.map((day, index) => (
                        <View key={index}>
                            {index == 0 && (
                                <Text style={styles.daysText}>{day}</Text>
                            )}
                            {index != 0 && (
                                <Text style={styles.daysText}>{", " + day}</Text>
                            )}
                        </View>
                    ))}
                </Text>
            </View>
            <ScrollView contentContainerStyle={styles.formStyle}>
                {forms.map((form, index) => (
                    <View key={index} style={styles.formContainer}>
                        <TouchableOpacity style={styles.editWorkout} onPress={() => navigation.navigate('WorkoutForm', { name: form.formName, workoutList: form.workouts })}>
                            <Icon name="pencil" size={20} color="black" />
                        </TouchableOpacity>
                        <Text style={styles.formName}>{form.formName}</Text>
                        <View
                            style={styles.hr}
                        />
                        <View>
                            {form.workouts.map((workout, index) => (
                                <View key={index} style={styles.workoutContainer}>
                                    <Text style={styles.count}>{index + 1 + ")"}</Text>
                                    <Text style={styles.workoutName}>{workout.name + ":"}</Text>
                                    <Text style={styles.workoutInput}>{workout.sets}</Text>
                                    <Text style={styles.sets}>  x  </Text>
                                    <Text style={styles.workoutInput}>{workout.reps + "  "}</Text>
                                    <Text style={styles.workoutWeight}>{workout.weight}</Text>
                                    <Text style={styles.lbs}>  lbs</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                ))}
            </ScrollView>
            <TouchableOpacity style={styles.deleteSplit} onPress={deleteSplit} >
                <Text style={styles.buttonText}> Delete Split </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        height: '100%',
        width: '100%',
    },
    header: {
        fontSize: 25,
        marginTop: '15%',
    },
    homeIcon: {
        position: 'absolute',
        top: '5%',
        right: '5%',
    },
    daysContainer: {
        alignItems: 'center',
        paddingTop: '5%'
    },
    daysHeader: {
        fontSize: 20,
    },
    daysText: {
        fontSize: 15,
        marginTop: 5,
    },
    formStyle: {
        marginTop: '5%'
    },
    deleteSplit: {
        alignSelf: 'center',
        marginVertical: '5%',
        backgroundColor: 'black',
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
        paddingHorizontal: '2.5%',
        paddingVertical: '2.5%'
    },
    editWorkout: {
        position: 'absolute',
        right: '5%',
        top: 15,
    },
    formName: {
        fontSize: 20,
        alignSelf: 'center',
        marginBottom: 10,
    },
    formContainer: {
        width: '100%',
        marginBottom: 10,
        marginTop: '5%',
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 15,
        paddingVertical: '5%',
        paddingHorizontal: '4%',
        backgroundColor: 'white',
    },
    hr: {
        borderBottomColor: 'black',
        borderBottomWidth: StyleSheet.hairlineWidth,
        marginBottom: 15,
    },
    routines: {
        alignItems: 'center',
    },
    count: {
        fontSize: 15,
    },
    workoutContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    workoutName: {
        width: '40%',
        textAlign: 'center',
        fontSize: 15,
        paddingLeft: '2%',
    },
    workoutInput: {
        width: '10%',
        textAlign: 'center',
        fontSize: 17,
    },
    workoutWeight: {
        width: '10%',
        textAlign: 'center',
        fontSize: 17,
        marginLeft: '2.5%',
    },
    sets: {
        fontSize: 17,
    },
    lbs: {
        fontSize: 15,
        paddingTop: 5,
    },
});

export default WorkoutPage;