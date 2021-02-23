import { IEnvironment } from "./environment.model";
import { version } from 'environments/../../package.json';

export const environment: IEnvironment = {
  production: false,
  app: {
    env: 'pwa-dev',
    get version() {
      return version;
    }
  },
  firebaseConfig: {
    apiKey: 'AIzaSyCYZ3UXyf8E9kmfeJmuUMDI1VGln1C9Q0g',
    authDomain: 'game-of-life-3f821.firebaseapp.com',
    databaseURL: 'https://game-of-life-3f821.firebaseio.com',
    projectId: 'game-of-life-3f821',
    storageBucket: 'game-of-life-3f821.appspot.com',
    messagingSenderId: '1036308293289'
  }
};