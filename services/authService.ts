import { auth } from './firebase';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
  User as FirebaseUser
} from 'firebase/auth';

export const signInOrCreate = async (email: string, password: string) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    return res.user;
  } catch (err) {
    // If sign in fails, try create
    const res = await createUserWithEmailAndPassword(auth, email, password);
    return res.user;
  }
};

export const signOut = async () => {
  await firebaseSignOut(auth);
};

export const onAuthChange = (cb: (user: FirebaseUser | null) => void) => {
  return onAuthStateChanged(auth, cb);
};

export const sendSignInLink = async (email: string) => {
  const actionCodeSettings = {
    // After clicking the link, return to the app root
    url: window.location.origin + '/',
    handleCodeInApp: true,
  };
  await sendSignInLinkToEmail(auth, email, actionCodeSettings);
  window.localStorage.setItem('emailForSignIn', email);
};

export const isSignInLink = (url: string) => {
  return isSignInWithEmailLink(auth, url);
};

export const completeSignInFromLink = async (url: string) => {
  let email = window.localStorage.getItem('emailForSignIn') || '';
  if (!email) {
    email = window.prompt('Please provide your email for confirmation') || '';
  }
  if (!email) throw new Error('No email available for sign-in');
  const res = await signInWithEmailLink(auth, email, url);
  window.localStorage.removeItem('emailForSignIn');
  return res.user;
};
