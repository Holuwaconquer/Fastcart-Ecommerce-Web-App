import React from 'react'
import { useContext } from 'react'
import { UserAccountContext } from './UserContext'
import { useEffect } from 'react'
import { useState } from 'react'
import { Country, State } from 'country-state-city'
import { useFormik } from 'formik'
import * as yup from 'yup'
import axios from 'axios'

const Settings = () => {

	const [countries, setCountries] = useState([])
	const [states, setStates] = useState([])
	const [selectedCountry, setSelectedCountry] = useState('')
	const [selectedBillingCountry, setSelectedBillingCountry] = useState('');
	const [selectedshippingCountry , setSelectedShippingCountry ] = useState('');
	const [billingstate, setBillingState] = useState([]);
	const [shippingstate, setShippingState] = useState([]);
	const { userData } = useContext(UserAccountContext)
	useEffect(() => {
		if (userData) {
			const countryList = Country.getAllCountries();
			setCountries(countryList);

			if (userData.country) {
				setSelectedCountry(userData.country);
				const stateList = State.getStatesOfCountry(userData.country);
				setStates(stateList);
			}
		}
	}, [userData])

	const handleCountry = (countryIsoCode) =>{
		setSelectedCountry(countryIsoCode)
		const stateList = State.getStatesOfCountry(countryIsoCode)
		setStates(stateList)
	}
	const handleBillingCountry = (countryIsoCode) => {
		setSelectedBillingCountry(countryIsoCode)
		const stateList = State.getStatesOfCountry(countryIsoCode)
		setBillingState(stateList)
	}
	const handleshippingCountry = (countryIsoCode) => {
		setSelectedShippingCountry(countryIsoCode)
		const stateList = State.getStatesOfCountry(countryIsoCode)
		setShippingState(stateList)
	}

	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			firstname: userData?.firstname || '',
			lastname: userData?.lastname || '',
			email: userData?.email || '',
			secondemail: userData?.secondemail || '',
			phonenumber: userData?.phonenumber || '',
			phonenumber2: userData?.phonenumber2 || '',
			country: userData?.country || '',
			state: userData?.state || '',
			zipcode: userData?.zipcode || '',
		},
		validationSchema: yup.object({
			firstname: yup.string().required('This field is required'),
			lastname: yup.string().required('This field is required'),
			email: yup.string().required('This field is required').email('This is not a valid email address'),
			secondemail: yup.string().email('This is not a valid email address'),
			phonenumber: yup.string(),
			phonenumber2: yup.string(),
			country: yup.string(),
			state: yup.string(),
			zipcode: yup.string(),
		}),
		onSubmit: (values) => {
			console.log(userData._id);
			axios.put(`http://localhost:5000/user/update/${userData._id}`, values)
			.then((res) => {
				console.log(res);
			})
			.catch((err) =>{
				console.log('cannot update user', err);
					
			})
		}
	})
	const billingformik = useFormik({
		enableReinitialize: true,
		initialValues: {
			billingfirstname: userData?.billingfirstname || '',
			billinglastname: userData?.billinglastname || '',
			billingemail: userData?.billingemail || '',
			billingphonenumber: userData?.billingphonenumber || '',
			billingcountry: userData?.billingcountry || '',
			billingstate: userData?.billingstate || '',
			billingcity: userData?.billingcity || '',
			billingzipcode: userData?.billingzipcode || '',
			billingcompanyname: userData?.billingcompanyname || '',
			billingaddress: userData?.billingaddress || '',
		},
		validationSchema: yup.object({
			billingfirstname: yup.string(),
			billinglastname: yup.string(),
			billingemail: yup.string().email('This is not a valid email address'),
			billingphonenumber: yup.string(),
			billingcountry: yup.string(),
			billingstate: yup.string(),
			billingzipcode: yup.string(),
			billingcity: yup.string(),
			billingcompanyname: yup.string(),
			billingaddress: yup.string(),
		}),
		onSubmit: (values) => {
			console.log(values);	
			axios.put(`http://localhost:5000/user/updateBilling/${userData._id}`, values)
			.then((res) => {
				console.log(res);
			})
			.catch((err) =>{
				console.log('cannot update user', err);	
			})
		}
	})
	const shippingformik = useFormik({
		enableReinitialize: true,
		initialValues: {
			shippingfirstname: userData?.shippingfirstname || '',
			shippinglastname: userData?.shippinglastname || '',
			shippingemail: userData?.shippingemail || '',
			shippingphonenumber: userData?.shippingphonenumber || '',
			shippingcountry: userData?.shippingcountry || '',
			shippingstate: userData?.shippingstate || '',
			shippingcity: userData?.shippingcity || '',
			shippingzipcode: userData?.shippingzipcode || '',
			shippingcompanyname: userData?.shippingcompanyname || '',
			shippingaddress: userData?.shippingaddress || '',
		},
		validationSchema: yup.object({
			shippingfirstname: yup.string(),
			shippinglastname: yup.string(),
			shippingemail: yup.string().email('This is not a valid email address'),
			shippingphonenumber: yup.string(),
			shippingcountry: yup.string(),
			shippingstate: yup.string(),
			shippingzipcode: yup.string(),
			shippingcity: yup.string(),
			shippingcompanyname: yup.string(),
			shippingaddress: yup.string(),
		}),
		onSubmit: (values) => {
			console.log(values);	
			axios.put(`http://localhost:5000/user/updateShipping/${userData._id}`, values)
			.then((res) => {
				console.log(res);
			})
			.catch((err) =>{
				console.log('cannot update user', err);	
			})
		}
	})
    

  return (
    <div className='w-full flex flex-col gap-4'>
		{/* for personal information setting */}
			<div className='border-1 border-[#E4E7E9] rounded-[4px] flex flex-col gap-4'>
				<h1 style={{padding: '10px 15px 10px'}} className='w-full border-b-1 font-bold border-[#E4E7E9] text-[14px] text-[#191C1F]'>ACCOUNT SETTING</h1>
				{userData ?
					<div style={{padding: '10px 15px'}} className='w-full flex flex-col gap-5'>
						<form action="" onSubmit={formik.handleSubmit}>
							<div className='w-full grid md:grid-cols-[1fr_6fr]'>
								{/* for profile image */}
								<div className='w-[176px] h-[176px] rounded-[50%]'>
									<img className='w-full h-full rounded-[50%] object-cover' src="https://github.githubassets.com/assets/quickdraw-default-39c6aec8ff89.png" alt="profile-image" />
								</div>
								{/* for personal information details */}
								<div className='w-full flex flex-col gap-5'>
										<div className='w-full grid md:grid-cols-2 grid-rows-auto gap-3'>
												{/* for first name */}
												<div className='w-full flex flex-col gap-1'>
														<small className='text-[14px] text-[#191C1F] font-bold'>Firstname</small>
														<input name='firstname' onChange={formik.handleChange} value={formik.values.firstname} type="text" className='border-1 border-[#E4E7E9] text-[#475156] text-[14px] rounded-[2px] focus:outline-0' style={{padding: '8px'}}/>
												</div>
												{/* for last name */}
												<div className='w-full flex flex-col gap-1'>
														<small className='text-[14px] text-[#191C1F] font-bold'>Lastname</small>
														<input name='lastname' onChange={formik.handleChange} value={formik.values.lastname} type="text" className='border-1 border-[#E4E7E9] text-[#475156] text-[14px] rounded-[2px] focus:outline-0' style={{padding: '8px'}}/>
												</div>
												{/* for email */}
												<div className='w-full flex flex-col gap-1'>
														<small className='text-[14px] text-[#191C1F] font-bold'>Email</small>
														<input name='email' onChange={formik.handleChange} value={formik.values.email} type="email" className='border-1 border-[#E4E7E9] text-[#475156] text-[14px] rounded-[2px] focus:outline-0' style={{padding: '8px'}}/>
												</div>
												{/* for phone number */}
												<div className='w-full flex flex-col gap-1'>
														<small className='text-[14px] text-[#191C1F] font-bold'>Phone number</small>
														<input name='phonenumber' onChange={formik.handleChange} value={formik.values.phonenumber} type="text" className='border-1 border-[#E4E7E9] text-[#475156] text-[14px] rounded-[2px] focus:outline-0' style={{padding: '8px'}}/>
												</div>
												{/* for secondary email */}
												<div className='w-full flex flex-col gap-1'>
														<small className='text-[14px] text-[#191C1F] font-bold'>Secondary Email</small>
														<input name='secondemail' onChange={formik.handleChange} value={formik.values.secondemail} type="text" className='border-1 border-[#E4E7E9] text-[#475156] text-[14px] rounded-[2px] focus:outline-0' style={{padding: '8px'}}/>
												</div>
												{/* for phone number2 */}
												<div className='w-full flex flex-col gap-1'>
														<small className='text-[14px] text-[#191C1F] font-bold'>Second Phone number</small>
														<input name='phonenumber2' onChange={formik.handleChange} value={formik.values.phonenumber2} type="text" className='border-1 border-[#E4E7E9] text-[#475156] text-[14px] rounded-[2px] focus:outline-0' style={{padding: '8px'}}/>
												</div>
										</div>
										{/* for country and state */}
										<div className='w-full grid md:grid-rows-auto grid-cols-[4fr_1fr_1fr] gap-2'>
												{/* for country */}
												<div className='w-full flex flex-col gap-1'>
														<small className='text-[14px] text-[#191C1F] font-bold'>Country</small>
														<select value={selectedCountry} 
														onChange={(e) => {
																const value = e.target.value;
																formik.setFieldValue('country', value);
																handleCountry(value);
														}} className='border-1 border-[#E4E7E9] text-[#475156] text-[14px] rounded-[2px] focus:outline-0' style={{padding: '8px'}} name="country">
																<option value="">Select Country</option>
																{countries.map((country) => (
																		<option key={country.isoCode} value={country.isoCode}>{country.name}</option>
																))}
																<option value=""></option>
														</select>
												</div>
												{/* for state */}
												<div className='w-full flex flex-col gap-1'>
														<small className='text-[14px] text-[#191C1F] font-bold'>State</small>
														<select 
																name="state" 
																className="border-1 border-[#E4E7E9] text-[#475156] text-[14px] rounded-[2px] focus:outline-0" 
																style={{padding: '8px'}}
																onChange={(e) => formik.setFieldValue('state', e.target.value)}
																>
																{!selectedCountry ? (
																		<option value="">Select a country first</option>
																) : states.length > 0 ? (
																		states.map((state) => (
																		<option key={state.isoCode} value={state.name}>{state.name}</option>
																		))
																) : (
																		<option value="">No states available</option>
																)}
														</select>

												</div>
												{/* for zip code */}
												<div className='w-full flex flex-col gap-1'>
														<small className='text-[14px] text-[#191C1F] font-bold'>Zip Code</small>
														<input name='zipcode' value={formik.values.zipcode} onChange={formik.handleChange} type="text" className='border-1 border-[#E4E7E9] text-[#475156] text-[14px] rounded-[2px] focus:outline-0' style={{padding: '8px'}}/>
												</div>
										</div>
										<div>
												<button type='submit' className='rounded-[2px] bg-[#FA8232] text-white font-bold cursor-pointer hover:bg-[#fa8232b6] active:bg-[#FA8232]' style={{padding: '15px'}}>SAVE CHANGES</button>
										</div>
								</div>
								{/* end of personal information details */}
							</div>
						</form>
					</div>
					: 
					<p>Loading</p>
				}
			</div>
			<div className='w-full grid md:grid-cols-2 grid-rows-auto gap-4'>
				{/* for billing address */}
				<div className='border-1 border-[#E4E7E9] rounded-[4px] flex flex-col gap-4'>
					<h1 style={{padding: '10px 15px 10px'}} className='w-full border-b-1 font-bold border-[#E4E7E9] text-[14px] text-[#191C1F]'>BILLING ADDRESS</h1>
					{userData ?
						<div style={{padding: '10px 15px'}} className='w-full flex flex-col gap-5'>
							<form action="" onSubmit={billingformik.handleSubmit}>
								<div className='w-full'>
									{/* for personal information details */}
									<div className='w-full flex flex-col gap-5'>
										<div className='w-full grid md:grid-cols-1 grid-rows-auto gap-3'>
											{/* for firstname and lastname in billing details */}
											<div className='w-full grid md:grid-cols-2 gap-4'>
												{/* for first name */}
												<div className='w-full flex flex-col gap-1'>
													<small className='text-[14px] text-[#191C1F] font-bold'>Firstname</small>
													<input name='billingfirstname' onChange={billingformik.handleChange} value={billingformik.values.billingfirstname} type="text" className='border-1 border-[#E4E7E9] text-[#475156] text-[14px] rounded-[2px] focus:outline-0' style={{padding: '8px'}}/>
												</div>
												{/* for last name */}
												<div className='w-full flex flex-col gap-1'>
													<small className='text-[14px] text-[#191C1F] font-bold'>Lastname</small>
													<input name='billinglastname' onChange={billingformik.handleChange} value={billingformik.values.billinglastname} type="text" className='border-1 border-[#E4E7E9] text-[#475156] text-[14px] rounded-[2px] focus:outline-0' style={{padding: '8px'}}/>
												</div>
											</div>
											{/* for billingcompanyname */}
											<div className='w-full flex flex-col gap-1'>
												<small className='text-[14px] text-[#191C1F] font-bold'>Company Name</small>
												<input name='billingcompanyname' onChange={billingformik.handleChange} value={billingformik.values.billingcompanyname} type="text" className='border-1 border-[#E4E7E9] text-[#475156] text-[14px] rounded-[2px] focus:outline-0' style={{padding: '8px'}}/>
											</div>
											{/* for billingaddress */}
											<div className='w-full flex flex-col gap-1'>
												<small className='text-[14px] text-[#191C1F] font-bold'>Address</small>
												<input name='billingaddress' onChange={billingformik.handleChange} value={billingformik.values.billingaddress} type="text" className='border-1 border-[#E4E7E9] text-[#475156] text-[14px] rounded-[2px] focus:outline-0' style={{padding: '8px'}}/>
											</div>
											{/* for country */}
											<div className='w-full flex flex-col gap-1'>
												<small className='text-[14px] text-[#191C1F] font-bold'>Country</small>
												<select value={selectedBillingCountry} 
												onChange={(e) => {
													const value = e.target.value;
													billingformik.setFieldValue('billingcountry', value);
													handleBillingCountry(value);
												}} className='border-1 border-[#E4E7E9] text-[#475156] text-[14px] rounded-[2px] focus:outline-0' style={{padding: '8px'}} name="billingcountry">
													<option value="">Select Country</option>
													{countries.map((country) => (
														<option key={country.isoCode} value={country.isoCode}>{country.name}</option>
													))}
													<option value=""></option>
												</select>
											</div>
											{/* for state */}
											<div className='w-full flex flex-col gap-1'>
												<small className='text-[14px] text-[#191C1F] font-bold'>State</small>
												<select 
													name="billingstate" 
													className="border-1 border-[#E4E7E9] text-[#475156] text-[14px] rounded-[2px] focus:outline-0" 
													style={{padding: '8px'}}
													onChange={(e) => billingformik.setFieldValue('billingstate', e.target.value)}
													>
													{!selectedBillingCountry ? (
														<option value="">Select a country first</option>
													) : billingstate.length > 0 ? (
														billingstate.map((state) => (
														<option key={state.isoCode} value={state.name}>{state.name}</option>
														))
													) : (
														<option value="">No states available</option>
													)}
												</select>
											</div>
											{/* for city and zipcode */}
											<div className='w-full grid md:grid-cols-2 gap-4'>
													{/* for billingcity */}
													<div className='w-full flex flex-col gap-1'>    
														<div className='w-full flex flex-col gap-1'>
															<small className='text-[14px] text-[#191C1F] font-bold'>City</small>
															<input name='billingcity' value={billingformik.values.billingcity} onChange={billingformik.handleChange} type="text" className='border-1 border-[#E4E7E9] text-[#475156] text-[14px] rounded-[2px] focus:outline-0' style={{padding: '8px'}}/>
														</div>
													</div>
													{/* for billingzipcode */}
													<div className='w-full flex flex-col gap-1'>    
														<div className='w-full flex flex-col gap-1'>
															<small className='text-[14px] text-[#191C1F] font-bold'>Zip Code</small>
															<input name='billingzipcode' value={billingformik.values.billingzipcode} onChange={billingformik.handleChange} type="text" className='border-1 border-[#E4E7E9] text-[#475156] text-[14px] rounded-[2px] focus:outline-0' style={{padding: '8px'}}/>
														</div>
													</div>
											</div>
											{/* for email */}
											<div className='w-full flex flex-col gap-1'>
												<small className='text-[14px] text-[#191C1F] font-bold'>Email</small>
												<input name='billingemail' onChange={billingformik.handleChange} value={billingformik.values.billingemail} type="email" className='border-1 border-[#E4E7E9] text-[#475156] text-[14px] rounded-[2px] focus:outline-0' style={{padding: '8px'}}/>
											</div>
											{/* for phone number */}
											<div className='w-full flex flex-col gap-1'>
												<small className='text-[14px] text-[#191C1F] font-bold'>Phone number</small>
												<input name='billingphonenumber' onChange={billingformik.handleChange} value={billingformik.values.billingphonenumber} type="text" className='border-1 border-[#E4E7E9] text-[#475156] text-[14px] rounded-[2px] focus:outline-0' style={{padding: '8px'}}/>
											</div>
										</div>
											
										<div>
											<button type='submit' className='rounded-[2px] bg-[#FA8232] text-white font-bold cursor-pointer hover:bg-[#fa8232b6] active:bg-[#FA8232]' style={{padding: '15px'}}>SAVE CHANGES</button>
										</div>
									</div>
										{/* end of personal information details */}
								</div>
							</form>
						</div>
						: 
						<p>Loading</p>
					}
				</div>
				{/* for shipping address */}
				<div className='border-1 border-[#E4E7E9] rounded-[4px] flex flex-col gap-4'>
					<h1 style={{padding: '10px 15px 10px'}} className='w-full border-b-1 font-bold border-[#E4E7E9] text-[14px] text-[#191C1F]'>BILLING ADDRESS</h1>
					{userData ?
						<div style={{padding: '10px 15px'}} className='w-full flex flex-col gap-5'>
							<form action="" onSubmit={shippingformik.handleSubmit}>
								<div className='w-full'>
									{/* for personal information details */}
									<div className='w-full flex flex-col gap-5'>
										<div className='w-full grid md:grid-cols-1 grid-rows-auto gap-3'>
											{/* for firstname and lastname in billing details */}
											<div className='w-full grid md:grid-cols-2 gap-4'>
												{/* for first name */}
												<div className='w-full flex flex-col gap-1'>
													<small className='text-[14px] text-[#191C1F] font-bold'>Firstname</small>
													<input name='shippingfirstname' onChange={shippingformik.handleChange} value={shippingformik.values.shippingfirstname} type="text" className='border-1 border-[#E4E7E9] text-[#475156] text-[14px] rounded-[2px] focus:outline-0' style={{padding: '8px'}}/>
												</div>
												{/* for last name */}
												<div className='w-full flex flex-col gap-1'>
													<small className='text-[14px] text-[#191C1F] font-bold'>Lastname</small>
													<input name='shippinglastname' onChange={shippingformik.handleChange} value={shippingformik.values.shippinglastname} type="text" className='border-1 border-[#E4E7E9] text-[#475156] text-[14px] rounded-[2px] focus:outline-0' style={{padding: '8px'}}/>
												</div>
											</div>
											{/* for shippingcompanyname */}
											<div className='w-full flex flex-col gap-1'>
												<small className='text-[14px] text-[#191C1F] font-bold'>Company Name</small>
												<input name='shippingcompanyname' onChange={shippingformik.handleChange} value={shippingformik.values.shippingcompanyname} type="text" className='border-1 border-[#E4E7E9] text-[#475156] text-[14px] rounded-[2px] focus:outline-0' style={{padding: '8px'}}/>
											</div>
											{/* for shippingaddress */}
											<div className='w-full flex flex-col gap-1'>
												<small className='text-[14px] text-[#191C1F] font-bold'>Address</small>
												<input name='shippingaddress' onChange={shippingformik.handleChange} value={shippingformik.values.shippingaddress} type="text" className='border-1 border-[#E4E7E9] text-[#475156] text-[14px] rounded-[2px] focus:outline-0' style={{padding: '8px'}}/>
											</div>
											{/* for country */}
											<div className='w-full flex flex-col gap-1'>
												<small className='text-[14px] text-[#191C1F] font-bold'>Country</small>
												<select value={selectedshippingCountry} 
												onChange={(e) => {
													const value = e.target.value;
													shippingformik.setFieldValue('shippingcountry', value);
													handleshippingCountry(value);
												}} className='border-1 border-[#E4E7E9] text-[#475156] text-[14px] rounded-[2px] focus:outline-0' style={{padding: '8px'}} name="shippingcountry">
													<option value="">Select Country</option>
													{countries.map((country) => (
														<option key={country.isoCode} value={country.isoCode}>{country.name}</option>
													))}
													<option value=""></option>
												</select>
											</div>
											{/* for state */}
											<div className='w-full flex flex-col gap-1'>
												<small className='text-[14px] text-[#191C1F] font-bold'>State</small>
												<select 
													name="shippingstate" 
													className="border-1 border-[#E4E7E9] text-[#475156] text-[14px] rounded-[2px] focus:outline-0" 
													style={{padding: '8px'}}
													onChange={(e) => shippingformik.setFieldValue('shippingstate', e.target.value)}
													>
													{!selectedshippingCountry ? (
														<option value="">Select a country first</option>
													) : shippingstate.length > 0 ? (
														shippingstate.map((state) => (
														<option key={state.isoCode} value={state.name}>{state.name}</option>
														))
													) : (
														<option value="">No states available</option>
													)}
												</select>
											</div>
											{/* for city and zipcode */}
											<div className='w-full grid md:grid-cols-2 gap-4'>
													{/* for shippingcity */}
													<div className='w-full flex flex-col gap-1'>    
														<div className='w-full flex flex-col gap-1'>
															<small className='text-[14px] text-[#191C1F] font-bold'>City</small>
															<input name='shippingcity' value={shippingformik.values.shippingcity} onChange={shippingformik.handleChange} type="text" className='border-1 border-[#E4E7E9] text-[#475156] text-[14px] rounded-[2px] focus:outline-0' style={{padding: '8px'}}/>
														</div>
													</div>
													{/* for shippingzipcode */}
													<div className='w-full flex flex-col gap-1'>    
														<div className='w-full flex flex-col gap-1'>
															<small className='text-[14px] text-[#191C1F] font-bold'>Zip Code</small>
															<input name='shippingzipcode' value={shippingformik.values.shippingzipcode} onChange={shippingformik.handleChange} type="text" className='border-1 border-[#E4E7E9] text-[#475156] text-[14px] rounded-[2px] focus:outline-0' style={{padding: '8px'}}/>
														</div>
													</div>
											</div>
											{/* for email */}
											<div className='w-full flex flex-col gap-1'>
												<small className='text-[14px] text-[#191C1F] font-bold'>Email</small>
												<input name='shippingemail' onChange={shippingformik.handleChange} value={shippingformik.values.shippingemail} type="email" className='border-1 border-[#E4E7E9] text-[#475156] text-[14px] rounded-[2px] focus:outline-0' style={{padding: '8px'}}/>
											</div>
											{/* for phone number */}
											<div className='w-full flex flex-col gap-1'>
												<small className='text-[14px] text-[#191C1F] font-bold'>Phone number</small>
												<input name='shippingphonenumber' onChange={shippingformik.handleChange} value={shippingformik.values.shippingphonenumber} type="text" className='border-1 border-[#E4E7E9] text-[#475156] text-[14px] rounded-[2px] focus:outline-0' style={{padding: '8px'}}/>
											</div>
										</div>
											
										<div>
											<button type='submit' className='rounded-[2px] bg-[#FA8232] text-white font-bold cursor-pointer hover:bg-[#fa8232b6] active:bg-[#FA8232]' style={{padding: '15px'}}>SAVE CHANGES</button>
										</div>
									</div>
										{/* end of personal information details */}
								</div>
							</form>
						</div>
						: 
						<p>Loading</p>
					}
				</div>
			</div>
			{/* for change of password */}
			<div>

			</div>
    </div>
  )
}

export default Settings