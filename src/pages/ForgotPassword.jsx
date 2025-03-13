import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa6";
import toast from "react-hot-toast";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";

const ForgotPassword = () => {
  const [data, setData] = useState({
    email: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateValue = Object.values(data).every((el) => el);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await Axios({
        ...SummaryApi.forgot_password,
        data: data,
      });

      if (response.data.error) {
        toast.error(response.data.message);
      }

      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/verification-otp", {
          state: data,
        });
        setData({
          email: "",
        });
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section className="w-full container mx-auto px-2">
      <div className="bg-white my-4 w-full max-w-lg mx-auto rounded p-7">
        <p className="font-semibold text-lg">Forgot Password</p>
        <form className="grid gap-4 py-4" onSubmit={handleSubmit}>
          <div className="grid gap-1">
            <TextField
              label="Email"
              variant="outlined"
              id="email"
              name="email"
              value={data.email}
              onChange={handleChange}
              placeholder="Enter your email"
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "yellow", // Set the border color to yellow
                  },
                  "&:hover fieldset": {
                    borderColor: "yellow", // Keep yellow on hover
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "yellow", // Keep yellow on focus
                  },
                },
                "& .MuiInputLabel-outlined": {
                  color: "green", // Set label color to green
                },
                "& .MuiInputLabel-outlined.Mui-focused": {
                  color: "green", // Set focused label color to green
                },
              }}
            />
          </div>

          <Button
            type="submit"
            disabled={!validateValue}
            variant="contained"
            sx={{
              backgroundColor: validateValue ? "green" : "gray",
              color: "white",
              my: 3,
              "&:hover": {
                backgroundColor: validateValue ? "darkgreen" : "gray",
              },
            }}
          >
            Send Otp
          </Button>
        </form>

        <p>
          Already have an account?{" "}
          <Link
            to={"/login"}
            className="font-semibold text-green-700 hover:text-green-800"
          >
            Login
          </Link>
        </p>
      </div>
    </section>
  );
};

export default ForgotPassword;