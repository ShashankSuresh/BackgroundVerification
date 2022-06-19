import React from "react";
import { Provider } from "react-redux";
import { store } from "@app/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { IntlProvider } from "react-intl";
import ErrorBoundary from "@components/ErrorBoundary";
import AppRoute from "./AppRoute";
import messages_en from "@translation/en.json";
import messages_sv from "@translation/sv.json";

import "primereact/resources/primereact.min.css";
import "@sass/pr-theme.css";
import "primeicons/primeicons.css";
import "@sass/app.scss";

const messages = {
  en: messages_en,
  sv: messages_sv,
};

const applanguage = "sv";

let persistor = persistStore(store);

function App() {
  return (
    <div className="App">
      <ErrorBoundary>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <IntlProvider
              defaultLocale="sv"
              locale={applanguage}
              messages={messages[applanguage]}
            >
              <AppRoute />
            </IntlProvider>
          </PersistGate>
        </Provider>
      </ErrorBoundary>
    </div>
  );
}

export default App;
