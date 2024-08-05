import { createContext, useContext, useReducer, useEffect } from "react";
import { AUTH_ACTIONS } from "../actions/authActions.jsx";
import { auth, db } from "../firebase/firebaseConfig.js";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";

const AuthContext = createContext();

const initialState = {
  loading: false,
  user: null,
  error: null,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case AUTH_ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };

    case AUTH_ACTIONS.SET_USER:
      return {
        ...state,
        loading: false,
        user: action.payload,
      };

    case AUTH_ACTIONS.SET_ERROR:
      return {
        ...state,
        loading: false,
        user: null,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default function AuthContextProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const getUserOnLoad = () => {
    try {
      auth.onAuthStateChanged(async (currentUser) => {
        if (currentUser) {
          const userDoc = doc(db, "users", currentUser.email);
          const userSnapshot = await getDoc(userDoc);

          if (userSnapshot.exists()) {
            currentUser = userSnapshot.data();
            dispatch({ type: AUTH_ACTIONS.SET_USER, payload: currentUser });
          } else {
            dispatch({
              type: AUTH_ACTIONS.SET_ERROR,
              payload: "User not found",
            });
          }
        }
      });
    } catch (error) {
      dispatch({ type: AUTH_ACTIONS.SET_ERROR, payload: error.message });
    }
  };

  useEffect(() => {
    getUserOnLoad();
  }, []);

  const login = async (userData) => {
    try {
      dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: true });
      const userDoc = doc(db, "users", userData.email);
      const userSnapshot = await getDoc(userDoc);
      if (userSnapshot.exists() && userSnapshot.data().is_admin) {
        await signInWithEmailAndPassword(
          auth,
          userData.email,
          userData.password
        );

        await updateDoc(userDoc, {
          last_login: new Date(),
        });
      } else {
        dispatch({ type: AUTH_ACTIONS.SET_ERROR, payload: "User not found" });
      }
    } catch (error) {
      dispatch({ type: AUTH_ACTIONS.SET_ERROR, payload: error.message });
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      dispatch({ type: AUTH_ACTIONS.SET_ERROR, payload: error.message });
    }
  };

  const contextData = {
    state,
    dispatch,
    loading: state.loading,
    user: state.user,
    error: state.error,
    login,
    logout,
  };
  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
