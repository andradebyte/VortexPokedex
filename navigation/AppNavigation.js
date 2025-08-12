import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DashBoardScreen from "../screens/Dashboard";
import HomeScreen from "../screens/Homescreen";

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
        contentStyle: { backgroundColor: "white" },
      }}
    >
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="DashBoardScreen" component={DashBoardScreen} />
    </Stack.Navigator>
  );
}
