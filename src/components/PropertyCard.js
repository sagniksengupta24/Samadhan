import React from "react";
import { ActivityIndicator, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

import { colors } from "../constants/colors";
import { LISTING_TYPES, formatListingType, formatPrice } from "../models/propertyListing";
import { styles } from "../styles/appStyles";
import { getPrimaryImage } from "../utils/images";
import { GlassCard, Spec } from "./shared";

export default function PropertyCard({ property, onPress, onToggleSaved, isSaving = false }) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Open ${property.name}`}
      onPress={onPress}
      style={({ pressed }) => [styles.propertyCard, pressed && styles.cardPressed]}
    >
      <Image source={{ uri: getPrimaryImage(property) }} style={styles.propertyImage} />
      <LinearGradient
        pointerEvents="none"
        colors={["transparent", "rgba(86,0,27,0.2)"]}
        style={StyleSheet.absoluteFill}
      />
      <View style={styles.typeBadge}>
        <Text style={styles.typeBadgeText}>{formatListingType(property.listingType)}</Text>
      </View>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={property.saved ? "Remove saved listing" : "Save property"}
        disabled={isSaving}
        onPress={(event) => {
          event.stopPropagation?.();
          onToggleSaved();
        }}
        style={[styles.favoriteButton, isSaving && styles.disabledAction]}
      >
        {isSaving ? (
          <ActivityIndicator color={colors.primary} size="small" />
        ) : (
          <Ionicons
            name={property.saved ? "heart" : "heart-outline"}
            color={property.saved ? colors.primary : colors.onSurfaceVariant}
            size={22}
          />
        )}
      </Pressable>
      <GlassCard style={styles.propertyOverlay}>
        <View style={styles.propertyTitleRow}>
          <View style={styles.propertyTitleBlock}>
            <Text style={styles.propertyName}>{property.name}</Text>
            <View style={styles.locationRow}>
              <Ionicons name="location-outline" color={colors.onSurfaceVariant} size={14} />
              <Text style={styles.captionStrong} numberOfLines={1}>
                {property.address}
              </Text>
            </View>
          </View>
          <View style={styles.priceBlock}>
            <Text style={styles.propertyPrice}>{formatPrice(property.price)}</Text>
            <Text style={styles.period}>
              {property.listingType === LISTING_TYPES.RENT ? "/listing" : "total"}
            </Text>
          </View>
        </View>
        <View style={styles.specRow}>
          <Spec icon="bed-king-outline" label={`${property.bedrooms} Beds`} />
          <View style={styles.specDivider} />
          <Spec icon="door-open" label={`${property.rooms} Rooms`} />
          <View style={styles.specDivider} />
          <Spec icon="bathtub-outline" label={`${property.bathrooms} Baths`} />
        </View>
      </GlassCard>
    </Pressable>
  );
}
