import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LoginScreen from "./screens/LoginScreen.js";
import HomeScreen from "./screens/HomeScreen.js";
import Registration from "./screens/Registration.js";
import MyContext from "./context/appContext.js";
import AddNewContact from "./screens/AddNewContact.js";
import ViewContactDetails from "./screens/ViewContactDetails.js";
import { getNewAccessToken } from "./apiServices/Fetch.js";

const Main = () => {
  const [userToken, setUserToken] = useState({
    refreshToken: "",
    accessToken: "",
  });
  const [userData, setUserData] = useState();

  useEffect(() => {
    const timer = setInterval(() => {
      getNewAccessToken();
    }, 300000);
  });

  return (
    <MyContext.Provider
      value={{ userData, userToken, setUserData, setUserToken }}
    >
      <Router>
        {/* <div>
            <Link to="/">LoginScreen</Link>
        <Link to="/home">HomeScreen</Link>
        <Link to="/reg">Registration Screen</Link>
        
        </div> */}
        <Routes>
          <Route path="/" element={<LoginScreen />} />
          <Route path="/home" element={<HomeScreen />} />
          <Route path="/reg" element={<Registration />} />
          <Route path="/new_contact" element={<AddNewContact />} />
          <Route path="/view_contact" element={<ViewContactDetails />} />
        </Routes>
      </Router>
    </MyContext.Provider>
  );
};

export default Main;
