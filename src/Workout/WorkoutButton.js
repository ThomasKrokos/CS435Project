import React, { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { View, Pressable, Image, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';
import { RFValue } from "react-native-responsive-fontsize";


const WorkoutButton = () => {
    const [workoutDays, setWorkoutDays] = useState([]);
    const [day, setDay] = useState('');
    const [split, setSplit] = useState('');
    const [currDay, setCurrDay] = useState('');
    const navigation = useNavigation();
    const daysArr = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const workoutsArr = ["Push", "Pull", "Legs", "Push"];
    const d = new Date();

    useEffect(() => {
        getInfo();
    }, [split, workoutDays]);

    const getInfo = async () => {
        setDay(daysArr[d.getDay()]);

        try {
            const lastWorkout = await AsyncStorage.getItem('lastWorkout');
            if (lastWorkout !== null){
                let index = workoutsArr.find(lastWorkout);
                if (split == 'Push, Pull, Legs'){
                    setCurrDay(workoutsArr[index + 1]);
                } else setCurrDay("Full Body");
            }
            else {
                if (split == 'Push, Pull, Legs') setCurrDay("Push");
                else setCurrDay("Full Body");
            }
        } catch (error) {
            console.log("Error: " + error);
        }

        try {
            const split = await AsyncStorage.getItem('split');
            if (split !== null) setSplit(JSON.parse(split));
            else setSplit("")
        } catch (error) {
            console.log("Error getting split Name");
        }

        try {
            const days = await AsyncStorage.getItem('workoutDays');
            if (days !== null) {
                setWorkoutDays(JSON.parse(days));
            }
        } catch (error) {
            console.log("Error: " + error);
        }
    }

    return (
        <View>
            {(split == undefined || split == "") && (
                <Pressable
                    style={({ pressed }) => [
                        styles.button,
                        {
                            flex: 1,
                            padding: "5%",
                            backgroundColor: pressed ? "#bbbbbb" : "#000000",
                        },
                    ]}
                    onPress={() => navigation.navigate('Workouts')}
                >
                    <Text
                        style={[
                            styles.buttonTitle,
                            {
                                fontSize: RFValue(18),
                                fontWeight: "bold",
                            },
                        ]}
                    >
                        Create Workout!
                    </Text>
                </Pressable>
            )}

            {split != "" && (
                <Pressable
                    style={({ pressed }) => [
                        styles.button,
                        {
                            flex: 1,
                            padding: "5%",
                            backgroundColor: pressed ? "#bbbbbb" : "#000000",
                        },
                    ]}
                    onPress={() => navigation.navigate('MyWorkouts')}
                >
                    {workoutDays.includes(day) && (
                        <View>
                            <Text style={styles.buttonTitle}>{currDay} Day</Text>
                            <Text style={styles.buttonTitle}>
                                View Workouts!
                            </Text>
                        </View>
                    )}
                    {!workoutDays.includes(day) && (
                        <View>
                            <Text style={styles.buttonTitle}>Rest Day</Text>
                            <Text style={styles.buttonTitle}>
                                View Workouts!
                            </Text>
                        </View>
                    )}
                </Pressable>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        textAlign: "center",
        justifyContent: "center",
        backgroundColor: "#000000",
        margin: "1%",
        borderRadius: 20,
    },
    buttonTitle: {
        textAlign: "center",
        justifyContent: "center",
        color: "#FFFFFF",
        fontSize: RFValue(18),
        fontWeight: "bold",
    },
})

export default WorkoutButton;