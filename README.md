# Samadhan

Samadhan is an Expo React Native property-listing MVP backed by Supabase. It lets visitors browse a live public property feed, while signed-in users can create, edit, delete, and save listings with owner-only backend protection.

## Tech Stack

- Expo SDK 52
- React Native and React Native Web
- Supabase Auth, Postgres, Row Level Security, and Storage
- AsyncStorage for persisted Supabase sessions
- Expo Image Picker for listing images
- Montserrat fonts and Expo vector icons

## Core Features

- Public home feed for rent and sale listings
- Intentional blank state when no properties exist
- Email/password authentication through Supabase
- Protected Saved, List Property, and My Listings tabs
- Owner-only listing create, edit, and delete flows
- User-specific save and unsave behavior
- Image upload support through Supabase Storage
- Responsive web preview for mobile, tablet, and desktop widths

## Screens

- Onboarding
- Home / Browse Listings
- Saved Properties
- List Property / Create Property
- My Listings / Profile
- Property Detail
- Edit Property
- Sign In / Sign Up

## Supabase Backend Summary

The app expects the schema in `supabase/schema.sql`.

- `public.profiles`: user profile rows linked to `auth.users`
- `public.properties`: public property listings owned by authenticated users
- `public.saved_properties`: per-user saved-listing join table
- `property-images`: public Supabase Storage bucket for listing images

Images are stored in the `property-images` bucket and referenced from `properties.images`. Current upload paths follow:

```text
{user_id}/{property_id}/{filename}
```

## Required Environment Variables

Create `mobile/.env.local` from `.env.example`.

```bash
cp .env.example .env.local
```

Required:

```text
EXPO_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
EXPO_PUBLIC_SUPABASE_KEY=your-supabase-publishable-or-anon-public-key
```

Optional fallback supported by the app:

```text
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-public-key
```

Never put a Supabase service-role key in any Expo public environment variable.

## Run Locally

```bash
npm install
npx expo start
```

Useful targets:

```bash
npx expo start --web
npx expo start --android
npx expo start --ios
```

If Metro or Expo cache looks stale:

```bash
npx expo start --clear
```

## Demo Flow

1. Open the app and tap `Get Started`.
2. Confirm Home shows the blank live-feed state when the backend has no listings.
3. Tap Saved, List, or Mine while signed out and confirm the app shows the correct sign-in screen.
4. Sign in with a confirmed Supabase test user.
5. Open List Property and verify the create form loads.
6. Optionally create a temporary listing for demo, then delete it afterward to return the backend to blank.
7. Sign out from My Listings.

## Real-Device Readiness Checklist

See `REAL_DEVICE_CHECKLIST.md` for the short Expo Go / Android smoke checklist.

## Intentionally Not Included

This MVP intentionally does not include:

- Payments
- Maps
- Chat
- AI or recommendations
- Admin dashboard
- Analytics
- Permanent dummy or seed data

## Current MVP Status

Samadhan has passed backend, auth, RLS, storage, blank-state, frontend web, responsive, and Expo export verification. The expected production-demo state can remain blank:

