import { StyleSheet  } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Homepage from "./src/Homepage";
import FoodTracker from "./src/FoodTracker";
import WorkoutGenerator from "./src/WorkoutGenerator";
import Calendar from "./src/Calendar";
import WorkoutForm from "./src/Workout/WorkoutForm";
import WorkoutPage from "./src/Workout/WorkoutPage";
import Profile from "./src/Profile";
import UpdateProfile from "./src/Profile/UpdateProfile";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Homepage} />
        <Stack.Screen name="Tracker" component={FoodTracker} />
        <Stack.Screen name="Workouts" component={WorkoutGenerator} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="UpdateProfile" component={UpdateProfile} />
        <Stack.Screen name="Calendar" component={Calendar} />
        <Stack.Screen name="WorkoutForm" component={WorkoutForm} />
        <Stack.Screen name="MyWorkouts" component={WorkoutPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
