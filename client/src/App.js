import React from "react";
import './style.scss';
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import Home from "./page/Home";
import Login from "./page/Login";
import Register from "./page/Register";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Single from "./page/Single";
import Write from "./page/Write";
const Layout = ()=>{
  return(
    <div>
      <Navbar/>
      <Outlet/>
      <Footer/>
    </div>
  );
}
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children:[
      {
        path: '/',
        element: <Home/>
      },
      {
        path: '/post/:id',
        element: <Single/>
      },
      {
        path: '/write',
        element: <Write/>
      }
    ]
  },
  {
    path: "/login",
    element: <Login/>,
  },
  {
    path: "/register",
    element: <Register/>,
  },
]);

function App() {
  return (
    <div className="app">
      <div className="container">
       <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
