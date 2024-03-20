import LoginPage from "@/pages/login/LoginPage";
import SignupPage from "@/pages/signup/SignupPage";
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
