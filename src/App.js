import "./styles.css";
import { Routes, Route } from "react-router-dom";
import Login from "./components/login";
import SignUp from "./components/signUp";
import Chat from "./components/chat";
import Home from "./components/home";
import { UserAuthContextProvider } from "./context/userAuthContext";
import ProtectedRoute from "./components/protectedRoute";

import { useAutoAnimate } from "@formkit/auto-animate/react";

export default function App() {
  return (
    <UserAuthContextProvider>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/signUp" element={<SignUp />} />
        <Route exact path="/chat" element={<Chat />} />
        <Route
          exact
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
      </Routes>
    </UserAuthContextProvider>
  );
}
