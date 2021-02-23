export interface IEnvironment {
  production: boolean;
  app: {
    version: string;
    env: string;
  };
  firebaseConfig: {
    apiKey: string;
    authDomain: string;
    databaseURL: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
  }
}