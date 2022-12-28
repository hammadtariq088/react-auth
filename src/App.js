import "./App.css";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Error from "./pages/Error";
import UserDetails from "./pages/UserDetails";
import Auth from "./pages/Auth";
import { Routes, Route } from "react-router-dom";
import EditProfile from "./pages/EditProfile";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route
          path="/home"
          element={
            <Auth>
              <Home />
            </Auth>
          }
        />
        <Route
          path="/editprofile"
          element={
            <Auth>
              <EditProfile />
            </Auth>
          }
        />
        <Route
          path="/userdetails/:id"
          element={
            <Auth>
              <UserDetails />
            </Auth>
          }
        />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
