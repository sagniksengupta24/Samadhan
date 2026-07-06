import React from "react";
import { ActivityIndicator, Image, Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { colors } from "../constants/colors";
import { formatListingType, formatPrice, formatShortDate } from "../models/propertyListing";
import { styles } from "../styles/appStyles";
import { getPrimaryImage } from "../utils/images";
import { GlassCard } from "./shared";

export default function OwnerListingCard({ listing, isDeleting = false, onDelete, onEdit, onOpen }) {
  return (
    <GlassCard style={styles.ownerListingCard}>
      <Pressable disabled={isDeleting} onPress={onOpen} style={styles.ownerListingMain}>
        <Image source={{ uri: getPrimaryImage(listing) }} style={styles.ownerThumb} />
        <View style={styles.ownerListingText}>
          <Text style={styles.ownerListingName}>{listing.name}</Text>
          <Text style={styles.ownerListingMeta} numberOfLines={1}>
            {formatListingType(listing.listingType)} - {formatPrice(listing.price)}
          </Text>
          <Text style={styles.ownerListingDate}>
            Updated {formatShortDate(listing.updatedAt)}
          </Text>
        </View>
      </Pressable>
      <View style={styles.ownerCardActions}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Edit ${listing.name}`}
          disabled={isDeleting}
          style={({ pressed }) => [styles.ownerIconAction, isDeleting && styles.disabledAction, pressed && !isDeleting && styles.pressed]}
          onPress={onEdit}
        >
          <Ionicons name="create-outline" color={colors.primary} size={20} />
        </Pressable>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Delete ${listing.name}`}
          disabled={isDeleting}
          style={({ pressed }) => [styles.ownerIconAction, isDeleting && styles.disabledAction, pressed && !isDeleting && styles.pressed]}
          onPress={onDelete}
        >
          {isDeleting ? (
            <ActivityIndicator color={colors.error} size="small" />
          ) : (
            <Ionicons name="trash-outline" color={colors.error} size={20} />
          )}
        </Pressable>
      </View>
    </GlassCard>
  );
}
