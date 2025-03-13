import React, { useEffect, useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SummaryApi from '../common/SummaryApi';
import toast from 'react-hot-toast';
import AxiosToastError from '../utils/AxiosToastError';
import Axios from '../utils/Axios';
import { TextField, InputAdornment, IconButton } from '@mui/material';

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateValue = Object.values(data).every(el => el);

  useEffect(() => {
    if (!(location?.state?.data?.success)) {
      navigate("/");
    }

    if (location?.state?.email) {
      setData(prev => ({
        ...prev,
        email: location?.state?.email
      }));
    }
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(prev => ({
      ...prev,
      [name]: value
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (data.newPassword !== data.confirmPassword) {
      toast.error("New password and confirm password must be the same.");
      return;
    }

    try {
      const response = await Axios({
        ...SummaryApi.resetPassword,
        data: data
      });

      if (response.data.error) {
        toast.error(response.data.message);
      }

      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/login");
        setData({
          email: "",
          newPassword: "",
          confirmPassword: ""
        });
      }

    } catch (error) {
      AxiosToastError(error);
    }
  }

  return (
    <section className='w-full container mx-auto px-2'>
      <div className='bg-white my-4 w-full max-w-lg mx-auto rounded p-7'>
        <p className='font-semibold text-lg'>Enter Your Password</p>
        <form className='grid gap-4 py-4' onSubmit={handleSubmit}>

          <TextField
            variant="outlined"
            label="New Password "
            type={showPassword ? "text" : "password"}
            name="newPassword"
            value={data.newPassword}
            onChange={handleChange}
            placeholder='Enter your new password'
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(prev => !prev)}>
                    {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
                "& label": { color: "#166534" }, // green-800 in Tailwind
                "& label.Mui-focused": { color: "#166534" }, 
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'yellow', // Yellow outline
                },
                '&:hover fieldset': {
                  borderColor: 'yellow', // Yellow on hover
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'yellow', // Yellow when focused
                },
              },
            }}
          />

          <TextField
            variant="outlined"
            label="Confirm Password"
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            value={data.confirmPassword}
            onChange={handleChange}
            placeholder='Enter your confirm password'
            error={data.newPassword && data.newPassword !== data.confirmPassword}
            helperText={data.newPassword && data.newPassword !== data.confirmPassword ? "Passwords must match" : ""}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowConfirmPassword(prev => !prev)}>
                    {showConfirmPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
                "& label": { color: "#166534" }, // green-800 in Tailwind
                "& label.Mui-focused": { color: "#166534" }, 
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: (data.newPassword && data.newPassword !== data.confirmPassword) ? 'red' : 'yellow', // Yellow outline or red if there's an error
                },
                '&:hover fieldset': {
                  borderColor: 'yellow', // Yellow on hover
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'yellow', // Yellow when focused
                },
              },
            }}
          />

          <button
            disabled={!validateValue}
            className={`${validateValue ? "bg-green-800 hover:bg-green-700" : "bg-gray-500"} text-white py-2 rounded font-semibold my-3 tracking-wide`}
          >
            Change Password
          </button>

        </form>

        <p>
          Already have an account? <Link to={"/login"} className='font-semibold text-green-700 hover:text-green-800'>Login</Link>
        </p>
      </div>
    </section>
  );
}

export default ResetPassword;