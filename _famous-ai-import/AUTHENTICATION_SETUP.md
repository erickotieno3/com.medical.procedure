# Authentication Setup Guide

## Installation
```bash
npm install @react-native-async-storage/async-storage react-native-url-polyfill
```

## Testing Password
**Password:** `SurgicalGuide2024`

Change in `components/PasswordGate.tsx` line 5.

## Features Implemented
✅ Email/password signup and login
✅ Supabase Auth with session persistence
✅ Protected routes with password gate
✅ User profile management
✅ Saved procedures syncing across devices
✅ Row Level Security (RLS) enabled

## How to Deploy for Testing

### Option 1: EAS Build (Recommended)
```bash
npm install -g eas-cli
eas login
eas build:configure
eas build --platform android --profile preview
```
Share the generated APK link with testers.

### Option 2: Expo Go (Quick Testing)
```bash
npm start
```
Scan QR code with Expo Go app.

## Supabase Setup
Already configured! Auth is enabled at:
- URL: https://exzypthvdefpzmmqtixt.supabase.co
- Table: `saved_procedures` with RLS policies

## User Flow
1. App opens → Password gate (testing protection)
2. Enter password → Welcome screen
3. Sign up or log in
4. Save procedures → Syncs to Supabase
5. Login on another device → Saved procedures appear

## Security
- Password gate protects app during testing
- RLS ensures users only see their own data
- Sessions persist with AsyncStorage
- Email verification available in Supabase dashboard
