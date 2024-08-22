import React from "react";
import Router from "./routes/Router";
import { Provider } from "react-redux";
import store, { persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <Router />
      </PersistGate>
    </Provider>
  );
};

export default App;
