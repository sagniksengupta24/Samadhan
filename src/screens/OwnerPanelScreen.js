import React from "react";
import { Pressable, SafeAreaView, ScrollView, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { colors } from "../constants/colors";
import { styles } from "../styles/appStyles";
import OwnerListingCard from "../components/OwnerListingCard";
import { EmptyState, LoadingState, TopBar } from "../components/shared";

export default function OwnerPanelScreen({
  deletingPropertyIds = new Set(),
  listings,
  isLoading,
  user,
  onAdd,
  onDelete,
  onEdit,
  onOpenProperty,
  onSignOut
}) {
  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView contentContainerStyle={styles.homeContent} showsVerticalScrollIndicator={false}>
        <TopBar />
        <View style={styles.ownerHeader}>
          <View>
            <Text style={styles.largeTitle}>My Listings</Text>
            <Text style={styles.bodyCopySmall}>{user?.email || "Manage your rent and sale properties."}</Text>
          </View>
          <View style={styles.ownerHeaderActions}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Sign out"
              style={({ pressed }) => [styles.signOutSmallButton, pressed && styles.pressed]}
              onPress={onSignOut}
            >
              <Ionicons name="log-out-outline" color={colors.primary} size={21} />
            </Pressable>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Add property"
              style={({ pressed }) => [styles.addSmallButton, pressed && styles.pressed]}
              onPress={onAdd}
            >
              <Ionicons name="add" color={colors.onPrimary} size={22} />
            </Pressable>
          </View>
        </View>
        {isLoading ? <LoadingState label="Loading owner listings..." /> : null}
        {!isLoading && listings.length === 0 ? (
          <EmptyState
            icon="add-circle-outline"
            title="No listings yet"
            message="Add your first property listing to make it visible in the home feed."
            actionLabel="Add Property"
            onAction={onAdd}
          />
        ) : null}
        {!isLoading
          ? listings.map((listing) => (
              <OwnerListingCard
                key={listing.id}
                isDeleting={deletingPropertyIds.has(listing.id)}
                listing={listing}
                onDelete={() => onDelete(listing)}
                onEdit={() => onEdit(listing)}
                onOpen={() => onOpenProperty(listing)}
              />
            ))
          : null}
      </ScrollView>
    </SafeAreaView>
  );
}
