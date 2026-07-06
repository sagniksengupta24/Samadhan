import { StyleSheet } from "react-native";
import { colors } from "../constants/colors";

export const font = {
  regular: "Montserrat_400Regular",
  medium: "Montserrat_500Medium",
  semibold: "Montserrat_600SemiBold",
  bold: "Montserrat_700Bold",
  extraBold: "Montserrat_800ExtraBold"
};

export const styles = StyleSheet.create({
  flex: {
    flex: 1
  },
  loadingCanvas: {
    flex: 1,
    backgroundColor: colors.background
  },
  appShell: {
    flex: 1,
    backgroundColor: colors.background
  },
  screen: {
    flex: 1,
    backgroundColor: colors.background
  },
  screenTransparent: {
    flex: 1
  },
  onboardingImage: {
    flex: 1,
    backgroundColor: colors.primary
  },
  onboardingSafe: {
    flex: 1,
    paddingHorizontal: 24
  },
  brandRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
    justifyContent: "center",
    paddingTop: 12
  },
  brandText: {
    color: colors.white,
    fontFamily: font.extraBold,
    fontSize: 24,
    letterSpacing: 0
  },
  onboardingContent: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 24,
    paddingBottom: 80
  },
  heroWords: {
    marginBottom: 42
  },
  exploreText: {
    color: colors.white,
    fontFamily: font.semibold,
    fontSize: 28,
    lineHeight: 36,
    opacity: 0.9
  },
  livingText: {
    color: colors.white,
    fontFamily: font.extraBold,
    fontSize: 52,
    lineHeight: 56
  },
  onboardingCopyCard: {
    backgroundColor: "rgba(255,255,255,0.16)",
    marginBottom: 44,
    padding: 24
  },
  onboardingCopy: {
    color: colors.white,
    fontFamily: font.regular,
    fontSize: 16,
    lineHeight: 24,
    opacity: 0.96
  },
  primaryPill: {
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: colors.secondaryContainer,
    borderRadius: 999,
    elevation: 10,
    flexDirection: "row",
    gap: 28,
    justifyContent: "space-between",
    minHeight: 58,
    minWidth: 220,
    paddingLeft: 24,
    paddingRight: 8,
    shadowColor: colors.primaryContainer,
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.18,
    shadowRadius: 26
  },
  primaryPillText: {
    color: colors.onSecondaryContainer,
    fontFamily: font.bold,
    fontSize: 14,
    lineHeight: 20
  },
  primaryPillIcon: {
    alignItems: "center",
    backgroundColor: colors.primary,
    borderRadius: 999,
    height: 42,
    justifyContent: "center",
    width: 42
  },
  tiltIcon: {
    transform: [{ rotate: "45deg" }]
  },
  homeContent: {
    alignSelf: "center",
    maxWidth: 760,
    paddingBottom: 122,
    paddingHorizontal: 24,
    paddingTop: 8,
    width: "100%"
  },
  authContent: {
    alignSelf: "center",
    maxWidth: 560,
    paddingBottom: 122,
    paddingHorizontal: 24,
    paddingTop: 8,
    width: "100%"
  },
  authCard: {
    gap: 16,
    padding: 22
  },
  authIcon: {
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: colors.primaryFixed,
    borderRadius: 999,
    height: 58,
    justifyContent: "center",
    width: 58
  },
  authRestoringRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
    justifyContent: "center"
  },
  topBar: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24
  },
  topLeft: {
    alignItems: "center",
    flexDirection: "row",
    gap: 12
  },
  iconButton: {
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.58)",
    borderColor: "rgba(255,255,255,0.68)",
    borderRadius: 999,
    borderWidth: 1,
    height: 48,
    justifyContent: "center",
    shadowColor: colors.primaryContainer,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 18,
    width: 48
  },
  iconButtonCompact: {
    alignItems: "center",
    backgroundColor: colors.white,
    borderColor: colors.outlineVariant,
    borderRadius: 999,
    borderWidth: 1,
    height: 40,
    justifyContent: "center",
    width: 40
  },
  disabledIcon: {
    opacity: 0.45
  },
  notificationDot: {
    backgroundColor: colors.primary,
    borderColor: colors.white,
    borderRadius: 99,
    borderWidth: 1,
    height: 8,
    position: "absolute",
    right: 12,
    top: 12,
    width: 8
  },
  locationRow: {
    alignItems: "center",
    flexDirection: "row",
    flexShrink: 1,
    gap: 4
  },
  captionStrong: {
    color: colors.onSurfaceVariant,
    flexShrink: 1,
    fontFamily: font.semibold,
    fontSize: 12,
    lineHeight: 16
  },
  segmented: {
    backgroundColor: "rgba(229,226,225,0.52)",
    borderRadius: 999,
    flexDirection: "row",
    gap: 4,
    marginBottom: 24,
    padding: 4
  },
  segmentActive: {
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: 999,
    flex: 1,
    justifyContent: "center",
    minHeight: 48,
    shadowColor: colors.primaryContainer,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.08,
    shadowRadius: 12
  },
  segmentInactive: {
    alignItems: "center",
    borderRadius: 999,
    flex: 1,
    justifyContent: "center",
    minHeight: 48
  },
  segmentActiveText: {
    color: colors.primary,
    fontFamily: font.semibold,
    fontSize: 14
  },
  segmentInactiveText: {
    color: colors.onSurfaceVariant,
    fontFamily: font.semibold,
    fontSize: 14
  },
  glass: {
    backgroundColor: "rgba(255,255,255,0.56)",
    borderColor: "rgba(255,255,255,0.64)",
    borderCurve: "continuous",
    borderRadius: 24,
    borderWidth: 1,
    overflow: "hidden"
  },
  searchPanel: {
    gap: 16,
    marginBottom: 14,
    padding: 20,
    shadowColor: colors.primaryContainer,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.12,
    shadowRadius: 28
  },
  searchInputWrap: {
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.62)",
    borderRadius: 20,
    flexDirection: "row",
    minHeight: 56,
    paddingHorizontal: 16
  },
  searchInput: {
    color: colors.onSurface,
    flex: 1,
    fontFamily: font.regular,
    fontSize: 16,
    minHeight: 52,
    paddingHorizontal: 12
  },
  dateGrid: {
    flexDirection: "row",
    gap: 12
  },
  softInput: {
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.55)",
    borderRadius: 18,
    flex: 1,
    flexDirection: "row",
    gap: 8,
    minHeight: 54,
    paddingHorizontal: 12
  },
  sortRail: {
    gap: 10,
    marginBottom: 22,
    paddingRight: 24
  },
  sortChip: {
    alignItems: "center",
    borderRadius: 999,
    justifyContent: "center",
    minHeight: 42,
    paddingHorizontal: 16
  },
  sortChipActive: {
    backgroundColor: colors.primary
  },
  sortChipInactive: {
    backgroundColor: "rgba(255,255,255,0.58)",
    borderColor: "rgba(255,255,255,0.64)",
    borderWidth: 1
  },
  sortChipText: {
    color: colors.onSurfaceVariant,
    fontFamily: font.semibold,
    fontSize: 12
  },
  sortChipActiveText: {
    color: colors.onPrimary,
    fontFamily: font.semibold,
    fontSize: 12
  },
  section: {
    marginBottom: 22
  },
  sectionHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 14
  },
  sectionTitle: {
    color: colors.primary,
    fontFamily: font.semibold,
    fontSize: 24,
    lineHeight: 32
  },
  sectionAction: {
    color: colors.onSurfaceVariant,
    fontFamily: font.semibold,
    fontSize: 12,
    lineHeight: 16
  },
  rail: {
    gap: 12,
    paddingRight: 24
  },
  chip: {
    alignItems: "center",
    borderRadius: 999,
    flexDirection: "row",
    gap: 8,
    minHeight: 46,
    paddingHorizontal: 20
  },
  chipActive: {
    backgroundColor: colors.primary,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.12,
    shadowRadius: 18
  },
  chipInactive: {
    backgroundColor: "rgba(255,255,255,0.58)",
    borderColor: "rgba(255,255,255,0.64)",
    borderWidth: 1
  },
  chipActiveText: {
    color: colors.onPrimary,
    fontFamily: font.semibold,
    fontSize: 14
  },
  chipInactiveText: {
    color: colors.onSurfaceVariant,
    fontFamily: font.semibold,
    fontSize: 14
  },
  propertyCard: {
    backgroundColor: colors.white,
    borderRadius: 36,
    height: 360,
    marginBottom: 24,
    overflow: "hidden",
    shadowColor: colors.primaryContainer,
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.14,
    shadowRadius: 26
  },
  propertyImage: {
    height: "100%",
    width: "100%"
  },
  typeBadge: {
    backgroundColor: colors.secondaryContainer,
    borderRadius: 999,
    left: 16,
    minHeight: 34,
    paddingHorizontal: 14,
    position: "absolute",
    top: 18,
    justifyContent: "center"
  },
  typeBadgeText: {
    color: colors.primary,
    fontFamily: font.semibold,
    fontSize: 12
  },
  favoriteButton: {
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.54)",
    borderColor: "rgba(255,255,255,0.68)",
    borderRadius: 999,
    borderWidth: 1,
    height: 48,
    justifyContent: "center",
    position: "absolute",
    right: 16,
    top: 16,
    width: 48
  },
  propertyOverlay: {
    bottom: 16,
    gap: 14,
    left: 16,
    padding: 18,
    position: "absolute",
    right: 16
  },
  propertyTitleRow: {
    alignItems: "flex-start",
    flexDirection: "row",
    gap: 12,
    justifyContent: "space-between"
  },
  propertyTitleBlock: {
    flex: 1
  },
  propertyName: {
    color: colors.primary,
    fontFamily: font.semibold,
    fontSize: 22,
    lineHeight: 28
  },
  priceBlock: {
    alignItems: "flex-end"
  },
  propertyPrice: {
    color: colors.primary,
    fontFamily: font.semibold,
    fontSize: 20,
    lineHeight: 26
  },
  period: {
    color: "rgba(85,66,68,0.72)",
    fontFamily: font.semibold,
    fontSize: 12,
    lineHeight: 16
  },
  specRow: {
    alignItems: "center",
    borderTopColor: "rgba(86,0,27,0.1)",
    borderTopWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 14
  },
  spec: {
    alignItems: "center",
    flexDirection: "row",
    gap: 6
  },
  specText: {
    color: colors.onSurfaceVariant,
    fontFamily: font.semibold,
    fontSize: 12,
    lineHeight: 16
  },
  specDivider: {
    backgroundColor: "rgba(86,0,27,0.1)",
    height: 24,
    width: 1
  },
  detailScreen: {
    backgroundColor: colors.background,
    flex: 1
  },
  detailScrollContent: {
    paddingBottom: 130
  },
  detailHero: {
    height: 486
  },
  detailSafe: {
    flex: 1
  },
  detailTopBar: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingTop: 6
  },
  detailTopTitle: {
    color: colors.white,
    fontFamily: font.semibold,
    fontSize: 14,
    textShadowColor: "rgba(0,0,0,0.2)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4
  },
  detailHeroCard: {
    bottom: 24,
    left: 24,
    padding: 20,
    position: "absolute",
    right: 24
  },
  detailBody: {
    alignSelf: "center",
    gap: 24,
    maxWidth: 760,
    padding: 24,
    width: "100%"
  },
  copySection: {
    gap: 8
  },
  detailHeading: {
    color: colors.primary,
    fontFamily: font.semibold,
    fontSize: 24,
    lineHeight: 32
  },
  bodyCopy: {
    color: colors.onSurfaceVariant,
    fontFamily: font.regular,
    fontSize: 16,
    lineHeight: 25
  },
  bodyCopySmall: {
    color: colors.onSurfaceVariant,
    fontFamily: font.regular,
    fontSize: 13,
    lineHeight: 20
  },
  agentCard: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 14
  },
  agentIdentity: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    gap: 14
  },
  agentInitial: {
    alignItems: "center",
    backgroundColor: colors.primaryFixed,
    borderColor: "rgba(86,0,27,0.1)",
    borderRadius: 999,
    borderWidth: 2,
    height: 56,
    justifyContent: "center",
    width: 56
  },
  agentName: {
    color: colors.primary,
    fontFamily: font.semibold,
    fontSize: 14,
    lineHeight: 20
  },
  agentActions: {
    flexDirection: "row",
    gap: 8
  },
  featureGrid: {
    flexDirection: "row",
    gap: 14
  },
  feature: {
    alignItems: "center",
    backgroundColor: colors.surfaceContainer,
    borderRadius: 18,
    flex: 1,
    flexDirection: "row",
    gap: 10,
    minHeight: 64,
    padding: 12
  },
  featureIcon: {
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: 14,
    height: 42,
    justifyContent: "center",
    width: 42
  },
  featureText: {
    color: colors.onSurface,
    flex: 1,
    fontFamily: font.semibold,
    fontSize: 13,
    lineHeight: 18
  },
  ownerActionRow: {
    flexDirection: "row",
    gap: 12
  },
  ownerEditButton: {
    alignItems: "center",
    backgroundColor: colors.secondaryContainer,
    borderRadius: 18,
    flex: 1,
    flexDirection: "row",
    gap: 8,
    justifyContent: "center",
    minHeight: 48
  },
  ownerDeleteButton: {
    alignItems: "center",
    backgroundColor: colors.white,
    borderColor: colors.outlineVariant,
    borderRadius: 18,
    borderWidth: 1,
    flex: 1,
    flexDirection: "row",
    gap: 8,
    justifyContent: "center",
    minHeight: 48
  },
  ownerEditText: {
    color: colors.primary,
    fontFamily: font.semibold,
    fontSize: 13
  },
  ownerDeleteText: {
    color: colors.error,
    fontFamily: font.semibold,
    fontSize: 13
  },
  actionDockWrap: {
    bottom: 0,
    left: 0,
    paddingBottom: 28,
    paddingHorizontal: 24,
    position: "absolute",
    right: 0
  },
  actionDock: {
    borderRadius: 999,
    flexDirection: "row",
    gap: 8,
    padding: 8
  },
  secondaryAction: {
    alignItems: "center",
    backgroundColor: colors.secondaryContainer,
    borderRadius: 999,
    flex: 1,
    flexDirection: "row",
    gap: 8,
    justifyContent: "center",
    minHeight: 54
  },
  primaryAction: {
    alignItems: "center",
    backgroundColor: colors.primary,
    borderRadius: 999,
    flex: 1,
    flexDirection: "row",
    gap: 8,
    justifyContent: "center",
    minHeight: 54
  },
  disabledAction: {
    opacity: 0.5
  },
  disabledPrimaryAction: {
    backgroundColor: colors.outline,
    opacity: 0.5
  },
  secondaryActionText: {
    color: colors.primary,
    fontFamily: font.semibold,
    fontSize: 13
  },
  primaryActionText: {
    color: colors.white,
    fontFamily: font.semibold,
    fontSize: 13
  },
  largeTitle: {
    color: colors.primary,
    fontFamily: font.bold,
    fontSize: 28,
    lineHeight: 36,
    marginBottom: 20
  },
  listBackground: {
    flex: 1
  },
  listScrim: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(252,249,248,0.72)"
  },
  listContent: {
    alignSelf: "center",
    maxWidth: 760,
    paddingBottom: 132,
    paddingHorizontal: 24,
    paddingTop: 8,
    width: "100%"
  },
  formTopBar: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 18
  },
  spacer44: {
    width: 48
  },
  formLabel: {
    color: colors.onSurfaceVariant,
    fontFamily: font.semibold,
    fontSize: 12,
    lineHeight: 16,
    marginBottom: 12
  },
  mediaGrid: {
    flexDirection: "row",
    gap: 8,
    height: 256,
    marginBottom: 24
  },
  coverUpload: {
    flex: 1,
    height: 256
  },
  mediaSideColumn: {
    flex: 1,
    gap: 8
  },
  smallUpload: {
    height: 124
  },
  uploadGlass: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center"
  },
  uploadedImage: {
    height: "100%",
    width: "100%"
  },
  removeImageButton: {
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.8)",
    borderRadius: 999,
    height: 34,
    justifyContent: "center",
    position: "absolute",
    right: 8,
    top: 8,
    width: 34
  },
  uploadText: {
    color: colors.primary,
    fontFamily: font.semibold,
    fontSize: 14,
    marginTop: 8
  },
  formStack: {
    gap: 16
  },
  fieldWrap: {
    flex: 1,
    gap: 8
  },
  fieldLabel: {
    color: colors.onSurfaceVariant,
    fontFamily: font.medium,
    fontSize: 12,
    lineHeight: 16,
    marginLeft: 8
  },
  inputGlass: {
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
    minHeight: 54,
    paddingHorizontal: 14
  },
  inputGlassMultiline: {
    alignItems: "flex-start",
    minHeight: 92,
    paddingTop: 14
  },
  inputError: {
    borderColor: "rgba(186,26,26,0.42)"
  },
  textInput: {
    color: colors.onSurface,
    flex: 1,
    fontFamily: font.regular,
    fontSize: 16,
    minHeight: 48
  },
  textArea: {
    minHeight: 72,
    textAlignVertical: "top"
  },
  prefix: {
    color: "rgba(85,66,68,0.72)",
    fontFamily: font.regular,
    fontSize: 16
  },
  twoColumn: {
    flexDirection: "row",
    gap: 14
  },
  postButton: {
    alignItems: "center",
    backgroundColor: colors.secondaryContainer,
    borderRadius: 18,
    flexDirection: "row",
    gap: 8,
    justifyContent: "center",
    marginTop: 22,
    minHeight: 56,
    shadowColor: colors.secondaryContainer,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.32,
    shadowRadius: 24
  },
  postButtonText: {
    color: colors.onSecondaryContainer,
    fontFamily: font.semibold,
    fontSize: 14
  },
  statusText: {
    color: colors.tertiaryContainer,
    fontFamily: font.semibold,
    fontSize: 13,
    lineHeight: 18,
    marginTop: 16,
    textAlign: "center"
  },
  errorText: {
    color: colors.error,
    fontFamily: font.medium,
    fontSize: 12,
    lineHeight: 16
  },
  fieldErrorText: {
    marginBottom: 18,
    marginLeft: 8
  },
  ownerHeader: {
    alignItems: "flex-start",
    flexDirection: "row",
    gap: 12,
    justifyContent: "space-between",
    marginBottom: 20
  },
  ownerHeaderActions: {
    flexDirection: "row",
    gap: 10
  },
  addSmallButton: {
    alignItems: "center",
    backgroundColor: colors.primary,
    borderRadius: 999,
    height: 48,
    justifyContent: "center",
    width: 48
  },
  signOutSmallButton: {
    alignItems: "center",
    backgroundColor: colors.secondaryContainer,
    borderRadius: 999,
    height: 48,
    justifyContent: "center",
    width: 48
  },
  ownerListingCard: {
    gap: 14,
    marginBottom: 14,
    padding: 14
  },
  ownerListingMain: {
    alignItems: "center",
    flexDirection: "row",
    gap: 14
  },
  ownerThumb: {
    borderRadius: 18,
    height: 76,
    width: 76
  },
  ownerListingText: {
    flex: 1
  },
  ownerListingName: {
    color: colors.primary,
    fontFamily: font.semibold,
    fontSize: 17,
    lineHeight: 23
  },
  ownerListingMeta: {
    color: colors.onSurfaceVariant,
    fontFamily: font.semibold,
    fontSize: 12,
    lineHeight: 18
  },
  ownerListingDate: {
    color: "rgba(85,66,68,0.72)",
    fontFamily: font.medium,
    fontSize: 11,
    lineHeight: 16
  },
  ownerCardActions: {
    borderTopColor: "rgba(86,0,27,0.1)",
    borderTopWidth: 1,
    flexDirection: "row",
    gap: 12,
    paddingTop: 12
  },
  ownerIconAction: {
    alignItems: "center",
    backgroundColor: colors.white,
    borderColor: colors.outlineVariant,
    borderRadius: 16,
    borderWidth: 1,
    flex: 1,
    justifyContent: "center",
    minHeight: 44
  },
  stateCard: {
    alignItems: "center",
    gap: 10,
    marginBottom: 24,
    padding: 24
  },
  stateTitle: {
    color: colors.primary,
    fontFamily: font.semibold,
    fontSize: 18,
    lineHeight: 24,
    textAlign: "center"
  },
  stateText: {
    color: colors.onSurfaceVariant,
    fontFamily: font.regular,
    fontSize: 14,
    lineHeight: 21,
    textAlign: "center"
  },
  retryButton: {
    alignItems: "center",
    backgroundColor: colors.secondaryContainer,
    borderRadius: 999,
    justifyContent: "center",
    marginTop: 4,
    minHeight: 44,
    paddingHorizontal: 20
  },
  retryButtonText: {
    color: colors.primary,
    fontFamily: font.semibold,
    fontSize: 13
  },
  bottomNavWrap: {
    bottom: 0,
    left: 0,
    paddingBottom: 24,
    paddingHorizontal: 20,
    position: "absolute",
    right: 0
  },
  bottomNav: {
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "rgba(255,255,255,0.76)",
    borderColor: "rgba(255,255,255,0.58)",
    borderRadius: 28,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    maxWidth: 720,
    minHeight: 74,
    overflow: "hidden",
    paddingHorizontal: 8,
    shadowColor: colors.primaryContainer,
    shadowOffset: { width: 0, height: -6 },
    shadowOpacity: 0.08,
    shadowRadius: 18,
    width: "100%"
  },
  navItem: {
    alignItems: "center",
    borderRadius: 999,
    flex: 1,
    gap: 3,
    justifyContent: "center",
    minHeight: 56
  },
  navItemActive: {
    backgroundColor: colors.primary
  },
  navLabel: {
    color: "rgba(85,66,68,0.66)",
    fontFamily: font.semibold,
    fontSize: 10,
    lineHeight: 12
  },
  navLabelActive: {
    color: colors.onPrimary
  },
  pressed: {
    opacity: 0.82,
    transform: [{ scale: 0.97 }]
  },
  cardPressed: {
    opacity: 0.94,
    transform: [{ scale: 0.99 }]
  },
  navPressed: {
    opacity: 0.76
  }
});
