import React from "react";
import { ActivityIndicator, ImageBackground, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";

import { colors } from "../constants/colors";
import { LISTING_TYPES, formatListingType, formatPrice, formatShortDate } from "../models/propertyListing";
import { styles } from "../styles/appStyles";
import { getPrimaryImage } from "../utils/images";
import { openContact } from "../utils/linking";
import { Feature, GlassCard, IconButton, Spec } from "../components/shared";

export default function PropertyDetailScreen({
  property,
  canManage,
  isDeleting = false,
  isSaving = false,
  onBack,
  onDelete,
  onEdit,
  onToggleSaved
}) {
  const canContactByPhone = Boolean(property.contactPhone);
  const canContactByEmail = Boolean(property.contactEmail);

  return (
    <View style={styles.detailScreen}>
      <ExpoStatusBar style="light" />
      <ScrollView contentContainerStyle={styles.detailScrollContent} showsVerticalScrollIndicator={false}>
        <ImageBackground source={{ uri: getPrimaryImage(property) }} style={styles.detailHero}>
          <LinearGradient
            colors={["rgba(0,0,0,0.18)", "transparent", "rgba(86,0,27,0.24)"]}
            style={StyleSheet.absoluteFill}
          />
          <SafeAreaView style={styles.detailSafe}>
            <View style={styles.detailTopBar}>
              <IconButton icon="arrow-back" onPress={onBack} />
              <Text style={styles.detailTopTitle}>Property Details</Text>
              <IconButton
                icon={property.saved ? "heart" : "heart-outline"}
                disabled={isSaving}
                onPress={onToggleSaved}
              />
            </View>
          </SafeAreaView>
          <GlassCard style={styles.detailHeroCard}>
            <View style={styles.propertyTitleRow}>
              <View style={styles.propertyTitleBlock}>
                <Text style={styles.propertyName}>{property.name}</Text>
                <View style={styles.locationRow}>
                  <Ionicons name="location-outline" color={colors.onSurfaceVariant} size={14} />
                  <Text style={styles.captionStrong}>{property.address}</Text>
                </View>
              </View>
              <View style={styles.priceBlock}>
                <Text style={styles.propertyPrice}>{formatPrice(property.price)}</Text>
                <Text style={styles.period}>{formatListingType(property.listingType)}</Text>
              </View>
            </View>
            <View style={styles.specRow}>
              <Spec icon="bed-king-outline" label={`${property.bedrooms} Beds`} />
              <Spec icon="door-open" label={`${property.rooms} Rooms`} />
              <Spec icon="bathtub-outline" label={`${property.bathrooms} Baths`} />
            </View>
          </GlassCard>
        </ImageBackground>
        <View style={styles.detailBody}>
          <View style={styles.copySection}>
            <Text style={styles.detailHeading}>Description</Text>
            <Text style={styles.bodyCopy}>{property.description}</Text>
          </View>
          <GlassCard style={styles.agentCard}>
            <View style={styles.agentIdentity}>
              <View style={styles.agentInitial}>
                <Ionicons name="person" color={colors.primary} size={28} />
              </View>
              <View>
                <Text style={styles.agentName}>{property.contactName || "Property owner"}</Text>
                <Text style={styles.period}>
                  {canContactByPhone || canContactByEmail ? "Contact available" : "No contact added"}
                </Text>
              </View>
            </View>
            <View style={styles.agentActions}>
              <IconButton
                icon="mail-outline"
                compact
                disabled={!canContactByEmail}
                onPress={() => openContact("email", property)}
              />
              <IconButton
                icon="call-outline"
                compact
                disabled={!canContactByPhone}
                onPress={() => openContact("phone", property)}
              />
            </View>
          </GlassCard>
          <View style={styles.featureGrid}>
            <Feature icon="home-city-outline" label={formatListingType(property.listingType)} />
            <Feature icon="calendar-clock" label={`Updated ${formatShortDate(property.updatedAt)}`} />
          </View>
          {canManage ? (
            <View style={styles.ownerActionRow}>
              <Pressable
                disabled={isDeleting}
                style={({ pressed }) => [styles.ownerEditButton, isDeleting && styles.disabledAction, pressed && !isDeleting && styles.pressed]}
                onPress={onEdit}
              >
                <Ionicons name="create-outline" color={colors.primary} size={18} />
                <Text style={styles.ownerEditText}>Edit</Text>
              </Pressable>
              <Pressable
                disabled={isDeleting}
                style={({ pressed }) => [styles.ownerDeleteButton, isDeleting && styles.disabledAction, pressed && !isDeleting && styles.pressed]}
                onPress={onDelete}
              >
                {isDeleting ? (
                  <ActivityIndicator color={colors.error} size="small" />
                ) : (
                  <Ionicons name="trash-outline" color={colors.error} size={18} />
                )}
                <Text style={styles.ownerDeleteText}>{isDeleting ? "Deleting..." : "Delete"}</Text>
              </Pressable>
            </View>
          ) : null}
        </View>
      </ScrollView>
      <View style={styles.actionDockWrap}>
        <GlassCard style={styles.actionDock}>
          <Pressable
            style={({ pressed }) => [
              styles.secondaryAction,
              !canContactByEmail && styles.disabledAction,
              pressed && canContactByEmail && styles.pressed
            ]}
            disabled={!canContactByEmail}
            onPress={() => openContact("email", property)}
          >
            <Ionicons name="chatbubble-outline" color={colors.primary} size={20} />
            <Text style={styles.secondaryActionText}>Message</Text>
          </Pressable>
          <Pressable
            style={({ pressed }) => [
              styles.primaryAction,
              !canContactByPhone && styles.disabledPrimaryAction,
              pressed && canContactByPhone && styles.pressed
            ]}
            disabled={!canContactByPhone}
            onPress={() => openContact("phone", property)}
          >
            <Ionicons name="call-outline" color={colors.white} size={20} />
            <Text style={styles.primaryActionText}>Call Owner</Text>
          </Pressable>
        </GlassCard>
      </View>
    </View>
  );
}
