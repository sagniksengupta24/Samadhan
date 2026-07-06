import React from "react";
import { ActivityIndicator, Image, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";

import { colors } from "../constants/colors";
import { sortOptions } from "../constants/listingOptions";
import { styles } from "../styles/appStyles";

export function TopBar() {
  return (
    <View style={styles.topBar}>
      <View style={styles.topLeft}>
        <IconButton icon="grid-outline" />
        <View>
          <View style={styles.locationRow}>
            <Ionicons name="location-outline" color={colors.onSurfaceVariant} size={14} />
            <Text style={styles.captionStrong}>Local listings</Text>
          </View>
        </View>
      </View>
      <View>
        <IconButton icon="notifications-outline" />
        <View style={styles.notificationDot} />
      </View>
    </View>
  );
}

export function SegmentedControl({ value, options, onChange }) {
  return (
    <View style={styles.segmented}>
      {options.map((option) => {
        const active = option.value === value;
        return (
          <Pressable
            key={option.value}
            accessibilityRole="button"
            accessibilityState={{ selected: active }}
            onPress={() => onChange(option.value)}
            style={active ? styles.segmentActive : styles.segmentInactive}
          >
            <Text style={active ? styles.segmentActiveText : styles.segmentInactiveText}>
              {option.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

export function SearchPanel({ value, onChangeText }) {
  return (
    <GlassCard style={styles.searchPanel}>
      <View style={styles.searchInputWrap}>
        <Ionicons name="search" color={colors.onSurfaceVariant} size={22} />
        <TextInput
          accessibilityLabel="Search by property name or address"
          placeholder="Search your place"
          placeholderTextColor="rgba(85,66,68,0.55)"
          style={styles.searchInput}
          value={value}
          onChangeText={onChangeText}
        />
        <MaterialIcons name="my-location" color={colors.primary} size={22} />
      </View>
      <View style={styles.dateGrid}>
        <SoftInput icon="calendar-outline" label="Start Date" />
        <SoftInput icon="calendar-outline" label="End Date" />
      </View>
    </GlassCard>
  );
}

export function SortRail({ value, onChange }) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.sortRail}
    >
      {sortOptions.map((option) => {
        const active = option.value === value;
        return (
          <Pressable
            key={option.value}
            accessibilityRole="button"
            accessibilityState={{ selected: active }}
            style={[styles.sortChip, active ? styles.sortChipActive : styles.sortChipInactive]}
            onPress={() => onChange(option.value)}
          >
            <Text style={active ? styles.sortChipActiveText : styles.sortChipText}>
              {option.label}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

export function CategoryRail() {
  const categories = [
    ["Apartment", "business-outline"],
    ["Villa", "home-outline"],
    ["Cottage", "leaf-outline"],
    ["House", "storefront-outline"]
  ];
  return (
    <View style={styles.section}>
      <SectionHeader title="Categories" action="Browse" />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.rail}>
        {categories.map(([label, icon], index) => (
          <View
            key={label}
            style={[styles.chip, index === 0 ? styles.chipActive : styles.chipInactive]}
          >
            <Ionicons
              name={icon}
              color={index === 0 ? colors.onPrimary : colors.onSurfaceVariant}
              size={18}
            />
            <Text style={index === 0 ? styles.chipActiveText : styles.chipInactiveText}>
              {label}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

export function SectionHeader({ title, action }) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Text style={styles.sectionAction}>{action}</Text>
    </View>
  );
}

export function ImageSlot({ large = false, label, uri, onPick, onRemove }) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={uri ? "Change property image" : label || "Add property image"}
      onPress={onPick}
      style={large ? styles.coverUpload : styles.smallUpload}
    >
      <GlassCard style={styles.uploadGlass}>
        {uri ? (
          <>
            <Image source={{ uri }} style={styles.uploadedImage} />
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Remove image"
              onPress={(event) => {
                event.stopPropagation?.();
                onRemove();
              }}
              style={styles.removeImageButton}
            >
              <Ionicons name="close" color={colors.primary} size={18} />
            </Pressable>
          </>
        ) : (
          <>
            <Ionicons name={large ? "images-outline" : "add"} color={colors.primary} size={large ? 42 : 28} />
            {label ? <Text style={styles.uploadText}>{label}</Text> : null}
          </>
        )}
      </GlassCard>
    </Pressable>
  );
}

export function GlassCard({ children, style, intensity = 28, tint = "light" }) {
  return (
    <BlurView intensity={intensity} tint={tint} style={[styles.glass, style]}>
      {children}
    </BlurView>
  );
}

export function IconButton({ icon, onPress, compact = false, disabled = false }) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={icon.replace(/-/g, " ")}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        compact ? styles.iconButtonCompact : styles.iconButton,
        disabled && styles.disabledIcon,
        pressed && !disabled && styles.pressed
      ]}
    >
      <Ionicons name={icon} color={disabled ? colors.outline : colors.primary} size={compact ? 18 : 22} />
    </Pressable>
  );
}

export function SoftInput({ icon, label }) {
  return (
    <View style={styles.softInput}>
      <Ionicons name={icon} color={colors.onSurfaceVariant} size={19} />
      <Text style={styles.captionStrong}>{label}</Text>
    </View>
  );
}

export function Spec({ icon, label }) {
  return (
    <View style={styles.spec}>
      <MaterialCommunityIcons name={icon} color={colors.onSurfaceVariant} size={18} />
      <Text style={styles.specText}>{label}</Text>
    </View>
  );
}

export function Feature({ icon, label }) {
  return (
    <View style={styles.feature}>
      <View style={styles.featureIcon}>
        <MaterialCommunityIcons name={icon} color={colors.primaryContainer} size={22} />
      </View>
      <Text style={styles.featureText}>{label}</Text>
    </View>
  );
}

export function FormField({
  icon,
  label,
  placeholder,
  multiline = false,
  keyboardType,
  secureTextEntry = false,
  autoCapitalize,
  textContentType,
  prefix,
  value,
  onChangeText,
  error
}) {
  return (
    <View style={styles.fieldWrap}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <GlassCard style={[styles.inputGlass, multiline && styles.inputGlassMultiline, error && styles.inputError]}>
        <Ionicons name={icon} color={error ? colors.error : colors.onSurfaceVariant} size={20} />
        {prefix ? <Text style={styles.prefix}>{prefix}</Text> : null}
        <TextInput
          accessibilityLabel={label}
          placeholder={placeholder}
          placeholderTextColor="rgba(85,66,68,0.5)"
          multiline={multiline}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
          autoCapitalize={autoCapitalize}
          textContentType={textContentType}
          style={[styles.textInput, multiline && styles.textArea]}
          value={value}
          onChangeText={onChangeText}
        />
      </GlassCard>
      {error ? <Text style={[styles.errorText, styles.fieldErrorText]}>{error}</Text> : null}
    </View>
  );
}

export function LoadingState({ label }) {
  return (
    <GlassCard style={styles.stateCard}>
      <ActivityIndicator color={colors.primary} />
      <Text style={styles.stateText}>{label}</Text>
    </GlassCard>
  );
}

export function ErrorState({ message, onRetry }) {
  return (
    <GlassCard style={styles.stateCard}>
      <Ionicons name="warning-outline" color={colors.error} size={28} />
      <Text style={styles.stateTitle}>Something went wrong</Text>
      <Text style={styles.stateText}>{message}</Text>
      <Pressable style={({ pressed }) => [styles.retryButton, pressed && styles.pressed]} onPress={onRetry}>
        <Text style={styles.retryButtonText}>Retry</Text>
      </Pressable>
    </GlassCard>
  );
}

export function EmptyState({ icon, title, message, actionLabel, onAction }) {
  return (
    <GlassCard style={styles.stateCard}>
      <Ionicons name={icon} color={colors.primary} size={34} />
      <Text style={styles.stateTitle}>{title}</Text>
      <Text style={styles.stateText}>{message}</Text>
      {actionLabel ? (
        <Pressable style={({ pressed }) => [styles.retryButton, pressed && styles.pressed]} onPress={onAction}>
          <Text style={styles.retryButtonText}>{actionLabel}</Text>
        </Pressable>
      ) : null}
    </GlassCard>
  );
}
