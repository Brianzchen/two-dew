declare module 'firebase/app' {
  declare type FirebaseConfig = {|
    apiKey?: string,
    authDomain?: string,
    projectId?: string,
    storageBucket?: string,
    messagingSenderId?: string,
    appId?: string,
    measurementId?: string,
  |};

  declare type CurrentUser = {|
    email: string,
    emailVerified: boolean,
    uid: string,
  |};

  declare type Auth = () => {|
    currentUser: ?CurrentUser,
    createUserWithEmailAndPassword: (
      email: string,
      password: string,
    ) => Promise<{|
      user: CurrentUser
    |}>,
    onAuthStateChanged: (callback: (user: CurrentUser) => void) => void,
    signInWithEmailAndPassword: (
      email: string,
      password: string,
    ) => Promise<{|
      user: CurrentUser
    |}>,
    signOut: () => Promise<void>,
  |}

  declare type DocRef = {|
    id: string,
  |};

  declare type Firestore = () => ({|
    collection: (collection: string) => ({|
      add: ({ [key: string]: any }) => Promise<DocRef>,
      get: () => Promise<Array<any>>,
    |})
  |});

  declare type InitializeApp = (config: FirebaseConfig) => void;

  declare type Firebase = {|
    INTERNAL: { [key: string]: any, ... },
    SDK_VERSION: string,
    User: (...args: Array<any>) => any,
    analytics: (...args: Array<any>) => any,
    app: (...args: Array<any>) => any,
    apps: (...args: Array<any>) => any,
    auth: Auth,
    firestore: Firestore,
    initializeApp: InitializeApp,
    installations: (...args: Array<any>) => any,
    onLog: (...args: Array<any>) => any,
    registerVersion: (...args: Array<any>) => any,
    setLogLevel: (...args: Array<any>) => any,
  |};

  declare module.exports: Firebase;
}

declare module 'firebase/analytics' {
  declare module.exports: void;
}

declare module 'firebase/auth' {
  declare module.exports: void;
}

declare module 'firebase/firestore' {
  declare module.exports: void;
}
