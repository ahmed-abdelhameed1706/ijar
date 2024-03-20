import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar.jsx";
import { UserProvider } from "./ContextAPI/UserContext.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/Footer/Footer.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<BrowserRouter>
			<ToastContainer />
			<UserProvider>
				<NavBar />
				<App />
				<Footer />
			</UserProvider>
		</BrowserRouter>
	</React.StrictMode>
);
