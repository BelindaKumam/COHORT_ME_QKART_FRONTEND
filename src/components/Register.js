import { Button, CircularProgress, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { config } from "../App";
import Footer from "./Footer";
import Header from "./Header";
import "./Register.css";
// CRIO_SOLUTION_AND_STUB_START_MODULE_LOGIN
import { useHistory, Link } from "react-router-dom";
// CRIO_SOLUTION_AND_STUB_END_MODULE_LOGIN

const Register = () => {
  const { enqueueSnackbar } = useSnackbar();
  // CRIO_SOLUTION_START_MODULE_LOGIN
  const history = useHistory();
  // CRIO_SOLUTION_END_MODULE_LOGIN
  // CRIO_SOLUTION_START_MODULE_REGISTER
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  // CRIO_SOLUTION_END_MODULE_REGISTER

  // CRIO_SOLUTION_START_MODULE_REGISTER
  const handleInput = (e) => {
    const [key, value] = [e.target.name, e.target.value];
    setFormData((nextFormData) => ({ ...nextFormData, [key]: value }));
  };
  // CRIO_SOLUTION_END_MODULE_REGISTER

  // TODO: CRIO_TASK_MODULE_REGISTER - Implement the register function
  /**
   * Definition for register handler
   * - Function to be called when the user clicks on the register button or submits the register form
   *
   * @param {{ username: string, password: string, confirmPassword: string }} formData
   *  Object with values of username, password and confirm password user entered to register
   *
   * API endpoint - "POST /auth/register"
   *
   * Example for successful response from backend for the API call:
   * HTTP 201
   * {
   *      "success": true,
   * }
   *
   * Example for failed response from backend for the API call:
   * HTTP 400
   * {
   *      "success": false,
   *      "message": "Username is already taken"
   * }
   */
  const register = async (formData) => {
    // CRIO_SOLUTION_START_MODULE_REGISTER
    if (!validateInput(formData)) return;
    try {
      setLoading(true);
      await axios.post(`${config.endpoint}/auth/register`, {
        username: formData.username,
        password: formData.password,
      });
      setLoading(false);
      setFormData({
        username: "",
        password: "",
        confirmPassword: "",
      });
      enqueueSnackbar("Registered Successfully", { variant: "success" });
      // CRIO_SOLUTION_END_MODULE_REGISTER
      // CRIO_SOLUTION_START_MODULE_LOGIN
      history.push("/login");
      // CRIO_SOLUTION_END_MODULE_LOGIN
      // CRIO_SOLUTION_START_MODULE_REGISTER
    } catch (e) {
      setLoading(false);
      if (e.response && e.response.status === 400) {
        enqueueSnackbar(e.response.data.message, { variant: "error" });
      } else {
        enqueueSnackbar(
          "Something went wrong. Check that the backend is running, reachable and returns valid JSON.",
          { variant: "error" }
        );
      }
    }
    // CRIO_SOLUTION_END_MODULE_REGISTER
  };

  // TODO: CRIO_TASK_MODULE_REGISTER - Implement user input validation logic
  /**
   * Validate the input values so that any bad or illegal values are not passed to the backend.
   *
   * @param {{ username: string, password: string, confirmPassword: string }} data
   *  Object with values of username, password and confirm password user entered to register
   *
   * @returns {boolean}
   *    Whether validation has passed or not
   *
   * Return false if any validation condition fails, otherwise return true.
   * (NOTE: The error messages to be shown for each of these cases, are given with them)
   * -    Check that username field is not an empty value - "Username is a required field"
   * -    Check that username field is not less than 6 characters in length - "Username must be at least 6 characters"
   * -    Check that password field is not an empty value - "Password is a required field"
   * -    Check that password field is not less than 6 characters in length - "Password must be at least 6 characters"
   * -    Check that confirmPassword field has the same value as password field - Passwords do not match
   */
  const validateInput = (data) => {
    // CRIO_SOLUTION_START_MODULE_REGISTER
    if (!data.username) {
      enqueueSnackbar("Username is a required field", { variant: "warning" });
      return false;
    }
    if (data.username.length < 6) {
      enqueueSnackbar("Username must be at least 6 characters", {
        variant: "warning",
      });
      return false;
    }
    if (!data.password) {
      enqueueSnackbar("Password is a required field", { variant: "warning" });
      return false;
    }
    if (data.password.length < 6) {
      enqueueSnackbar("Password must be at least 6 characters", {
        variant: "warning",
      });
      return false;
    }
    if (data.password !== data.confirmPassword) {
      enqueueSnackbar("Passwords do not match", { variant: "warning" });
      return false;
    }
    return true;
    // CRIO_SOLUTION_END_MODULE_REGISTER
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      minHeight="100vh"
    >
      <Header hasHiddenAuthButtons />
      <Box className="content">
        <Stack spacing={2} className="form">
          <h2 className="title">Register</h2>
          <TextField
            id="username"
            label="Username"
            variant="outlined"
            title="Username"
            name="username"
            placeholder="Enter Username"
            fullWidth
            // CRIO_SOLUTION_START_MODULE_REGISTER
            value={formData.username}
            onChange={handleInput}
            // CRIO_SOLUTION_END_MODULE_REGISTER
          />
          <TextField
            id="password"
            variant="outlined"
            label="Password"
            name="password"
            type="password"
            helperText="Password must be atleast 6 characters length"
            fullWidth
            placeholder="Enter a password with minimum 6 characters"
            // CRIO_SOLUTION_START_MODULE_REGISTER
            value={formData.password}
            onChange={handleInput}
            // CRIO_SOLUTION_END_MODULE_REGISTER
          />
          <TextField
            id="confirmPassword"
            variant="outlined"
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            fullWidth
            // CRIO_SOLUTION_START_MODULE_REGISTER
            placeholder="Re-enter your password to confirm"
            value={formData.confirmPassword}
            onChange={handleInput}
            // CRIO_SOLUTION_END_MODULE_REGISTER
          />
          {/* CRIO_UNCOMMENT_START_MODULE_REGISTER
          // <Button className="button" variant="contained">
          //  Register Now
          // </Button>
          {/* CRIO_UNCOMMENT_END_MODULE_REGISTER */}
          {/* CRIO_SOLUTION_START_MODULE_REGISTER */}
          {loading ? (
            <Box display="flex" justifyContent="center" alignItems="center">
              <CircularProgress size={25} color="primary" />
            </Box>
          ) : (
            <Button
              className="button"
              variant="contained"
              onClick={() => register(formData)}
            >
              Register Now
            </Button>
          )}
          {/* CRIO_SOLUTION_END_MODULE_REGISTER */}
          <p className="secondary-action">
            Already have an account?{" "}
            {/* CRIO_UNCOMMENT_START_MODULE_REGISTER
            // <a className="link" href="#">
            //  Login here
            // </a>
            {/* CRIO_UNCOMMENT_END_MODULE_REGISTER */}
            {/* CRIO_SOLUTION_START_MODULE_REGISTER */}
            <Link className="link" to="/login">Login here</Link>
            {/* CRIO_SOLUTION_END_MODULE_REGISTER */}
          </p>
        </Stack>
      </Box>
      <Footer />
    </Box>
  );
};

export default Register;
