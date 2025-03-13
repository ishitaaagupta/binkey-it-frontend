import React, { useState } from "react";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa6";
import toast from "react-hot-toast";
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import { Link, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Email is invalid").required("Email is required"),
    password: Yup.string().required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await Axios({
        ...SummaryApi.register,
        data: data
      });

      if (response.data.error) {
        toast.error(response.data.message);
      }

      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/login");
      }

    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section className="w-full container mx-auto px-2">
      <div className="bg-white my-4 w-full max-w-lg mx-auto rounded p-7">
        <p className="text-2xl text-center font-bold font-poppins">
          Register Yourself
        </p>

        <form className="grid gap-4 mt-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-1">
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Name"
                  variant="outlined"
                  error={!!errors.name}
                  helperText={errors.name ? errors.name.message : ""}
                  InputLabelProps={{
                    style: { color: '#1F2937' }, // Green-800 color for label
                  }}
                  InputProps={{
                    style: { backgroundColor: 'transparent' }, // No fill color
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: '#FFD700', // Yellow outline color
                      },
                      '&:hover fieldset': {
                        borderColor: '#FFD700', // Yellow outline on hover
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#FFD700', // Yellow outline when focused
                      },
                    },
                  }}
                  fullWidth
                />
              )}
            />
          </div>
          <div className="grid gap-1">
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Email"
                  variant="outlined"
                  error={!!errors.email}
                  helperText={errors.email ? errors.email.message : ""}
                  InputLabelProps={{
                    style: { color: '#1F2937' }, // Green-800 color for label
                  }}
                  InputProps={{
                    style: { backgroundColor: 'transparent' }, // No fill color
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: '#FFD700', // Yellow outline color
                      },
                      '&:hover fieldset': {
                        borderColor: '#FFD700', // Yellow outline on hover
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#FFD700', // Yellow outline when focused
                      },
                    },
                  }}
                  fullWidth
                />
              )}
            />
          </div>
          <div className="grid gap-1">
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  variant="outlined"
                  error={!!errors.password}
                  helperText={errors.password ? errors.password.message : ""}
                  InputLabelProps={{
                    style: { color: '#1F2937' }, // Green-800 color for label
                  }}
                  InputProps={{
                    style: { backgroundColor: 'transparent' }, // No fill color
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword((prev) => !prev)}
                        >
                          {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: '#FFD700', // Yellow outline color
                      },
                      '&:hover fieldset': {
                        borderColor: '#FFD700', // Yellow outline on hover
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#FFD700', // Yellow outline when focused
                      },
                    },
                  }}
                  fullWidth
                />
              )}
            />
          </div>
          <div className="grid gap-1">
            <Controller
              name="confirmPassword"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Confirm Password"
                  type={showConfirmPassword ? "text" : "password"}
                  variant="outlined"
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword ? errors.confirmPassword.message : ""}
                  InputLabelProps={{
                    style: { color: '#1F2937' }, // Green-800 color for label
                  }}
                  InputProps={{
                    style: { backgroundColor: 'transparent' }, // No fill color
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowConfirmPassword((prev) => !prev)}
                        >
                          {showConfirmPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: '#FFD700', // Yellow outline color
                      },
                      '&:hover fieldset': {
                        borderColor: '#FFD700', // Yellow outline on hover
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#FFD700', // Yellow outline when focused
                      },
                    },
                  }}
                  fullWidth
                />
              )}
            />
          </div>

          <button
            type="submit"
            className={` ${
              Object.values(errors).length === 0 ? "bg-green-800 hover:bg-green-700" : "bg-gray-500"
            } text-white py-2 rounded font-semibold my-3 tracking-wide`}
            disabled={Object.values(errors).length > 0}
          >
            Register
          </button>
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

export default Register;