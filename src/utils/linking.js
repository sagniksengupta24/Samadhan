import { Alert, Linking } from "react-native";

export async function openContact(type, property) {
  const url = type === "phone" ? `tel:${property.contactPhone}` : `mailto:${property.contactEmail}`;
  try {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert("Contact unavailable", "This device cannot open that contact method.");
    }
  } catch {
    Alert.alert("Contact unavailable", "Unable to open this contact method.");
  }
}
