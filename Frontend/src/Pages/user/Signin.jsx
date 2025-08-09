import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import { BsFillQuestionOctagonFill } from "react-icons/bs";
import { ButtonProvider } from '../../buttonContext';
import Button from '../../components/Button';
import Illustrator4 from '../../assets/illustrator4.png'
import { useNavigate } from 'react-router-dom';

const Signin = () => {

  const [inProgress, setinProgress] = useState(false)
  const navigate = useNavigate()
  const [isLogging, setIsLogging] = useState(false)

  let formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: (values) =>{
      setIsLogging(true)
      const url = 'http://localhost:5000/user/login'
      axios.post(url, values)
      .then((res) =>{
        console.log(res);
        if (res.data?.token) {
          localStorage.userToken = res.data.token;
          toast.success('User Account has Successfully Logged In!');
          setTimeout(() => {
            navigate('/dashboard/account');
          }, 2000);
        }else{
          toast.error(res.response.data.error || 'Login failed, please try again');
        }
      })
      .catch((err) =>{
        setIsLogging(false)
        console.log(err.response.data.error); 
        console.log();
        if(err.response.data.message==='Password is incorrect'){
          toast.error('Incorrect Passoword')     
        }
          
        toast.error(err.response.data.error)     
      })
      .finally(() => {
        setIsLogging(false)
      })
    },
    validationSchema: yup.object().shape({
      email: yup.string().required('This field is required').email('This is not a valid email address'),
      password: yup.string().required('This field is required').min(6, 'password must be at least 6 characters long'),
    })
    
  })
  return (
    <div className='loginPage w-full '>
      <div className='w-full'>
        <div className='w-full h-full flex flex-col justify-center items-center bg-white'>
          <div className='flex flex-col w-full h-full items-end gap-[2em]'>
            {/* for the form */}
            <div className='w-full h-full items-center justify-between'>
              <form onSubmit={formik.handleSubmit} action="">
                <div className='w-full flex flex-col gap-5'>
                  {/* for personal info */}
                  <div style={{paddingBottom: '30px'}} className='w-full grid border-b border-dashed border-black border-opacity-10 md:grid-cols-1 grid-rows-[auto]'>
                    {/* for firstname */}
                    <div className='flex flex-col gap-2'>
                      <small className='w-full flex items-center justify-between'>
                        <span>Email Address</span>
                        <BsFillQuestionOctagonFill className={formik.touched.firstname && formik.errors.firstname ? 'text-[red]' : 'text-zinc-400'} />
                      </small>
                      <input type="email" name='email' onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder='example@email.com' className='w-full border-1 border-[#D1D1D1]' style={{padding: '10px'}}/>
                      <p className='text-[red]'>{formik.touched.email && formik.errors.email}</p>
                    </div>

                    {/* for password 1 */}
                    <div className='flex flex-col gap-2'>
                      <small className='w-full flex items-center justify-between'>
                        <span>Password</span>
                        <BsFillQuestionOctagonFill className={formik.touched.firstname && formik.errors.firstname ? 'text-[red]' : 'text-zinc-400'} />
                      </small>
                      <input type="password" name='password' onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder='passord' className='w-full border-1 border-[#D1D1D1]' style={{padding: '10px'}}/>
                      <p className='text-[red]'>{formik.touched.password && formik.errors.password}</p>
                    </div>
                    <small className='coloredTxt'>Forgot Password</small>
                  </div>

                  {/* for registration action */}
                  <div style={{paddingBottom: '10px'}} className='w-full'>
                    <div className='text-right flex flex-col'>
                        <button style={{ padding: '10px 0px' }} className={`bg-[#FA8232] rounded-2 cursor-pointer text-white ${(!formik.isValid || !formik.dirty) ? 'cursor-not-allowed opacity-50 pointer-events-none' : ''}`} disabled={!formik.isValid || !formik.dirty} type='submit'>{isLogging ? 'SIGNING IS IN PROGRESS...' : 'SIGN IN'}</button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default Signin