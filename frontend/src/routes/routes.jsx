import Home from "@/pages/home/home";
import LoginPage from "@/pages/login";
import NotFound from "@/pages/notFound/notFound";
import SignupPage from "@/pages/signup";
import { Routes as ReactRouterRoutes, Route } from "react-router-dom";

const Routes = () => {
  return (
    <ReactRouterRoutes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="*" element={<NotFound />} />
    </ReactRouterRoutes>
  );
}

export default Routes;
