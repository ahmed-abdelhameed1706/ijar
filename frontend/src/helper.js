import axios from "axios";
import { toast } from "react-toastify";

const setActiveNav = (navigation, setNavigation, location) => {
  const newNave = navigation.map((el) => {
    if (el.href === location.pathname) el.current = true;
    else el.current = false;
    return el;
  });
  setNavigation(newNave);
};

const classNames = (...classes) => {
  return classes.filter(Boolean).join(" ");
};

const handleScrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

export { setActiveNav, classNames, handleScrollToTop };
