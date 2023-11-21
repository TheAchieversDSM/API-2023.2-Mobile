declare module "@env" {
  const URL_API: string;
  const APP_SECRET: string;
  const APP_MODE: "dev" | "main";
  const AZURE_API: string;

  const FIREBASE_KEY: string;
  const FIREBASE_AUTH: string;
  const FIREBASE_PROJECT_ID: string;
  const FIREBASE_BUCKET: string;
  const FIREBASE_MSGID: string;
  const FIREBASE_APPID: string;
  const FIREBASE_MEASUREMENTID: string;

  export {
    URL_API,
    APP_SECRET,
    APP_MODE,
    AZURE_API,
    FIREBASE_KEY,
    FIREBASE_AUTH,
    FIREBASE_PROJECT_ID,
    FIREBASE_BUCKET,
    FIREBASE_MSGID,
    FIREBASE_APPID,
    FIREBASE_MEASUREMENTID,
  };
}
