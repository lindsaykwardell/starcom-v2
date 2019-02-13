import SplashComponent from "../views/Splash/Splash";
import LoginComponent from "../views/Login/Login";
import LobbyComponent from "../views/Lobby/Lobby";
import SettingsComponent from "../views/Settings/Settings";

//import audioControl from "../../config/audioControl";

// beforeEnter MUST return true to go to the route.
// Any other return value will redirect to a different page.
// Returning false cancels the route.

// Returning false (or 0, etc) on beforeLeave will cancel the route
// but any other value will be ignored and treated as true

export interface IRoute {
  component: any;
  beforeLeave?: () => boolean;
  beforeEnter?: () => string | boolean;
}

const Splash:IRoute = {
  component: SplashComponent
}

const Login:IRoute = {
  component: LoginComponent
}

const Lobby:IRoute =  {
  component: LobbyComponent
}

const Settings:IRoute =  {
  component: SettingsComponent
}

export default {
  Splash,
  Login,
  Lobby,
  Settings
};
