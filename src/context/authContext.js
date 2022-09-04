import React, { useReducer, createContext } from "react";
import jwtDecode from "jwt-decode";

const initalState = {
  user: null,
};

console.log("authContext: >" + localStorage.getItem("token") + "<");

if (localStorage.getItem("token")) {
  const decodedToken = jwtDecode(localStorage.getItem("token"));
  console.log("decodedToken: ", decodedToken);

  if (decodedToken * 1000 < Date.now()) {
    //expired token
    console.log("expired");
    localStorage.removeItem("token");
  } else {
    console.log("valid token");
    initalState.user = decodedToken;
  }
}

const AuthContext = createContext({
  user: null,
  login: (userData) => {},
  logout: () => {},
});

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

const AuthProvider = (props) => {
  const [state, dispatch] = useReducer(authReducer, initalState);

  const login = (userData) => {
    localStorage.setItem("token", userData.token);
    dispatch({
      type: "LOGIN",
      payload: userData,
    });
  };

  const logout = () => {
    localStorage.removeItem("token");
    dispatch({
      type: "LOGOUT",
    });
  };

  const value = {
    user: state.user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value} {...props} />;
};

export { AuthContext, AuthProvider };
