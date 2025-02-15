import {Route, Routes} from "react-router";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import {Toaster} from "react-hot-toast";
import UserDetails from "./pages/userDetails";


const App = () => {
  const token = localStorage.getItem("token");
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/details" element={<UserDetails />} />
        <Route path="/*" element={<Home />} />
      </Routes>
    </>
  );
};

export default App;

