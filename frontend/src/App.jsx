// import { Button } from "./components/ui/button";
import { ToastContainer } from "react-toastify";
import Footer from "./components/Footer/Footer";
import NavBar from "./components/NavBar/NavBar";
import Routes from "./routes/routes";

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-grow max-[768px]:mt-16">
        <Routes />
      </main>
      <Footer />
      <ToastContainer pauseOnFocusLoss={false} />
    </div>
  );
};

export default App;
