import { defaultState as accesses } from "./AccessesStore/accesses-store.state";
import { defaultState as user } from "./UserStore/user-store.state";

// plop import

const combinedStates = {
  ...user,
  ...accesses,
  // plop export
};

export default combinedStates;
