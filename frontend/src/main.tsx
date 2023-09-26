import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { DashBoardContextProvider } from "./context/DashboardContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <DashBoardContextProvider>
      <App />
    </DashBoardContextProvider>
  </BrowserRouter>
);
