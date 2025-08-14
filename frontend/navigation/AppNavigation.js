import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DashBoardScreen from "../screens/Dashboard";
import HomeScreen from "../screens/Homescreen";
import InfoScreen from "../screens/Dashboard/Info";
import CameraScreen from "../screens/Camera/CameraScreen";
import LandingPage from "../screens/Auth/LandingPage";
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
      {/* <Stack.Screen name="LandingPage" component={LandingPage} /> */}
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="DashBoardScreen" component={DashBoardScreen} />
      <Stack.Screen name="InfoScreen" component={InfoScreen} />
      <Stack.Screen name="CameraScreen" component={CameraScreen} />
    </Stack.Navigator>
  );
}
