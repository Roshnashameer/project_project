import React, { useState } from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { loginApi, registerApi } from '../service/allApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Auth({ register }) {
    const navigate = useNavigate()
    // state to store inputs
    const [user, setUser] = useState({
        userName: "", email: "", password: ""
    })
    // state to check validation
    const [unameValid,setUnameValid]=useState(false)
    const [emailValid,setEmailValid]=useState(false)
    const [passwordValid,setPasswordValid]=useState(false)
    const setInputs = (e) => {
        const { name, value } = e.target
       
        if(name=='userName'){
            if(value.match(/^[a-zA-z ]+$/)){
                setUnameValid(false)
                
            }
            else{
                setUnameValid(true)
            }
        }
        if(name=='email'){
            if(value.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)){
                setEmailValid(false)
                
            }
            else{
                setEmailValid(true)
            }
        }
        if(name=='password'){
            if(value.match(/^[0-9a-zA-z@]{3,8}$/)){
                setPasswordValid(false)
                
            }
            else{
                setPasswordValid(true)
            }
        }
        // store data after checking validation
        setUser({ ...user, [name]: value })
        
    }
    console.log(user);

    const handleRegister = async (e) => {
        e.preventDefault()
        const { userName, email, password } = user
        console.log("User data:", user);
        if (!userName || !email || !password) {

            toast.info('please fill data', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
        else {

            const result = await registerApi(user)
            if (result.status == 200) {

                toast.success(`${result.data.userName} your account created successfully`, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                // reset user state
                setUser({ userName: "", email: "", password: "" })
                navigate("/login")
            }
            else {

                toast.info(result.response.data, {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });

            }


        }
    }
    const handleLogin = async (e) => {
        e.preventDefault()
        const { email, password } = user
        console.log("User data:", user);
        if (!email || !password) {

            toast.info('please fill data', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
        else {

            const result = await loginApi(user)
            if (result.status == 200) {
                // token
                // console.log(result.data.token);
                // store user data in sessionstorage 
                localStorage.setItem("token",result.data.token)

                // store user data in local storage
                localStorage.setItem("currentUser",JSON.stringify(result.data.user))
                localStorage.setItem("currentId",result.data.user._id)

                toast.success(`login success `, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                // reset user state
                setUser({ email: "", password: "" })
                navigate("/")
            }
            else {

                toast.info(result.response.data, {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });

            }


        }
    }


    const isRegisterForm = register ? true : false
    return (
        <div>
            <div className='w-50 container bg-light shdow-lg mb-5 mt-5 p-5'>
                <Row>
                    <Col>
                        <Link to={'/'}
                            className='p-3 fs-5' style={{ textDecoration: 'none' }}><i class="fa-solid fa-backward text-danger fa-beat-fade"></i> Back to Home</Link>
                        <img className='w-100'
                            src={isRegisterForm ? "https://i.postimg.cc/ZnT5XrF0/e8349cbaee4a18d613941c2cc7f70129.gif" : "https://i.postimg.cc/4NjT967t/login.gif"} alt="" />
                    </Col>
                    <Col className='p-3'>

                        <h1 className='text-center'>
                            {
                                isRegisterForm ? 'Sign Up' : 'Sign In'
                            }
                        </h1>

                        <div className='mt-5'>


                            {isRegisterForm &&
                                <>
                                    <FloatingLabel controlId="floatingPassword" label="User Name" className='mb-3'>
                                        <Form.Control value={user.userName} onChange={(e) => setInputs(e)} name='userName' type="text" placeholder="User Name" />
                                    </FloatingLabel>
                                   { unameValid && <p className='text-danger'>include letters only </p>}
                                </>
                            }
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Email address"
                                className="mb-3"
                            >
                                <Form.Control value={user.email} onChange={(e) => setInputs(e)} name='email' type="email" placeholder="name@example.com" />
                            </FloatingLabel>
                            {emailValid && <p className='text-danger'>Email is not valid </p>}
                            <FloatingLabel controlId="floatingPassword" label="Password">
                                <Form.Control value={user.password} onChange={(e) => setInputs(e)} name='password' type="password" placeholder="Password" />
                            </FloatingLabel>
                            {passwordValid && <p className='text-danger'>Invalid password </p>}
                            <div className='text-center mt-3'>
                                {
                                    isRegisterForm ?
                                        <Button onClick={(e) => handleRegister(e)} className='btn btn-primary rounded-pill px-4 py-2'>Register</Button> :
                                        <Button onClick={(e) => handleLogin(e)} className='btn btn-primary rounded-pill px-4 py-2'>Login</Button>
                                }
                                <div className='mt-3'>
                                    {
                                        isRegisterForm ?
                                            <p>Already Have An Account?
                                                <Link to={'/login'} style={{ textDecoration: 'none' }}>Login Here</Link> </p> :
                                            <p>New User ?
                                                <Link to={'/register'} style={{ textDecoration: 'none' }}>Register Here</Link></p>
                                    }
                                </div>
                            </div>

                        </div>

                    </Col>
                </Row>
            </div>
            <ToastContainer />
        </div>
    )
}

export default Auth