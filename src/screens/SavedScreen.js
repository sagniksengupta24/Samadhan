import React from "react";
import { SafeAreaView, ScrollView, Text } from "react-native";

import { styles } from "../styles/appStyles";
import PropertyCard from "../components/PropertyCard";
import { EmptyState, LoadingState, TopBar } from "../components/shared";

export default function SavedScreen({ listings, isLoading, onOpenProperty, onToggleSaved, savingPropertyIds = new Set() }) {
  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView contentContainerStyle={styles.homeContent} showsVerticalScrollIndicator={false}>
        <TopBar />
        <Text style={styles.largeTitle}>Saved Estates</Text>
        {isLoading ? <LoadingState label="Loading saved listings..." /> : null}
        {!isLoading && listings.length === 0 ? (
          <EmptyState
            icon="heart-outline"
            title="No saved properties"
            message="Saved homes will appear here after properties are added to the live feed."
          />
        ) : null}
        {!isLoading
          ? listings.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                onPress={() => onOpenProperty(property)}
                onToggleSaved={() => onToggleSaved(property.id)}
                isSaving={savingPropertyIds.has(property.id)}
              />
            ))
          : null}
      </ScrollView>
    </SafeAreaView>
  );
}
