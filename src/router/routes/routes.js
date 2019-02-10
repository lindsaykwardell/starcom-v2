import Splash from "../../views/Splash/Splash";
import Login from "../../views/Login/Login";
import Lobby from "../../views/Lobby/Lobby";
import Settings from "../../views/Settings/Settings";

//import audioControl from "../../config/audioControl";

// beforeEnter MUST return true to go to the route.
// Any other return value will redirect to a different page.
// Returning false cancels the route.

// Returning false (or 0, etc) on beforeLeave will cancel the route
// but any other value will be ignored and treated as true

export default {
  Splash: {
    component: Splash
  },
  Login: {
    component: Login
  },
  Lobby: {
    component: Lobby
  },
  Settings: {
    component: Settings
  }
};
