import React from "react";
import { View } from "react-native";
import {
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
  Montserrat_800ExtraBold,
  useFonts
} from "@expo-google-fonts/montserrat";

import { AuthSessionProvider } from "./src/context/AuthSessionContext";
import AppNavigator from "./src/navigation/AppNavigator";
import { styles } from "./src/styles/appStyles";

export default function App() {
  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
    Montserrat_800ExtraBold
  });

  if (!fontsLoaded) {
    return <View style={styles.loadingCanvas} />;
  }

  return (
    <AuthSessionProvider>
      <AppNavigator />
    </AuthSessionProvider>
  );
}
