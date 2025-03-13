import React, { useState } from 'react';
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa6";
import toast from 'react-hot-toast';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import { Link, useNavigate } from 'react-router-dom';
import fetchUserDetails from '../utils/fetchUserDetails';
import { useDispatch } from 'react-redux';
import { setUserDetails } from '../store/userSlice';
import { TextField, InputAdornment, IconButton } from "@mui/material";

const Login = () => {
    const [data, setData] = useState({
        email: "",
        password: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { name, value } = e.target;

        setData((prev) => {
            return {
                ...prev,
                [name]: value
            };
        });
    };

    const valideValue = Object.values(data).every(el => el);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await Axios({
                ...SummaryApi.login,
                data: data
            });

            if (response.data.error) {
                toast.error(response.data.message);
            }

            if (response.data.success) {
                toast.success(response.data.message);
                localStorage.setItem('accesstoken', response.data.data.accesstoken);
                localStorage.setItem('refreshToken', response.data.data.refreshToken);

                const userDetails = await fetchUserDetails();
                dispatch(setUserDetails(userDetails.data));

                setData({
                    email: "",
                    password: "",
                });
                navigate("/");
            }

        } catch (error) {
            AxiosToastError(error);
        }
    };

    return (
        <section className='w-full container mx-auto px-2'>
            <div className='bg-white my-4 w-full max-w-lg mx-auto rounded p-7'>
                <form className='grid gap-4 py-4' onSubmit={handleSubmit}>
                    <div className='grid gap-1'>
                        <TextField
                            label="Email"
                            type="email"
                            variant="outlined"
                            error={!data.email && !valideValue}
                            helperText={!data.email && !valideValue ? "Email is required" : ""}
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
                            name="email"
                            value={data.email}
                            onChange={handleChange}
                            placeholder='Enter your email'
                        />
                    </div>
                    <div className='grid gap-1'>
                        <TextField
                            label="Password"
                            type={showPassword ? "text" : "password"}
                            variant="outlined"
                            error={!data.password && !valideValue}
                            helperText={!data.password && !valideValue ? "Password is required" : ""}
                            InputLabelProps={{
                                style: { color: '#1F2937' }, // Green-800 color for label
                            }}
                            InputProps={{
                                style: { backgroundColor: 'transparent' }, // No fill color
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setShowPassword(prev => !prev)}
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
                            name="password"
                            value={data.password}
                            onChange={handleChange}
                            placeholder='Enter your password'
                        />
                        <Link to={"/forgot-password"} className='block ml-auto hover:text-primary-200'>Forgot password?</Link>
                    </div>

                    <button disabled={!valideValue} className={` ${valideValue ? "bg-green-800 hover:bg-green-700" : "bg-gray-500"} text-white py-2 rounded font-semibold my-3 tracking-wide`}>
                        Login
                    </button>
                </form>

                <p>
                    Don't have an account? <Link to={"/register"} className='font-semibold text-green-700 hover:text-green-800'>Register</Link>
                </p>
            </div>
        </section>
    );
};

export default Login;