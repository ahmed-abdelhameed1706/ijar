// import { Button } from "./components/ui/button";
import { ToastContainer } from "react-toastify";
import Footer from "./components/Footer/Footer";
import NavBar from "./components/NavBar/NavBar";
import Routes from "./routes/routes";

const App = () => {
  return (
    <div className="h-full bg-gray-50">
      <NavBar />
      <Routes />
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default App;
