import {Link} from "react-router";

const Logo = () => {
  return (
    <Link to="/" style={{textDecoration: "none"}}>
      <span
        style={{
          fontSize: "36px",
          fontWeight: "bold",
          color: "var(--primary-color)",
        }}
      >
        {"Dietry"}
      </span>
    </Link>
  );
};

export default Logo;
