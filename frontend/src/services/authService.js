import axios from "../api/axios";

class AuthService {
  async checkAuthentication() {
    let authStatus = { isAuthenticated: false, user: null };
    //get user from local storage
    const storedToken = localStorage.getItem("user-auth");
    // let Token = null;
    try {
      const response = await axios.get("/auth/check", {
        // withCredentials: true,
      });
      console.log(response);
      const { user, jwt } = response.data;
      const data = {
        userId: user.id,
        jwt: jwt,
      };
      // Token = jwt;
      console.log("Cookies Still on: ", response.status);
      authStatus.user = data;
      //check  if there user in localstorage
      if (!storedToken) {
        //update local storage if token still in cookies
        localStorage.setItem("user-auth", JSON.stringify(data));
        authStatus.isAuthenticated = true;
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // mean user dont have cookies token
        // log person out so he can login again ann get new token cookies
        //update local storage if token still in cookies
        localStorage.removeItem("user-auth");
        authStatus.isAuthenticated = false;
      } else {
        console.error("Error:", error);
      }
    }
    // Check if token is expired, if its remove it from local storage
    // const userString = localStorage.getItem("user-auth");
    // if (userString) {
    //   const tokenData = JSON.parse(atob(Token.split(".")[1]));
    //   const expirationTime = tokenData.exp * 1000;
    //   const timeToExpire = expirationTime - Date.now();
    //   const timeToExpireInDays = Math.floor(timeToExpire / 1000 / 60 / 60 / 24);
    //   const timeToExpireInHours = Math.floor(timeToExpire / 1000 / 60 / 60);
    //   const minutesLeft = Math.floor((timeToExpire / 1000 / 60) % 60);
    //   const secondLeft = Math.floor((timeToExpire / 1000) % 60);
    //   console.log(
    //     "token expire in D:H:M:S: ",
    //     timeToExpireInDays,
    //     timeToExpireInHours,
    //     minutesLeft,
    //     secondLeft
    //   );
    //   if (Date.now() > expirationTime) {
    //     localStorage.removeItem("user-auth");
    //   }
    // }
    return authStatus;
  }
}
export default new AuthService();
