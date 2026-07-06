import React from "react";
import { ImageBackground, Pressable, SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

import { colors } from "../constants/colors";
import { images } from "../constants/fallbackImages";
import { styles } from "../styles/appStyles";
import { GlassCard } from "../components/shared";

export default function OnboardingScreen({ onStart }) {
  return (
    <ImageBackground source={{ uri: images.onboarding }} style={styles.onboardingImage}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={["rgba(86,0,27,0.18)", "rgba(86,0,27,0.85)"]}
        style={StyleSheet.absoluteFill}
      />
      <SafeAreaView style={styles.onboardingSafe}>
        <View style={styles.brandRow}>
          <MaterialCommunityIcons name="home-city" color={colors.white} size={32} />
          <Text style={styles.brandText}>SAMADHAN</Text>
        </View>
        <View style={styles.onboardingContent}>
          <View style={styles.heroWords}>
            <Text style={styles.exploreText}>EXPLORE</Text>
            <Text style={styles.livingText}>LIVING</Text>
          </View>
          <GlassCard style={styles.onboardingCopyCard} intensity={28} tint="dark">
            <Text style={styles.onboardingCopy}>
              Access the city's most prestigious addresses with unmatched comfort and
              sophistication.
            </Text>
          </GlassCard>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Get started"
            onPress={onStart}
            style={({ pressed }) => [styles.primaryPill, pressed && styles.pressed]}
          >
            <Text style={styles.primaryPillText}>GET STARTED</Text>
            <View style={styles.primaryPillIcon}>
              <Ionicons name="arrow-up" color={colors.white} size={18} style={styles.tiltIcon} />
            </View>
          </Pressable>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}