- `properties`: 0
- `saved_properties`: 0
- `profiles`: 0 unless profile creation is intentionally enabled
- `property# 🏡 Samadhan

**Samadhan** is a secure property listing mobile app built with **Expo React Native** and **Supabase**.
It allows users to browse property listings, create and manage their own listings, save properties, and upload property images — all protected with Supabase Auth, Row Level Security, and Storage policies.

The app is intentionally focused on a clean MVP: no unnecessary bloat, no fake seed data, and no overbuilt features.

---

## 🚀 MVP Status

```text
Backend/Auth/RLS Verification: PASSED
Storage Verification: PASSED
Frontend Web QA: PASSED
Responsive QA: PASSED
Expo Web Export: PASSED
Expo Android Export: PASSED
MVP Demo Readiness: YES
```

Final verified backend state after cleanup:

```text
properties: 0
saved_properties: 0
profiles: 0
property-images: empty
```

No dummy data remains in the live Supabase project.

---

## ✨ Core Features

| Feature                       | Status |
| ----------------------------- | ------ |
| Email/password authentication | ✅ Done |
| Session restore               | ✅ Done |
| Public property browsing      | ✅ Done |
| Empty-state handling          | ✅ Done |
| Create property listing       | ✅ Done |
| Edit own listing              | ✅ Done |
| Delete own listing            | ✅ Done |
| Owner-only listing actions    | ✅ Done |
| Save/unsave listings          | ✅ Done |
| User-specific saved listings  | ✅ Done |
| Supabase Storage image upload | ✅ Done |
| Public property image URLs    | ✅ Done |
| Row Level Security protection | ✅ Done |
| Responsive web preview        | ✅ Done |
| Android export check          | ✅ Done |

---

## 🧭 App Screens

Samadhan currently includes:

* Onboarding
* Home / Browse Listings
* Search tab
* Sign In
* Sign Up
* Saved Listings
* List Property
* Property Detail
* Edit Property
* Profile / My Listings
* Protected route redirects for signed-out users

---

## 🛠️ Tech Stack

| Layer             | Technology                  |
| ----------------- | --------------------------- |
| Mobile Framework  | Expo React Native           |
| Frontend          | React Native                |
| Navigation        | React Navigation            |
| Backend           | Supabase                    |
| Database          | Supabase Postgres           |
| Authentication    | Supabase Auth               |
| File Storage      | Supabase Storage            |
| Security          | Supabase Row Level Security |
| Deployment Target | Android / Web via Expo      |

---

## 🗂️ Project Structure

```text
mobile/
├── App.js
├── app.json
├── package.json
├── .env.example
├── src/
│   ├── components/
│   │   ├── shared.js
│   │   └── OwnerListingCard.js
│   │
│   ├── context/
│   │   └── AuthSessionContext.js
│   │
│   ├── navigation/
│   │   └── AppNavigator.js
│   │
│   ├── screens/
│   │   ├── AuthScreen.js
│   │   ├── HomeScreen.js
│   │   ├── ListPropertyScreen.js
│   │   └── OwnerPanelScreen.js
│   │
│   ├── services/
│   │   ├── authService.js
│   │   ├── propertyImageService.js
│   │   └── propertyListingRepository.js
│   │
│   ├── styles/
│   │   └── appStyles.js
│   │
│   └── lib/
│       └── supabase.js
│
└── supabase/
    └── schema.sql
