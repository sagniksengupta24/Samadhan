import React from "react";
import { SafeAreaView, ScrollView } from "react-native";

import { typeFilterOptions } from "../constants/listingOptions";
import { styles } from "../styles/appStyles";
import PropertyCard from "../components/PropertyCard";
import { CategoryRail, EmptyState, ErrorState, LoadingState, SearchPanel, SectionHeader, SegmentedControl, SortRail, TopBar } from "../components/shared";

export default function HomeScreen({
  listings,
  totalListings,
  isLoading,
  error,
  searchQuery,
  typeFilter,
  priceSort,
  onSearchChange,
  onTypeFilterChange,
  onPriceSortChange,
  onOpenProperty,
  onRetry,
  onToggleSaved,
  savingPropertyIds = new Set()
}) {
  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView contentContainerStyle={styles.homeContent} showsVerticalScrollIndicator={false}>
        <TopBar />
        <SegmentedControl
          value={typeFilter}
          options={typeFilterOptions}
          onChange={onTypeFilterChange}
        />
        <SearchPanel value={searchQuery} onChangeText={onSearchChange} />
        <SortRail value={priceSort} onChange={onPriceSortChange} />
        <CategoryRail />
        <SectionHeader
          title={totalListings === 0 ? "Listings" : "Popular Now"}
          action={`${listings.length} shown`}
        />
        {isLoading ? <LoadingState label="Loading listings..." /> : null}
        {!isLoading && error ? <ErrorState message={error} onRetry={onRetry} /> : null}
        {!isLoading && !error && listings.length === 0 ? (
          <EmptyState
            icon="home-outline"
            title={totalListings === 0 ? "No properties listed yet" : "No matches found"}
            message={
              totalListings === 0
                ? "Your live property feed is ready. Add the first rent or sale listing from the List tab."
                : "Try a different search, listing type, or price sort."
            }
          />
        ) : null}
        {!isLoading && !error
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
