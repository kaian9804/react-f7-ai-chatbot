import { App, View } from "framework7-react";

import HomePage from "./pages/HomePage";
import SettingsPage from "./pages/SettingsPage";

const f7params = {
  name: "My App",
  view: {
    browserHistory: true,
  },
  // specify routes for app
  routes: [
    {
      path: "/",
      component: HomePage,
    },
    {
      path: "/settings/",
      component: SettingsPage,
    },
  ],
};

export default () => (
  // Main Framework7 App component where we pass Framework7 params
  <App theme="auto" {...f7params}>
    {/* Your main view, should have "main" prop */}
    <View main url="/" />
  </App>
);
