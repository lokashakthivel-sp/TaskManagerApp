import { useEffect, useState, useContext, createContext } from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Home from "./pages/home";
import MyTasks from "./pages/myTasks";
import About from "./pages/about";
import Login from "./pages/login";

import Layout from "./layout/layout";
import "./App.css";

export const isLoginContext = createContext();


//in dev the vite server loads from root path / but in deployment in github pages it serves from the /<repo-name>
//so based on the env need to give a basename
const basename = import.meta.env.DEV ? "/" : "/TaskManagerApp/";

function App() {
  let [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    //the basename prop automatically prefixes all routes with the required path 
    <BrowserRouter basename={basename}>
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
              isLoggedIn ? (
                <MyTasks setIsLoggedIn={setIsLoggedIn} />
              ) : (
                <Login setIsLoggedIn={setIsLoggedIn} />
              )
            }
          ></Route>
          <Route path="about" element={<About />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
