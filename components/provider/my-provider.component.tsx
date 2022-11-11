import React from "react";
import { Provider } from "react-redux";
import { persistor, store } from "@store/reducers";
import { PersistGate } from "redux-persist/integration/react";
import AuthProvider from "@store/contexts/auth.context";

type MyProviderProps = {
  children?: React.ReactNode;
};

const MyProvider = ({ children }: MyProviderProps) => {
  return (
    <AuthProvider>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <main>{children}</main>
        </PersistGate>
      </Provider>
    </AuthProvider>
  );
};

export default MyProvider;
