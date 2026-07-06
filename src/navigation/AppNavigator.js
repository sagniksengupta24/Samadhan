import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Alert, Platform, View } from "react-native";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";

import BottomNav from "../components/BottomNav";
import { useAuthSession } from "../context/AuthSessionContext";
import AuthScreen from "../screens/AuthScreen";
import HomeScreen from "../screens/HomeScreen";
import ListPropertyScreen from "../screens/ListPropertyScreen";
import OnboardingScreen from "../screens/OnboardingScreen";
import OwnerPanelScreen from "../screens/OwnerPanelScreen";
import PropertyDetailScreen from "../screens/PropertyDetailScreen";
import SavedScreen from "../screens/SavedScreen";
import {
  createPropertyListing,
  deletePropertyListing,
  listPropertyListings,
  toggleSavedPropertyListing,
  updatePropertyListing
} from "../services/propertyListingRepository";
import { styles } from "../styles/appStyles";

export default function AppNavigator() {
  const { authError, authLoading, currentUser, signOutUser } = useAuthSession();
  const [hasStarted, setHasStarted] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const [listings, setListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [selectedListingId, setSelectedListingId] = useState(null);
  const [editingListing, setEditingListing] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [priceSort, setPriceSort] = useState("newest");
  const [savingPropertyIds, setSavingPropertyIds] = useState(() => new Set());
  const [deletingPropertyIds, setDeletingPropertyIds] = useState(() => new Set());
  const savingPropertyIdsRef = useRef(new Set());
  const deletingPropertyIdsRef = useRef(new Set());

  const addPendingId = (setter, ref, id) => {
    ref.current.add(id);
    setter((current) => new Set(current).add(id));
  };

  const removePendingId = (setter, ref, id) => {
    ref.current.delete(id);
    setter((current) => {
      const next = new Set(current);
      next.delete(id);
      return next;
    });
  };

  const loadListings = useCallback(async () => {
    setIsLoading(true);
    setLoadError("");
    try {
      const storedListings = await listPropertyListings();
      setListings(storedListings);
    } catch (error) {
      setLoadError(error.message || "Unable to load property listings.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadListings();
  }, [currentUser?.id, loadListings]);

  const filteredListings = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    const nextListings = listings.filter((listing) => {
      const matchesType = typeFilter === "all" || listing.listingType === typeFilter;
      const searchableText = `${listing.name} ${listing.address}`.toLowerCase();
      return matchesType && (!query || searchableText.includes(query));
    });

    return nextListings.sort((a, b) => {
      if (priceSort === "priceAsc") {
        return Number(a.price) - Number(b.price);
      }
      if (priceSort === "priceDesc") {
        return Number(b.price) - Number(a.price);
      }
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
  }, [listings, priceSort, searchQuery, typeFilter]);

  const ownerListings = useMemo(() => {
    if (!currentUser) {
      return [];
    }

    return listings.filter((listing) => listing.ownerId === currentUser.id);
  }, [currentUser, listings]);

  const savedListings = useMemo(
    () => listings.filter((listing) => listing.saved),
    [listings]
  );

  const selectedProperty = useMemo(
    () => listings.find((listing) => listing.id === selectedListingId),
    [listings, selectedListingId]
  );
  const canManageSelectedProperty = Boolean(
    currentUser && selectedProperty?.ownerId === currentUser.id
  );

  const handleChangeTab = (nextTab) => {
    setSelectedListingId(null);
    if (nextTab === "list") {
      setEditingListing(null);
    }
    setActiveTab(nextTab);
  };

  const handleCreateListing = async (input) => {
    if (!currentUser) {
      throw new Error("Please sign in to create a listing.");
    }

    const createdListing = await createPropertyListing(input);
    setListings((current) => [createdListing, ...current]);
    return createdListing;
  };

  const handleUpdateListing = async (input) => {
    if (!editingListing) {
      throw new Error("No listing selected for editing.");
    }

    if (!currentUser || editingListing.ownerId !== currentUser.id) {
      throw new Error("You can only edit listings you own.");
    }

    const updatedListing = await updatePropertyListing(editingListing.id, input);
    setListings((current) =>
      current.map((listing) => (listing.id === updatedListing.id ? updatedListing : listing))
    );
    setEditingListing(null);
    setActiveTab("profile");
    return updatedListing;
  };

  const handleToggleSaved = async (id) => {
    if (savingPropertyIdsRef.current.has(id)) {
      return;
    }

    if (!currentUser) {
      Alert.alert("Sign in required", "Please sign in to save properties.");
      setSelectedListingId(null);
      setActiveTab("saved");
      return;
    }

    addPendingId(setSavingPropertyIds, savingPropertyIdsRef, id);
    try {
      const updatedListing = await toggleSavedPropertyListing(id);
      setListings((current) =>
        current.map((listing) => (listing.id === updatedListing.id ? updatedListing : listing))
      );
    } catch (error) {
      Alert.alert("Save failed", error.message || "Unable to update this listing.");
    } finally {
      removePendingId(setSavingPropertyIds, savingPropertyIdsRef, id);
    }
  };

  const deleteListing = async (listing) => {
    if (deletingPropertyIdsRef.current.has(listing.id)) {
      return;
    }

    if (!currentUser || listing.ownerId !== currentUser.id) {
      Alert.alert("Owner access required", "You can only delete listings you own.");
      return;
    }

    addPendingId(setDeletingPropertyIds, deletingPropertyIdsRef, listing.id);
    try {
      const nextListings = await deletePropertyListing(listing.id);
      setListings(nextListings);
      if (selectedListingId === listing.id) {
        setSelectedListingId(null);
      }
      if (editingListing?.id === listing.id) {
        setEditingListing(null);
        setActiveTab("profile");
      }
    } catch (error) {
      Alert.alert("Delete failed", error.message || "Unable to delete this listing.");
    } finally {
      removePendingId(setDeletingPropertyIds, deletingPropertyIdsRef, listing.id);
    }
  };

  const requestDeleteListing = (listing) => {
    if (deletingPropertyIdsRef.current.has(listing.id)) {
      return;
    }

    if (!currentUser || listing.ownerId !== currentUser.id) {
      Alert.alert("Owner access required", "You can only delete listings you own.");
      return;
    }

    if (Platform.OS === "web" && typeof window !== "undefined") {
      if (window.confirm(`Delete ${listing.name}? This cannot be undone.`)) {
        deleteListing(listing);
      }
      return;
    }

    Alert.alert("Delete listing?", `Delete ${listing.name}? This cannot be undone.`, [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", style: "destructive", onPress: () => deleteListing(listing) }
    ]);
  };

  const startEditing = (listing) => {
    if (!currentUser || listing.ownerId !== currentUser.id) {
      Alert.alert("Owner access required", "You can only edit listings you own.");
      return;
    }

    setSelectedListingId(null);
    setEditingListing(listing);
    setActiveTab("list");
  };

  const handleAuthSuccess = async () => {
    await loadListings();
  };

  const handleSignOut = async () => {
    try {
      await signOutUser();
      setSelectedListingId(null);
      setEditingListing(null);
      setActiveTab("home");
      await loadListings();
    } catch (error) {
      Alert.alert("Sign out failed", error.message || "Unable to sign out.");
    }
  };

  if (!hasStarted) {
    return <OnboardingScreen onStart={() => setHasStarted(true)} />;
  }

  if (selectedProperty) {
    return (
      <PropertyDetailScreen
        property={selectedProperty}
        canManage={canManageSelectedProperty}
        isDeleting={deletingPropertyIds.has(selectedProperty.id)}
        isSaving={savingPropertyIds.has(selectedProperty.id)}
        onBack={() => setSelectedListingId(null)}
        onDelete={() => requestDeleteListing(selectedProperty)}
        onEdit={() => startEditing(selectedProperty)}
        onToggleSaved={() => handleToggleSaved(selectedProperty.id)}
      />
    );
  }

  return (
    <View style={styles.appShell}>
      <ExpoStatusBar style="dark" />
      {activeTab === "home" || activeTab === "search" ? (
        <HomeScreen
          listings={filteredListings}
          totalListings={listings.length}
          isLoading={isLoading}
          error={loadError}
          searchQuery={searchQuery}
          typeFilter={typeFilter}
          priceSort={priceSort}
          onSearchChange={setSearchQuery}
          onTypeFilterChange={setTypeFilter}
          onPriceSortChange={setPriceSort}
          onOpenProperty={(listing) => setSelectedListingId(listing.id)}
          onToggleSaved={handleToggleSaved}
          savingPropertyIds={savingPropertyIds}
          onRetry={loadListings}
        />
      ) : null}
      {activeTab === "saved" ? (
        currentUser ? (
          <SavedScreen
            listings={savedListings}
            isLoading={isLoading}
            onOpenProperty={(listing) => setSelectedListingId(listing.id)}
            onToggleSaved={handleToggleSaved}
            savingPropertyIds={savingPropertyIds}
          />
        ) : (
          <AuthScreen
            title="Sign in to save homes"
            message="Saved properties are connected to your account so they stay private and sync across devices."
            authError={authError}
            isRestoring={authLoading}
            onAuthenticated={handleAuthSuccess}
          />
        )
      ) : null}
      {activeTab === "list" ? (
        currentUser ? (
          <ListPropertyScreen
            editingListing={editingListing}
            onCancelEdit={() => {
              setEditingListing(null);
              setActiveTab("profile");
            }}
            onSubmit={editingListing ? handleUpdateListing : handleCreateListing}
          />
        ) : (
          <AuthScreen
            title="Sign in to list property"
            message="Only signed-in owners can post, edit, and manage property listings."
            authError={authError}
            isRestoring={authLoading}
            onAuthenticated={handleAuthSuccess}
          />
        )
      ) : null}
      {activeTab === "profile" ? (
        currentUser ? (
          <OwnerPanelScreen
            listings={ownerListings}
            isLoading={isLoading}
            user={currentUser}
            deletingPropertyIds={deletingPropertyIds}
            onSignOut={handleSignOut}
            onAdd={() => {
              setEditingListing(null);
              setActiveTab("list");
            }}
            onDelete={requestDeleteListing}
            onEdit={startEditing}
            onOpenProperty={(listing) => setSelectedListingId(listing.id)}
          />
        ) : (
          <AuthScreen
            title="Sign in to manage"
            message="Your listings, saved homes, and owner tools are protected by your account."
            authError={authError}
            isRestoring={authLoading}
            onAuthenticated={handleAuthSuccess}
          />
        )
      ) : null}
      <BottomNav activeTab={activeTab} onChange={handleChangeTab} />
    </View>
  );
}
