import React, { useState } from "react";
import { ActivityIndicator, Pressable, SafeAreaView, ScrollView, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { colors } from "../constants/colors";
import { styles } from "../styles/appStyles";
import { signIn, signUp } from "../services/authService";
import { FormField, GlassCard, SegmentedControl, TopBar } from "../components/shared";

export default function AuthScreen({ title, message, authError, isRestoring, onAuthenticated }) {
  const [mode, setMode] = useState("signIn");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [statusType, setStatusType] = useState("info");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isSignUp = mode === "signUp";

  const handleModeChange = (nextMode) => {
    setMode(nextMode);
    setStatusMessage("");
    setStatusType("info");
  };

  const handleSubmit = async () => {
    setStatusMessage("");
    setStatusType("info");
    setIsSubmitting(true);

    try {
      const result = isSignUp
        ? await signUp(email, password, { full_name: fullName.trim() })
        : await signIn(email, password);

      if (result.session) {
        setStatusMessage(isSignUp ? "Account created." : "Signed in.");
        setStatusType("success");
        await onAuthenticated?.();
      } else {
        setStatusMessage("Check your email to confirm the account, then sign in.");
        setStatusType("info");
      }
    } catch (error) {
      setStatusMessage(error.message || "Unable to authenticate.");
      setStatusType("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView contentContainerStyle={styles.authContent} showsVerticalScrollIndicator={false}>
        <TopBar />
        <GlassCard style={styles.authCard}>
          <View style={styles.authIcon}>
            <Ionicons name="person-circle-outline" color={colors.primary} size={38} />
          </View>
          <Text style={styles.largeTitle}>{title}</Text>
          <Text style={styles.stateText}>{message}</Text>
          <SegmentedControl
            value={mode}
            options={[
              { value: "signIn", label: "Sign In" },
              { value: "signUp", label: "Sign Up" }
            ]}
            onChange={handleModeChange}
          />
          <View style={styles.formStack}>
            {isSignUp ? (
              <FormField
                icon="person-outline"
                label="Full Name"
                placeholder="Your name"
                value={fullName}
                autoCapitalize="words"
                textContentType="name"
                onChangeText={setFullName}
              />
            ) : null}
            <FormField
              icon="mail-outline"
              label="Email"
              placeholder="you@example.com"
              keyboardType="email-address"
              autoCapitalize="none"
              textContentType="emailAddress"
              value={email}
              onChangeText={setEmail}
            />
            <FormField
              icon="lock-closed-outline"
              label="Password"
              placeholder={isSignUp ? "At least 6 characters" : "Password"}
              secureTextEntry
              autoCapitalize="none"
              textContentType={isSignUp ? "newPassword" : "password"}
              value={password}
              onChangeText={setPassword}
            />
          </View>
          {authError ? <Text style={styles.errorText}>{authError}</Text> : null}
          {statusMessage ? (
            <Text style={[styles.statusText, statusType === "error" && styles.errorText]}>
              {statusMessage}
            </Text>
          ) : null}
          {isRestoring ? (
            <View style={styles.authRestoringRow}>
              <ActivityIndicator color={colors.primary} />
              <Text style={styles.stateText}>Restoring session...</Text>
            </View>
          ) : null}
          <Pressable
            disabled={isSubmitting || isRestoring}
            style={({ pressed }) => [
              styles.postButton,
              (isSubmitting || isRestoring) && styles.disabledAction,
              pressed && !isSubmitting && !isRestoring && styles.pressed
            ]}
            onPress={handleSubmit}
          >
            {isSubmitting ? <ActivityIndicator color={colors.onSecondaryContainer} /> : null}
            <Text style={styles.postButtonText}>
              {isSubmitting ? "Please wait..." : isSignUp ? "Create Account" : "Sign In"}
            </Text>
          </Pressable>
        </GlassCard>
      </ScrollView>
    </SafeAreaView>
  );
}
