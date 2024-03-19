import LoginPage from "@/pages/login";
import { Routes as ReactRouterRoutes, Route } from "react-router-dom";
function Routes() {
  return (
    <ReactRouterRoutes>
      <Route path="/login" element={<LoginPage />} />
    </ReactRouterRoutes>
  );
}

export { Routes };
