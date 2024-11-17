import combinedStates from "./combined-states";
import { useEffect } from "react";

interface DevTools {
  isInitialized: boolean;
  current: any;
}

const features = {
  pause: true, // start/pause recording of dispatched actions
  lock: true, // lock/unlock dispatching actions and side effects
  persist: true, // persist states on page reloading
  export: true, // export history of actions in a file
  import: "custom", // import history of actions from a file
  jump: false, // jump back and forth (time travelling)
  skip: true, // skip (cancel) actions
  reorder: false, // drag and drop actions in the history list
  dispatch: false, // dispatch custom actions or action creators
  test: false, // generate tests for the selected actions
};

const serialize = {
  options: {
    undefined: true,
  },
};

export const devTools: DevTools = { isInitialized: false, current: null };

const ReduxDevtoolsContext = ({ children }: any) => {
  useEffect(() => {
    if (!devTools.isInitialized) {
      const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__;
      if (reduxDevTools) {
        devTools.current = reduxDevTools.connect({ features, serialize });
        devTools.current.init(combinedStates);
        devTools.isInitialized = true;
        window.addEventListener("beforeunload", (event) => {
          event.preventDefault();
          reduxDevTools.disconnect();
        });
      }
    }
  });

  return children;
};

export default ReduxDevtoolsContext;
