import LoginPage from "@/pages/login";
import SignupPage from "@/pages/signup";
import { Routes as ReactRouterRoutes, Route } from "react-router-dom";
function Routes() {
  return (
    <ReactRouterRoutes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
    </ReactRouterRoutes>
  );
}

export { Routes };
