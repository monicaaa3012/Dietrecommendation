import {Link, useNavigate} from "react-router";
import Logo from "../components/logo";
import {useState} from "react";
import {baseUrl} from "../constants";
import toast from "react-hot-toast";

const Register = () => {
  const [userDetails, setUserDetails] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      let formData = new FormData();
      formData.append("fullName", userDetails.fullName);
      formData.append("email", userDetails.email);
      formData.append("password", userDetails.password);

      let response = await fetch(`${baseUrl}/auth/register.php`, {
        method: "POST",
        body: formData,
      });
      let result = await response.json();
      if (result.success) {
        toast.success(result.message);
        navigate("/login");
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <div
          style={{
            height: "100vh",
            display: "flex",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              flex: 0,
            }}
          >
            {/* <img
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
              src="/images/register-bg.jpg"
              alt="logo"
            /> */}
          </div>

          <div
            style={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "100vh",
                gap: "20px",
              }}
            >
              <Logo />
              <span
                style={{
                  fontSize: "24px",
                  fontWeight: "bold",
                }}
              >
                {"Create an account"}
              </span>
              <input
                required
                value={userDetails.fullName}
                onChange={(e) =>
                  setUserDetails({...userDetails, fullName: e.target.value})
                }
                className="input"
                type="text"
                placeholder="Enter your Full Name"
              ></input>
              <input
                required
                value={userDetails.email}
                onChange={(e) =>
                  setUserDetails({...userDetails, email: e.target.value})
                }
                className="input"
                type="email"
                placeholder="Enter your email"
              ></input>
              <input
                required
                value={userDetails.password}
                onChange={(e) =>
                  setUserDetails({...userDetails, password: e.target.value})
                }
                className="input"
                type="password"
                placeholder="Enter your password"
              ></input>
              <button className="button" type="submit">
                {"REGISTER"}
              </button>
              <span
                style={{
                  display: "flex",
                  gap: "5px",
                }}
              >
                {"Already have an account?"}

                <Link to="/login" style={{color: "blue", cursor: "pointer"}}>
                  {"Login"}
                </Link>
              </span>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default Register;
