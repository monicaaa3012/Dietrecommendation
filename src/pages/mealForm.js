import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { baseUrl } from "../constants";
import NavBar from "../components/navbar/navbar"; // Ensure this path is correct

const MealForm = () => {
  const [mealDetails, setMealDetails] = useState({
    meal_name: "",
    calories: "",
    protein: "",
    carbs: "",
    fats: "",
    meal_type: "",
  });

  const [meals, setMeals] = useState([]);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMealDetails({ ...mealDetails, [name]: value });
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
      Object.entries(mealDetails).forEach(([key, value]) => {
        formData.append(key, value);
      });

      let response = await fetch(`${baseUrl}/meals/add_meal.php`, {
        method: "POST",
        body: formData,
      });
      let result = await response.json();

      if (result.success) {
        toast.success(result.message);
        fetchMeals(); // Reload the meal data
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred. Please try again.");
    }
  };

  const fetchMeals = async () => {
    try {
      const response = await fetch(`${baseUrl}/meals/get_meals.php`);
      const data = await response.json();
      setMeals(data);
    } catch (error) {
      toast.error("Error fetching meals.");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMeals(); // Fetch meals when the component mounts
  }, []);

  return (
    <div style={{ width: "100%", minHeight: "100vh", backgroundColor: "#f0f0f0" }}>
      <NavBar /> {/* NavBar included at the top */}

      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          marginTop: "20px", // Added space below NavBar
        }}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            maxWidth: "400px", // Reduced width of the form
            width: "100%",
            padding: "15px",
            backgroundColor: "#fff",
            borderRadius: "10px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h1 style={{ textAlign: "center", color: "var(--primary-color)", marginBottom: "15px" }}>
            Add a Meal
          </h1>

          <input
            className="input"
            type="text"
            name="meal_name"
            placeholder="Meal Name"
            value={mealDetails.meal_name}
            onChange={handleChange}
            required
            style={{ width: "100%", marginBottom: "10px", padding: "8px", borderRadius: "5px" }}
          />

          <input
            className="input"
            type="number"
            name="calories"
            placeholder="Calories"
            value={mealDetails.calories}
            onChange={handleChange}
            required
            style={{ width: "100%", marginBottom: "10px", padding: "8px", borderRadius: "5px" }}
          />

          <input
            className="input"
            type="number"
            name="protein"
            placeholder="Protein (g)"
            value={mealDetails.protein}
            onChange={handleChange}
            required
            style={{ width: "100%", marginBottom: "10px", padding: "8px", borderRadius: "5px" }}
          />

          <input
            className="input"
            type="number"
            name="carbs"
            placeholder="Carbs (g)"
            value={mealDetails.carbs}
            onChange={handleChange}
            required
            style={{ width: "100%", marginBottom: "10px", padding: "8px", borderRadius: "5px" }}
          />

          <input
            className="input"
            type="number"
            name="fats"
            placeholder="Fats (g)"
            value={mealDetails.fats}
            onChange={handleChange}
            required
            style={{ width: "100%", marginBottom: "10px", padding: "8px", borderRadius: "5px" }}
          />

          <select
            className="input"
            name="meal_type"
            value={mealDetails.meal_type}
            onChange={handleChange}
            required
            style={{ width: "100%", marginBottom: "15px", padding: "8px", borderRadius: "5px" }}
          >
            <option value="">Select Meal Type</option>
            <option value="Breakfast">Breakfast</option>
            <option value="Lunch">Lunch</option>
            <option value="Dinner">Dinner</option>
            <option value="Snack">Snack</option>
          </select>

          <button
            className="button"
            type="submit"
            style={{
              width: "100%", // Ensures button takes up full width
              padding: "10px",
              backgroundColor: "var(--primary-color)",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Add Meal
          </button>
        </form>
      </div>

      <div style={{ marginTop: "40px", width: "80%" }}>
        <h2 style={{ textAlign: "center", color: "var(--primary-color)" }}>Meals List</h2>

        <table
          style={{
            width: "100%",
            marginTop: "20px",
            borderCollapse: "collapse",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          <thead>
            <tr>
              <th style={{ padding: "10px", textAlign: "left", backgroundColor: "#f5f5f5" }}>Meal Name</th>
              <th style={{ padding: "10px", textAlign: "left", backgroundColor: "#f5f5f5" }}>Calories</th>
              <th style={{ padding: "10px", textAlign: "left", backgroundColor: "#f5f5f5" }}>Protein (g)</th>
              <th style={{ padding: "10px", textAlign: "left", backgroundColor: "#f5f5f5" }}>Carbs (g)</th>
              <th style={{ padding: "10px", textAlign: "left", backgroundColor: "#f5f5f5" }}>Fats (g)</th>
              <th style={{ padding: "10px", textAlign: "left", backgroundColor: "#f5f5f5" }}>Meal Type</th>
            </tr>
          </thead>
          <tbody>
            {meals.map((meal) => (
              <tr key={meal.meal_id}>
                <td style={{ padding: "10px" }}>{meal.meal_name}</td>
                <td style={{ padding: "10px" }}>{meal.calories}</td>
                <td style={{ padding: "10px" }}>{meal.protein}</td>
                <td style={{ padding: "10px" }}>{meal.carbs}</td>
                <td style={{ padding: "10px" }}>{meal.fats}</td>
                <td style={{ padding: "10px" }}>{meal.meal_type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MealForm;
