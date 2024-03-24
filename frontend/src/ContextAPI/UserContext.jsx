import { createContext, useEffect, useState } from "react";
import authService from "@/services/authService";

const UserContext = createContext();

// eslint-disable-next-line react/prop-types
const UserProvider = ({ children }) => {};

export { UserContext, UserProvider };
