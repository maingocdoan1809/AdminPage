import { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Error from "./pages/Error/Error";
import Main from "./pages/Main/Main";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Unauthenticated from "./pages/Error/Unauthenticated";
import Profile from "./components/Profile/Profile";
import ServerError from "./pages/Error/ServerError";
import AdminPage from "./pages/Admin/Admin";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/unauth" element={<Unauthenticated />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/servererror" element={<ServerError />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
