import { Routes, Route, RouteObject } from "react-router-dom";
import { Home } from "../pages/Home/Home";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
];

export const AllRoutes = () => {
  return (
    // Render the Route components using map
    <Routes>
      {routes.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}
    </Routes>
  );
};
