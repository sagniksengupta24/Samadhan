import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, ImageBackground, KeyboardAvoidingView, Platform, Pressable, SafeAreaView, ScrollView, Text, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";

import { colors } from "../constants/colors";
import { images } from "../constants/fallbackImages";
import { formTypeOptions } from "../constants/listingOptions";
import { emptyListingForm, formFromListing } from "../models/propertyListing";
import { styles } from "../styles/appStyles";
import { hasValidationErrors, sanitizePropertyListing, validatePropertyListing } from "../validation/propertyListingValidation";
import { FormField, IconButton, ImageSlot, SegmentedControl } from "../components/shared";

export default function ListPropertyScreen({ editingListing, onCancelEdit, onSubmit }) {
  const [values, setValues] = useState(() => formFromListing(editingListing));
  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [statusType, setStatusType] = useState("info");

  useEffect(() => {
    setValues(formFromListing(editingListing));
    setErrors({});
    setStatusMessage("");
    setStatusType("info");
  }, [editingListing]);

  const updateValue = (field, value) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setStatusMessage("");
    setStatusType("info");
  };

  const pickImage = async (slotIndex) => {
    if (isSaving) {
      return;
    }

    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("Permission needed", "Allow photo access to add listing images.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.82
    });

    if (result.canceled || !result.assets?.[0]?.uri) {
      return;
    }

    const nextImages = [...values.images];
    nextImages[slotIndex] = result.assets[0].uri;
    updateValue("images", nextImages.filter(Boolean).slice(0, 3));
  };

  const removeImage = (slotIndex) => {
    if (isSaving) {
      return;
    }

    const nextImages = values.images.filter((_, index) => index !== slotIndex);
    updateValue("images", nextImages);
  };

  const handleSubmit = async () => {
    if (isSaving) {
      return;
    }

    const nextErrors = validatePropertyListing(values);
    setErrors(nextErrors);
    setStatusMessage("");
    setStatusType("info");

    if (hasValidationErrors(nextErrors)) {
      return;
    }

    setIsSaving(true);
    try {
      await onSubmit(sanitizePropertyListing(values));
      if (!editingListing) {
        setValues({ ...emptyListingForm, images: [] });
      }
      setStatusMessage(editingListing ? "Listing updated." : "Listing created.");
      setStatusType("success");
    } catch (error) {
      setStatusMessage(error.message || "Unable to save listing.");
      setStatusType("error");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <ImageBackground source={{ uri: images.listBackground }} style={styles.listBackground}>
      <View style={styles.listScrim} />
      <SafeAreaView style={styles.screenTransparent}>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={styles.flex}>
          <ScrollView contentContainerStyle={styles.listContent} showsVerticalScrollIndicator={false}>
            <View style={styles.formTopBar}>
              <IconButton icon="arrow-back" onPress={onCancelEdit} />
              <Text style={styles.largeTitle}>{editingListing ? "Edit Property" : "List Property"}</Text>
              <View style={styles.spacer44} />
            </View>
            <Text style={styles.formLabel}>PROPERTY MEDIA</Text>
            <View style={styles.mediaGrid}>
              <ImageSlot
                large
                label="Add Cover"
                uri={values.images[0]}
                onPick={() => pickImage(0)}
                onRemove={() => removeImage(0)}
              />
              <View style={styles.mediaSideColumn}>
                <ImageSlot
                  uri={values.images[1]}
                  onPick={() => pickImage(1)}
                  onRemove={() => removeImage(1)}
                />
                <ImageSlot
                  uri={values.images[2]}
                  onPick={() => pickImage(2)}
                  onRemove={() => removeImage(2)}
                />
              </View>
            </View>
            <SegmentedControl
              value={values.listingType}
              options={formTypeOptions}
              onChange={(value) => updateValue("listingType", value)}
            />
            {errors.listingType ? <Text style={styles.errorText}>{errors.listingType}</Text> : null}
            <View style={styles.formStack}>
              <FormField
                icon="home-outline"
                label="Property Name"
                placeholder="e.g. Villa Serenity"
                value={values.name}
                error={errors.name}
                onChangeText={(value) => updateValue("name", value)}
              />
              <FormField
                icon="location-outline"
                label="Detailed Address"
                placeholder="Full property address..."
                value={values.address}
                error={errors.address}
                multiline
                onChangeText={(value) => updateValue("address", value)}
              />
              <View style={styles.twoColumn}>
                <FormField
                  icon="cash-outline"
                  label="Price"
                  placeholder="0.00"
                  keyboardType="numeric"
                  prefix="INR"
                  value={values.price}
                  error={errors.price}
                  onChangeText={(value) => updateValue("price", value)}
                />
                <FormField
                  icon="bed-outline"
                  label="Bedrooms"
                  placeholder="0"
                  keyboardType="numeric"
                  value={values.bedrooms}
                  error={errors.bedrooms}
                  onChangeText={(value) => updateValue("bedrooms", value)}
                />
              </View>
              <View style={styles.twoColumn}>
                <FormField
                  icon="keypad-outline"
                  label="Rooms"
                  placeholder="1"
                  keyboardType="numeric"
                  value={values.rooms}
                  error={errors.rooms}
                  onChangeText={(value) => updateValue("rooms", value)}
                />
                <FormField
                  icon="water-outline"
                  label="Bathrooms"
                  placeholder="1"
                  keyboardType="numeric"
                  value={values.bathrooms}
                  error={errors.bathrooms}
                  onChangeText={(value) => updateValue("bathrooms", value)}
                />
              </View>
              <FormField
                icon="document-text-outline"
                label="Property Details"
                placeholder="Describe the interiors, location, and amenities..."
                value={values.description}
                error={errors.description}
                multiline
                onChangeText={(value) => updateValue("description", value)}
              />
              <FormField
                icon="person-outline"
                label="Contact Name"
                placeholder="Owner or agent name"
                value={values.contactName}
                onChangeText={(value) => updateValue("contactName", value)}
              />
              <View style={styles.twoColumn}>
                <FormField
                  icon="call-outline"
                  label="Phone"
                  placeholder="Optional"
                  keyboardType="phone-pad"
                  value={values.contactPhone}
                  error={errors.contactPhone}
                  onChangeText={(value) => updateValue("contactPhone", value)}
                />
                <FormField
                  icon="mail-outline"
                  label="Email"
                  placeholder="Optional"
                  keyboardType="email-address"
                  value={values.contactEmail}
                  error={errors.contactEmail}
                  onChangeText={(value) => updateValue("contactEmail", value)}
                />
              </View>
            </View>
            {statusMessage ? (
              <Text style={[styles.statusText, statusType === "error" && styles.errorText]}>
                {statusMessage}
              </Text>
            ) : null}
            <Pressable
              disabled={isSaving}
              style={({ pressed }) => [
                styles.postButton,
                isSaving && styles.disabledAction,
                pressed && !isSaving && styles.pressed
              ]}
              onPress={handleSubmit}
            >
              {isSaving ? <ActivityIndicator color={colors.onSecondaryContainer} /> : null}
              <Text style={styles.postButtonText}>
                {isSaving ? "Saving..." : editingListing ? "Save Changes" : "Post Property"}
              </Text>
              {!isSaving ? (
                <Ionicons name="cloud-upload-outline" color={colors.onSecondaryContainer} size={20} />
              ) : null}
            </Pressable>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
  );
}
