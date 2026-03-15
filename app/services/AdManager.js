// app/services/AdManager.js
// Uses react-native-google-mobile-ads (NOT expo-ads-admob which is deprecated).
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  RewardedAd,
  RewardedAdEventType,
  TestIds,
} from 'react-native-google-mobile-ads';

const AD_UNIT_ID = __DEV__
  ? TestIds.REWARDED
  : 'ca-app-pub-XXXXXXXXXXXXXXXX/XXXXXXXXXX';

const STORAGE_KEY        = 'rewarded_ad_access_expiry';
const ACCESS_DURATION_MS = 30 * 60 * 1000;

let rewardedAd    = null;
let adLoaded      = false;
let loadCallbacks = [];

export function initAd() {
  rewardedAd = RewardedAd.createForAdRequest(AD_UNIT_ID, {
    requestNonPersonalizedAdsOnly: true,
  });
  const offLoaded = rewardedAd.addAdEventListener(RewardedAdEventType.LOADED, () => {
    adLoaded = true;
    loadCallbacks.forEach(cb => cb(null, true));
    loadCallbacks = [];
  });
  const offError = rewardedAd.addAdEventListener(RewardedAdEventType.ERROR, (err) => {
    adLoaded = false;
    loadCallbacks.forEach(cb => cb(err, false));
    loadCallbacks = [];
  });
  rewardedAd.load();
  return () => { offLoaded(); offError(); };
}

export async function hasActiveAccess() {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (!raw) return false;
    return Date.now() < parseInt(raw, 10);
  } catch { return false; }
}

export async function getRemainingAccessMs() {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (!raw) return 0;
    const remaining = parseInt(raw, 10) - Date.now();
    return remaining > 0 ? remaining : 0;
  } catch { return 0; }
}

export async function revokeAccess() {
  await AsyncStorage.removeItem(STORAGE_KEY);
}

async function grantAccess() {
  await AsyncStorage.setItem(STORAGE_KEY, String(Date.now() + ACCESS_DURATION_MS));
}

export function showRewardedAd() {
  return new Promise(resolve => {
    function attachShowListeners(ad) {
      let earned = false;
      const offReward = ad.addAdEventListener(RewardedAdEventType.EARNED_REWARD, async () => {
        earned = true;
        await grantAccess();
      });
      const offClosed = ad.addAdEventListener(RewardedAdEventType.CLOSED, () => {
        offReward(); offClosed();
        adLoaded = false;
        initAd();
        resolve(earned ? { granted: true } : { granted: false, reason: 'Closed before reward' });
      });
      ad.show().catch(err => {
        offReward(); offClosed();
        resolve({ granted: false, reason: err?.message ?? 'show() failed' });
      });
    }
    if (adLoaded && rewardedAd) { attachShowListeners(rewardedAd); return; }
    if (rewardedAd) {
      loadCallbacks.push((err, ok) =>
        ok && rewardedAd ? attachShowListeners(rewardedAd)
                         : resolve({ granted: false, reason: err?.message ?? 'Load failed' })
      );
      return;
    }
    initAd();
    loadCallbacks.push((err, ok) =>
      ok && rewardedAd ? attachShowListeners(rewardedAd)
                       : resolve({ granted: false, reason: err?.message ?? 'Init+load failed' })
    );
  });
}