```

---

## 🔐 Security Model

Samadhan uses Supabase Row Level Security to protect user-owned data.

### Properties

Public users can read listings.

Authenticated users can:

* Create listings only for themselves.
* Edit only their own listings.
* Delete only their own listings.

Non-owners are blocked at both levels:

1. UI hides owner actions.
2. Supabase RLS prevents unauthorized mutations.

### Saved Listings

Saved listings are user-specific.

A user can:

* Save a property.
* Unsave their own saved property.
* View only their own saved rows.

Duplicate saves are prevented by a unique constraint on:

```text
(user_id, property_id)
```

### Storage

Property images use the Supabase Storage bucket:

```text
property-images
```

Image upload path format:

```text
{user_id}/{property_id}/{filename}
```

The app stores public image URLs in:

```text
properties.images
```

---

## 🧪 Verified Test Results

### Backend

Confirmed against Supabase project:

```text
ybofjhvhmcgneuujonpq
```

Verified:

* `public.properties`
* `public.saved_properties`
* `public.profiles`
* `property-images` bucket
* Public listing read access
* Authenticated owner CRUD
* Viewer read-only access
* Saved listing isolation
* Image upload and cleanup
* Final backend cleanup to blank state

---

### Auth

Verified:

* Owner sign in
* Viewer sign in
* Wrong password handling
* Sign out
* Session restore simulation
* Signed-out protected route redirects

---

### RLS

Verified:

* Owner can create listing.
* Owner can edit own listing.
* Owner can delete own listing.
* Viewer can read owner listing.
* Viewer cannot edit owner listing.
* Viewer cannot delete owner listing.
* Viewer save state is separate from owner save state.

---

### Frontend QA

Visually inspected in browser:

* Onboarding
* Home empty state
* Search tab
* Signed-out redirects
* Sign In
* Sign Up
* Signed-in Home
* List Property form
* Form validation state
* Successful create state
* Profile / My Listings empty state
* Temporary listing card
* Property Detail
* Owner edit actions
* Edit Property screen

Responsive widths checked:

```text
Mobile: 390px
Tablet: 768px
Desktop: 1280px
```

---

## 📦 Installation

Clone the repository:

```bash
git clone https://github.com/sagniksengupta24/Samadhan.git
cd Samadhan/mobile
```

Install dependencies:

```bash
npm install
```

Create your environment file:

```bash
cp .env.example .env.local
```

Add your Supabase values:

```env
EXPO_PUBLIC_SUPABASE_URL=your_supabase_project_url
EXPO_PUBLIC_SUPABASE_KEY=your_supabase_anon_key
```

Start the app:

```bash
npx expo start
```

Run web preview:

```bash
npx expo start --web
```

---

## 🔧 Required Environment Variables

Create a `.env.local` file in the `mobile/` directory.

```env
EXPO_PUBLIC_SUPABASE_URL=
EXPO_PUBLIC_SUPABASE_KEY=
```

Do **not** commit `.env.local`.

Recommended `.gitignore` entries:

```gitignore
.env
.env.local
.env.*.local
node_modules
.expo
dist
```

---

## 🧱 Supabase Backend

Samadhan expects the following backend objects:

### Tables

```text
public.properties
public.saved_properties
public.profiles
```

### Storage Bucket

```text
property-images
```

The bucket should be public, while upload/update/delete behavior is protected by policies.

---

## 🧪 Build Checks

The following checks passed during verification:

```bash
npx expo export --platform web
npx expo export --platform android
npx expo install --check
```

Note:

```text
expo install --check passed using Expo’s offline/local dependency map during one verification pass.
```

---

## 📱 Real Device Testing Checklist

Before final submission or demo, test once on a real Android device using Expo Go or a preview build.

Checklist:

```text
App opens
Onboarding displays correctly
Home empty state displays correctly
Sign in works
Sign out works
Protected tabs redirect signed-out users
List Property screen opens
Form validation works
Image picker opens
Owner can create a listing
Owner can edit listing
Owner can delete listing
Viewer cannot edit owner listing
Save/unsave works
```

---

## 🎬 Demo Flow

Recommended MVP demo flow:

1. Open the app.
2. Show onboarding.
3. Show blank Home state.
4. Sign in as owner.
5. Create a property listing.
6. Show listing on Home.
7. Open Property Detail.
8. Edit the listing.
9. Show owner-only actions.
10. Sign out.
11. Sign in as viewer.
12. Show viewer can view the listing.
13. Show viewer cannot edit/delete the listing.
14. Save and unsave the listing.
15. Clean up test listing after demo.

---

## 🚫 Not Included Intentionally

Samadhan is intentionally kept lean.

The following are **not included** in the MVP:

* Payments
* Maps
* Chat
* AI features
* Recommendations
* Admin dashboard
* Analytics
* Permanent dummy seed data

This keeps the project focused, stable, and demo-ready.

---

## 🧑‍💻 Author

**Sagnik Sengupta**

GitHub: [sagniksengupta24](https://github.com/sagniksengupta24)

---

## 📌 Project Summary

Samadhan is a secure property listing app built with Expo React Native and Supabase.
It supports authentication, public property browsing, owner-only listing management, saved listings, image upload, protected routes, and RLS-backed access control.

The project is currently ready for MVP demo and further real-device testing.
-images`: empty unless demo images are intentionally retained

