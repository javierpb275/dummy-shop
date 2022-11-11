import Loading from "@components/loading/loading.component";
import Head from "next/head";
import {
  ReactNode,
  FC,
  createContext,
  useReducer,
  useEffect,
  useCallback,
  useMemo,
  useContext,
} from "react";
import { AuthService } from "services/authService";
import { IBodySignIn, LocalStorageItems } from "services/serviceTypes";
import {
  AuthAction,
  AuthActionType,
  IAuthContext,
  IAuthState,
} from "./contexts.types";

const initialState: IAuthState = {
  user: null,
  initialLoading: false,
  isLoggingIn: false,
  loginError: "",
};

const initialContext: IAuthContext = {
  state: {
    user: null,
    initialLoading: false,
    isLoggingIn: false,
    loginError: "",
  },
  actions: {
    login: () => undefined,
    logout: () => undefined,
  },
};

const reducer = (state: IAuthState, action: AuthAction): IAuthState => {
  const { type, payload } = action;
  switch (type) {
    case AuthActionType.INIT_FETCH_USER_DATA:
      return {
        ...state,
        initialLoading: true,
      };
    case AuthActionType.FETCH_USER_DATA_SUCCESSFUL:
      return {
        ...state,
        initialLoading: false,
        user: payload?.user,
      };
    case AuthActionType.FETCH_USER_DATA_FAILED:
      return {
        ...state,
        initialLoading: false,
        user: null,
      };
    case AuthActionType.INIT_LOGIN:
      return {
        ...state,
        isLoggingIn: true,
      };
    case AuthActionType.LOGIN_SUCCESSFUL:
      return {
        ...state,
        user: payload?.user,
        isLoggingIn: false,
        loginError: "",
      };
    case AuthActionType.LOGIN_FAILED:
      return {
        ...state,
        user: null,
        isLoggingIn: false,
        loginError: payload?.error as string,
      };
    case AuthActionType.LOGOUT:
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

const AuthContext = createContext<IAuthContext>(initialContext);

const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (localStorage.getItem(LocalStorageItems.ACCESS_TOKEN)) {
          dispatch({
            type: AuthActionType.INIT_FETCH_USER_DATA,
          });
          const data = await AuthService.getProfile(
            localStorage.getItem(LocalStorageItems.ACCESS_TOKEN)!
          );
          dispatch({
            type: AuthActionType.FETCH_USER_DATA_SUCCESSFUL,
            payload: {
              user: data,
            },
          });
        } else {
          AuthService.clearLocalStorage();
          dispatch({
            type: AuthActionType.FETCH_USER_DATA_FAILED,
          });
        }
      } catch (err: Error | any) {
        AuthService.clearLocalStorage();
        dispatch({
          type: AuthActionType.FETCH_USER_DATA_FAILED,
        });
      }
    };
    fetchUserData();
  }, []);
  const login = useCallback(async (userLogin: IBodySignIn) => {
    try {
      dispatch({
        type: AuthActionType.INIT_LOGIN,
      });
      const data = await AuthService.signIn(userLogin);
      dispatch({
        type: AuthActionType.LOGIN_SUCCESSFUL,
        payload: {
          user: {
            email: data.email,
            firstName: data.firstName,
            gender: data.gender,
            id: data.id,
            image: data.image,
            lastName: data.lastName,
            username: data.username,
          },
        },
      });
      AuthService.saveInLocalStorage({ id: data.id, token: data.token });
    } catch (err: Error | any) {
      dispatch({
        type: AuthActionType.LOGIN_FAILED,
        payload: { error: err || "Login failed" },
      });
    }
  }, []);
  const logout = useCallback(() => {
    AuthService.clearLocalStorage();
    dispatch({ type: AuthActionType.LOGOUT });
  }, []);
  const value = useMemo(
    () => ({ state, actions: { login, logout } }),
    [login, logout, state]
  );
  return (
    <AuthContext.Provider value={value}>
      {state.initialLoading ? (
        <>
          <Head>
            <title>Loading...</title>
            <meta
              name="viewport"
              content="initial-scale=1.0, width=device-width"
            />
          </Head>
          <Loading title="Loading..." />
        </>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export const useAuthState = () => {
  const { state } = useContext(AuthContext);
  return state;
};

export const useAuthActions = () => {
  const { actions } = useContext(AuthContext);
  return actions;
};

export default AuthProvider;
