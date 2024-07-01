// Import React
import React from "react";

// Import ReactDOM
import ReactDOM from "react-dom/client";

// Import F7 Bundle
import Framework7 from "framework7/lite-bundle";

// Import F7-React Plugin
import Framework7React from "framework7-react";

// Import F7 CSS
import "framework7/css/bundle";

// Import Main App component
import App from "./App";

// Init F7-React Plugin
Framework7.use(Framework7React);

// Mount React App
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
