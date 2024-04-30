import React from "react";
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import { AnimatePresence } from 'framer-motion';
import "./App.css";
import { Admin, CustomerRegistration, Home, Login, User,UserLogin } from "./pages";
import { Navbar,Footer } from "./components";
import { Form,Dash,Login_Bank,PastCustomers } from "./pages/Bank";
import {Toaster} from "react-hot-toast";

// import { Navbar,Footer } from "./components";

function App() {

  return (
    <AnimatePresence>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login />} /> 
          <Route path="/admin" element={<Admin />} /> 
          <Route path="/user" element={<User />} /> 
          <Route path="/bankform" element={<Form />} />
          <Route path="/bankdash" element={<Dash />} />
          <Route path = "/banklogin" element={<Login_Bank />} />
          <Route path="*" element={<div>404</div>} />
          <Route path="/customerreg" element={<CustomerRegistration/>} />
          <Route path="/userlogin" element={<UserLogin/>} />
          <Route path="/pastcustomers" element={<PastCustomers/>} />
        </Routes>
        <Toaster/>
      </Router>

    </AnimatePresence>
  );
}

export default App;

