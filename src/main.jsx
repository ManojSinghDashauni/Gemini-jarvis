import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { JarvisProvider } from "./context/JarvisContext.jsx";

createRoot(document.getElementById("root")).render(
  <JarvisProvider>
    <StrictMode>
      <App />
    </StrictMode>
  </JarvisProvider>
);
