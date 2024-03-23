// import { Button } from "./components/ui/button";
import { ToastContainer } from "react-toastify";
import Footer from "./components/Footer/Footer";
import NavBar from "./components/NavBar/NavBar";
import Routes from "./routes/routes";

const App = () => {
  return (
    <>
      <div className="h-full min-h-screen flex flex-col justify-between bg-gray-50">
        <NavBar />
        <Routes />
        <Footer />
      </div>
      <ToastContainer pauseOnFocusLoss={false} />
    </>
  );
};

export default App;
