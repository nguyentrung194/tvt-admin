import React, { useState, useEffect, useContext, createContext } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";
import "firebase/storage";
import "firebase/analytics";

import environment from "../config";

if (!firebase.apps.length) {
  firebase.initializeApp(environment.firebase);
}

export const fbase = firebase;
export const storage = firebase.storage();
export const fdb = firebase.firestore();
export const fana = firebase.analytics();

export interface AuthContextProps {
  state: {
    initializing: boolean;
    user: firebase.User | null;
    customClaims: firebase.auth.IdTokenResult | null;
  };
  signin: (
    email: string,
    password: string
  ) => Promise<firebase.auth.UserCredential>;
  signout: () => Promise<void>;
}

// @ts-ignore
const authContext = createContext<AuthContextProps>(null);

export interface ProvideAuthProps {
  children: React.ReactNode;
}

function useProvideAuth() {
  const [state, setState] = useState<{
    initializing: boolean;
    user: null;
    customClaims: firebase.auth.IdTokenResult | null;
  }>({
    initializing: true,
    user: null,
    customClaims: null,
  });

  async function onChange(user: any) {
    if (user) {
      const tokenResult: firebase.auth.IdTokenResult | null = await firebase
        .auth()
        .currentUser!.getIdTokenResult();

      setState({ initializing: false, user, customClaims: tokenResult });
    } else {
      setState({
        ...state,
        initializing: false,
        user: null,
        customClaims: null,
      });
    }
  }

  const signin = (email: string, password: string) => {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  };

  const signout = () => {
    return firebase.auth().signOut();
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(onChange);
    return () => unsubscribe();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    state,
    signin,
    signout,
  };
}

export function ProvideAuth({ children }: ProvideAuthProps) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};
