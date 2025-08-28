import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PokedexScreen from "../screens/Pokedex";
import HomeScreen from "../screens/Homescreen";
import InfoScreen from "../screens/Pokedex/Info";
import CameraScreen from "../screens/Camera/CameraScreen";
import ImageSendingScreen from "../screens/Camera/ImageSendingScreen";
import LandingPage from "../screens/Auth/LandingPage";

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
        contentStyle: { backgroundColor: "#eaeaea" },
      }}
    >
      <Stack.Screen name="LandingPage" component={LandingPage} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="PokedexScreen" component={PokedexScreen} />
      <Stack.Screen name="InfoScreen" component={InfoScreen} />
      <Stack.Screen name="CameraScreen" component={CameraScreen} />
      <Stack.Screen name="ImageSendingScreen" component={ImageSendingScreen} />
    </Stack.Navigator>
  );
}
