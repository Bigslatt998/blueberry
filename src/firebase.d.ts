import type { Firestore } from 'firebase/firestore';
import type { Auth } from 'firebase/auth';

declare module '../../firebase' {
  export const db: Firestore;
  export const auth: Auth;
}
declare module '../firebase' {
  export const db: Firestore;
  export const auth: Auth;
}