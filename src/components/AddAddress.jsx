import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import toast from 'react-hot-toast';
import AxiosToastError from '../utils/AxiosToastError';
import { IoClose } from 'react-icons/io5';
import { useGlobalContext } from '../provider/GlobalProvider';
import { motion } from 'framer-motion';
import { TextField, Button } from '@mui/material';

const schema = yup.object().shape({
    addressline: yup.string().required('Address Line is required'),
    city: yup.string().required('City is required'),
    state: yup.string().required('State is required'),
    pincode: yup.string().max(6, 'Pincode must be 6 digits').required('Pincode is required'),
    country: yup.string().required('Country is required'),
    mobile: yup.string()
        .matches(/^\d{10}$/, 'Mobile number must be exactly 10 digits')
        .required('Mobile number is required'),
});

const AddAddress = ({ close }) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: { mobile: '' }
    });
    const { fetchAddress } = useGlobalContext();

   
    const onSubmit = async (data) => {
        try {
            const addressData = {
                address_line: data.addressline,
                city: data.city,
                state: data.state,
                country: data.country,
                pincode: data.pincode,
                mobile: Number(data.mobile),
            };
            
            sessionStorage.setItem('address', JSON.stringify(addressData));
            
            const response = await Axios({
                ...SummaryApi.createAddress,
                data: addressData,
            });

            const { data: responseData } = response;
            if (responseData.success) {
                toast.success(responseData.message);
                if (close) {
                    close();
                    reset();
                    fetchAddress();
                }
            }
        } catch (error) {
            AxiosToastError(error);
        }
    };
    return (
        <section className='fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50'>
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className='bg-white p-6 w-full max-w-lg rounded-lg shadow-lg'>
                <div className='flex justify-between items-center'>
                    <h2 className='text-lg font-semibold'>Add Address</h2>
                    <button onClick={close} className='text-gray-600 hover:text-red-500 transition'>
                        <IoClose size={24} />
                    </button>
                </div>
                <form className='mt-4 grid gap-4' onSubmit={handleSubmit(onSubmit)}>
                    {['addressline', 'city', 'state', 'pincode', 'country', 'mobile'].map((field) => (
                        <TextField 
                            key={field}
                            id={field}
                            label={field.replace('_', ' ')}
                            variant='outlined'
                            fullWidth
                            {...register(field)}
                            error={!!errors[field]}
                            helperText={errors[field]?.message}
                            InputLabelProps={{ shrink: true }}
                            inputProps={{
                                ...(field === 'mobile' && { maxLength: 10 }),
                                ...(field === 'pincode' && { maxLength: 6 })
                              }}
                        />
                    ))}
                   <button type='submit' className='bg-primary-200 w-full  py-2 font-semibold mt-4 hover:bg-primary-100'>Submit</button>
                </form>
            </motion.div>
        </section>
    );
};

export default AddAddress;