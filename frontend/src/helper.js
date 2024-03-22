import axios from "axios";
import { toast } from "react-toastify";

const signOut = (cookieValue) => {
  console.log(cookieValue);
  axios
    .post(`/auth/logout`, {
      withCredentials: true,
      Headers: {
        authorization: cookieValue,
      },
    })
    .then((data) => {
      toast(data.data.message);
      console.log(data);
    })
    .catch((err) => {
      // toast.error(err.message);
      console.log(err);
    });
};

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

export { signOut, setActiveNav, classNames, handleScrollToTop };
