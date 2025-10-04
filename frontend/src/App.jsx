import { useState, createContext } from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Home from "./pages/home";
import MyTasks from "./pages/myTasks";
import About from "./pages/about";
import Login from "./pages/login";

import Layout from "./layout/layout";
import "./App.css";

export const isLoginContext = createContext();

function App() {
  let [isLoggedIn, setIsLoggedIn] = useState(false);
  let [globalUsername, setGlobalUsername] = useState("");
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <isLoginContext.Provider value={isLoggedIn}>
              <Layout isLoggedIn={isLoggedIn} />
            </isLoginContext.Provider>
          }
        >
          <Route index element={<Home />}></Route>

          <Route path="home" element={<Home />}></Route>
          <Route
            path="mytasks"
            element={
              <MyTasks
                setIsLoggedIn={setIsLoggedIn}
                globalUsername={globalUsername}
                setGlobalUsername={setGlobalUsername}
              />
            }
          ></Route>
          <Route
            path="login"
            element={
              <Login
                setIsLoggedIn={setIsLoggedIn}
                setGlobalUsername={setGlobalUsername}
              />
            }
          ></Route>
          <Route path="about" element={<About />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
