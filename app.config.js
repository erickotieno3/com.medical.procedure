export default {
  expo: {
    name: "Medical-Surgical Procedure Guide",
    slug: "medical-surgical-procedure-guide",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icons/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/splash/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.procedure.guide",
      buildNumber: "1.0.0",
      icon: "./assets/icons/icon-ios/icon.png",
      splash: {
        image: "./assets/splash/splash-ios/splash.png",
        tabletImage: "./assets/splash/splash-ios/splash-tablet.png",
        backgroundColor: "#ffffff"
      }
    },
    android: {
      package: "com.procedure.guide",
      versionCode: 1,
      icon: "./assets/icons/icon-android/icon.png",
      adaptiveIcon: {
        foregroundImage: "./assets/icons/icon-android/adaptive-icon.png",
        backgroundColor: "#ffffff"
      },
      splash: {
        image: "./assets/splash/splash-android/splash.png",
        backgroundColor: "#ffffff"
      },
      permissions: [
        "CAMERA",
        "RECORD_AUDIO",
        "MODIFY_AUDIO_SETTINGS",
        "ACCESS_NETWORK_STATE",
        "INTERNET"
      ]
    },
    web: {
      favicon: "./assets/icons/favicon.png"
    },
    plugins: [
      [
        "react-native-google-mobile-ads",
        {
          androidAppId: "ca-app-pub-XXXXXXXXXXXXXXXX~XXXXXXXXXX",
          iosAppId: "ca-app-pub-XXXXXXXXXXXXXXXX~XXXXXXXXXX"
        }
      ]
    ],
    extra: {
      eas: {
        projectId: "e8103bfa-4665-4b2c-a622-642a2660ee13"
      }
    }
  }
};
