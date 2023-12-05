import "dotenv/config";
export default {
  expo: {
    name: "ifs-frontend-rn",
    slug: "ifs-frontend-rn",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      // image: "./assets/Logo.png",
      resizeMode: "contain",
      backgroundColor: "#3587A4",
    },
    assetBundlePatterns: ["**/*"],
    // plugins: [
    //   [
    //     "expo-camera",
    //     {
    //       cameraPermission: "Allow app to access your camera.",
    //     },
    //   ],
    // ],
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      package: "com.ifs.ifs_frontend_rn",
    },
    web: {
      favicon: "./assets/favicon.png",
    },
    packagerOpts: {
      config: "metro.config.js",
      sourceExts: ["js", "jsx", "css", "ts", "tsx"],
    },
    extra: {
      firebaseApiKey: process.env.FIREBASE_API_KEY,
      firebaseAuthDomain: process.env.FIREBASE_AUTH_DOMAIN,
      firebaseProjectId: process.env.FIREBASE_PROJECT_ID,
      firebaseStorageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      firebaseMessagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      firebaseAppId: process.env.FIREBASE_APP_ID,
      firebaseMeasurementId: process.env.FIREBASE_MEASUREMENT_ID,
      eas: {
        projectId: "c0cc3a5b-9206-4143-a488-1a836a5d71ab",
      },
      googleApiKey: process.env.GOOGLE_API_KEY,
    },
  },
};
