import "react-native-gesture-handler";
import React from "react";
import { AppRegistry } from "react-native";
import App from "./App";
import { Provider } from "react-redux";
import Store, { persistor } from "./src/redux/Store";
import { name as appName } from "./app.json";
import { PersistGate } from "redux-persist/integration/react";
import { StripeProvider } from "@stripe/stripe-react-native";
import constants from "./src/utils/helpers/constants";
import { Provider as ModalProvider } from "react-native-paper";
import messaging from "@react-native-firebase/messaging";
// import firebase from 'firebase/app';

const Index = () => {
  // firebase.initializeApp();
  messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    // console.log('Message handled in the background!', remoteMessage);
  });
  return (
    <Provider store={Store}>
      <PersistGate loading={null} persistor={persistor}>
        <StripeProvider publishableKey={constants.STRIPE_PUBLIC_KEY}>
          <ModalProvider>
            <App />
          </ModalProvider>
        </StripeProvider>
      </PersistGate>
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => Index);
