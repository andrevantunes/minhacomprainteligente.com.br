import { defaultState as accesses } from "./AccessesStore/accesses-store.state";
import { defaultState as user } from "./UserStore/user-store.state";
import { defaultState as cart } from "./CartStore/cart-store.state";

// plop import

const combinedStates = {
  ...user,
  ...cart,
  ...accesses,
  // plop export
};

export default combinedStates;
