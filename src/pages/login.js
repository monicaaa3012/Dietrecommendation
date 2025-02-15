import {Link, useNavigate} from "react-router";
import Logo from "../components/logo";
import {useState} from "react";
import toast from "react-hot-toast";
import {baseUrl} from "../constants";

const Login = () => {
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      let formData = new FormData();
      formData.append("email", userDetails.email);
      formData.append("password", userDetails.password);

      let response = await fetch(`${baseUrl}/auth/login.php`, {
        method: "POST",
        body: formData,
      });
      let result = await response.json();
      if (result["success"]) {
        toast.success(result.message);
        localStorage.setItem("user_id", result.user.user_id);
        localStorage.setItem("token", result.token);
        localStorage.setItem("role", result.role);
        const { height, weight, sex, age, activity_level, goal } = result.user;
        if (!height || !weight || !sex || !age || !activity_level || !goal) {
          navigate("/details"); 
      }else { navigate("/home");
      }
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred. Please try again.");
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
              flex:0,
            }}
          >
            {/* <img
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
              src="/images/login-bg.png"
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
                {"Welcome, Back"}
              </span>
              <input
                required
                className="input"
                type="email"
                placeholder="Enter your email"
                onChange={(e) =>
                  setUserDetails({...userDetails, email: e.target.value})
                }
                value={userDetails.email}
              ></input>
              <input
                required
                className="input"
                type="password"
                placeholder="Enter your password"
                onChange={(e) =>
                  setUserDetails({...userDetails, password: e.target.value})
                }
              ></input>
              <button className="button" type="submit">
                {"LOGIN"}
              </button>
              <span
                style={{
                  display: "flex",
                  gap: "5px",
                }}
              >
                {"Don't have an account?"}

                <Link to="/sign-up" style={{color: "blue", cursor: "pointer"}}>
                  {"Sign Up"}
                </Link>
              </span>
            </div>
          </div>
        </div>
      </form>
      
    </>
  );
};

export default Login;
