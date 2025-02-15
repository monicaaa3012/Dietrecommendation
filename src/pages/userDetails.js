import React, { useState } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { baseUrl } from "../constants";

const UserDetails = () => {
  const [details, setDetails] = useState({
    height: "",
    weight: "",
    sex: "",
    age: "",
    activity_level: "",
    goal: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails({ ...details, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userId = localStorage.getItem("user_id");
      if (!userId) {
        toast.error("User not logged in!");
        navigate("/login");
        return;
      }

      let formData = new FormData();
      formData.append("user_id", userId);
      Object.entries(details).forEach(([key, value]) => {
        formData.append(key, value);
      });

      let response = await fetch(`${baseUrl}/auth/update_user.php`, {
        method: "POST",
        body: formData,
      });
      let result = await response.json();

      if (result.success) {
        toast.success(result.message);
        navigate("/home");
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh", // Full viewport height
        backgroundColor: "#f0f0f0",
      }}
    >
    <form
      onSubmit={handleSubmit}
      style={{
        maxWidth: "400px",
        margin: "0 auto",
        padding: "20px",
        backgroundColor: "#f9f9f9",
        borderRadius: "10px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          color: "var(--primary-color)",
          marginBottom: "20px",
        }}
      >
        Complete Your Profile
      </h1>
      <input
        className="input"
        type="number"
        name="height"
        placeholder="Height (cm)"
        value={details.height}
        onChange={handleChange}
        required
      />
      <input
        className="input"
        type="number"
        name="weight"
        placeholder="Weight (kg)"
        value={details.weight}
        onChange={handleChange}
        required
      />
      <select
        className="input"
        name="sex"
        value={details.sex}
        onChange={handleChange}
        required
      >
        <option value="">Select Sex</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>
      <input
        className="input"
        type="number"
        name="age"
        placeholder="Age"
        value={details.age}
        onChange={handleChange}
        required
      />
      <select
        className="input"
        name="activity_level"
        value={details.activity_level}
        onChange={handleChange}
        required
      >
        <option value="">Select Activity Level</option>
        <option value="Sedentary">Sedentary</option>
        <option value="Moderately Active">Moderately Active</option>
        <option value="Active">Active</option>
      </select>
      <select
        className="input"
        name="goal"
        value={details.goal}
        onChange={handleChange}
        required
      >
        <option value="">Select Goal</option>
        <option value="Weight Loss">Weight Loss</option>
        <option value="Maintain Weight">Maintain Weight</option>
        <option value="Weight Gain">Weight Gain</option>
      </select>
      <button className="button" type="submit" style={{ marginTop: "10px" }}>
        Save Details
      </button>
    </form>
    </div>
    
  );
};

export default UserDetails;
