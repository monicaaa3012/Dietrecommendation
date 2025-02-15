import {Link, useNavigate} from "react-router";
import Logo from "../logo";
import "./navbar.css";
import toast from "react-hot-toast";
import {IoMdCart} from "react-icons/io";
import {IoMdHome} from "react-icons/io";
import {AiTwotoneFolderAdd} from "react-icons/ai";
import {IoLogOut} from "react-icons/io5";

const NavBar = () => {
  const navigate = useNavigate();

  const menuOptions = [
    {
      name: "Home",
      link: "/home",
      showToAdmin: false,
      icon: <IoMdHome size={24} />,
    },
    {
      name: "Add Product",
      link: "/admin/add-product",
      showToAdmin: true,
      icon: <AiTwotoneFolderAdd size={24} />,
    },
    {
      name: "Grocery",
      link: "/cart",
      showToAdmin: false,
      icon: <IoMdCart size={24} />,
    },
    {
      name: "Logout",
      link: "/",
      showToAdmin: true,
      icon: <IoLogOut size={24} />,
    },
  ];

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px 20px",
        position: "sticky",
        top: 0,
        backgroundColor: "white",
      }}
    >
      <Logo />
      <div
        style={{
          display: "flex",
          gap: "20px",
          fontSize: "20px",
        }}
      >
        {menuOptions.map((option) => {
          if (option.name === "Logout") {
            return (
              <button
                onClick={async () => {
                  if (option.name === "Logout") {
                    localStorage.removeItem("token");
                    localStorage.removeItem("role");
                    await navigate("/login");
                    toast.success("Logged out successfully.");
                  }
                }}
                style={{
                  fontSize: "20px",
                }}
                key={option.name}
                className="navbar-item"
              >
                {option.icon}
                {option.name}
              </button>
            );
          }

          if (option.showToAdmin && localStorage.getItem("role") !== "admin") {
            return null;
          }

          return (
            <Link key={option.name} to={option.link} className="navbar-item">
              {option.icon}
              {option.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default NavBar;
