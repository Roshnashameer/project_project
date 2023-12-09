import React, { useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { getProfileApi, updateProfile } from '../service/allApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL } from '../service/baseUrl';


function Profile() {
    const [update, setUpdate] = useState("")

    const [show, setShow] = useState(false);
    const [preview, setPreview] = useState("")
    const [token, setToken] = useState("")
    const [existingImage, setExistingImage] = useState("")
    const [profile, setProfile] = useState({
        user: "", image: "", gitHub: "", linkedIn: ""
    })
    useEffect(() => {
        const userData = (JSON.parse(localStorage.getItem("currentUser")))
        if (userData) { setProfile({ ...profile, user: userData?.userName, image: "", gitHub: userData.gitHub, linkedIn: userData.linkedIn }) 
        setExistingImage(userData.profile)
    }
    }, [update])
    useEffect(() => {
        if (profile.image) {
            setPreview(URL.createObjectURL(profile.image))
        }
        else {
            setPreview("")
        }
    })
    const handleClose = () => {

        setShow(false);
        // setProfile({ image: "", gitHub: "", linkedIn: "" })
    }
    const handleShow = () => setShow(true);

    // api call
    // const getProfile = async () => {
    //     // id
    //     if (localStorage.getItem("currentId")) {
    //         let id = localStorage.getItem("currentId")
    //         const headers = {
    //             "access_token": `Bearer ${token}`

    //         }
    //         const result = await getProfileApi(id)
    //         // console.log(result.data);
    //         // updaate the data in profile state
    //         setProfile({
    //             ...profile,
    //             user: result.data.userName,
    //             gitHub: result.data.gitHub,
    //             linkedIn: result.data.linkedIn,
    //             updatedImage: result.data.profile
    //         })
    //     }
    // }
    useEffect(() => {

        if (localStorage.getItem("token")) {
            setToken(localStorage.getItem("token"))

        }
        // getProfile()
    }, [])
    console.log(token);

    // console.log(profile);
    const setData = (e) => {
        const { value, name } = e.target
        setProfile({ ...profile, [name]: value })

    }
    // console.log(profile);

    const handleUpdate = async (e) => {
        e.preventDefault()
        try {
            const { user, image, gitHub, linkedIn } = profile


            // api call
            // id
            if (localStorage.getItem("currentId")) {
                const id = localStorage.getItem("currentId")
                console.log(`Id:${id}`);

                // header
                const reqHeader = {
                    "Content-Type": "multipart/form-data",
                    "access_token": `Bearer ${token}`
                }
                // body
                const reqBody = new FormData()
                reqBody.append("userName", user)
                reqBody.append("profile", image ? image : existingImage)
                reqBody.append("gitHub", gitHub)
                reqBody.append("linkedIn", linkedIn)
                // console.log(reqBody);
                const response = await updateProfile(reqBody, reqHeader, id)
                console.log(response);
                if (response.status == 200) {
                    //  alert(`Updated Successfully`)
                    toast.info(`Updated Successfully`, {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                    localStorage.setItem("currentUser", JSON.stringify(response.data))
                    setUpdate(response.data)
                    handleClose()
                    // refresh profile  data
                    // getProfile()
                    // update new username in local storage
                    // localStorage.setItem("currentUser", profile.user)

                }
                else {
                    console.log("profile update fail");
                    handleClose()
                }
            }
        }
        catch (error) {
            console.error("Error updating profile:", error);
            // Handle the error, show a user-friendly message, or log it appropriately.


        }
    }

    console.log(preview);
    return (
        <div>
            <Row>
                <Col>
                    <h4 className='text-primary'>My Profile</h4>
                </Col>
                <Col className='text-end'>
                    <div>
                        <i class="fa-solid fa-circle-check px-3 fa-2x text-success"></i>
                    </div>
                </Col>
            </Row>
            <Row>
                <div className='text-center'>
                    {
                        existingImage != "" ?
                            <img className='w-50 mt-3 rounded-end-pill'
                                src={`${BASE_URL}/uploads/${existingImage}`} alt='' />
                            :
                            <img className='w-50 mt-3 rounded-end-pill' alt=''
                                src={'https://i.postimg.cc/d0MNZ0RH/360-F-517798849-Wu-Xh-HTpg2dj-Tbf-Nf0-FQAjz-FEolu-Hpnct.jpg'} />


                    }

                </div>
                <Container>
                    <hr className='text-primary' />
                    <p className='py-3'>Username : <span className='mx-3 fs-3 '>{profile.user}</span></p>
                    <hr />
                    <p className='py-3'>GitHub : {profile?.gitHub} </p>
                    <hr />
                    <p className='py-3'>LinkedIn : {profile?.linkedIn} </p>
                    <hr />
                    <p className='py-3 text-end fs-3 '>
                        <span className='btn fs-3 text-danger' onClick={handleShow}>Edit</span></p>
                    <hr />
                    <Modal show={show} onHide={handleClose}
                        backdrop='static'
                        size='md' centered>
                        <Modal.Header closeButton>
                            <Modal.Title className='text-primary'>
                                <h4>Update Profile</h4></Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <label htmlFor='img1' className='text-center'>
                                {
                                    existingImage != "" ?
                                        <img className='w-50 mt-3 rounded-end-pill'
                                            src={`${BASE_URL}/uploads/${existingImage}`} alt='' />
                                        :
                                        <img className='w-50 mt-3 rounded-end-pill' alt=''
                                            src={'https://i.postimg.cc/d0MNZ0RH/360-F-517798849-Wu-Xh-HTpg2dj-Tbf-Nf0-FQAjz-FEolu-Hpnct.jpg'} />


                                }

                            </label>

                            <input placeholder='choose file'
                                onChange={(e) => setProfile({ ...profile, ["image"]: e.target.files[0] })}
                                name='image'
                                id="img1"
                                style={{ display: 'none' }}
                                type='file'
                            />

                            <div className='mt-5'>
                                <input value={profile?.user} onChange={(e) => setData(e)} name='user' type='text' className='form-control' placeholder='Username' />
                            </div>
                            <div className='mt-3'>
                                <input value={profile?.gitHub} onChange={(e) => setData(e)} name='gitHub' type='text' className='form-control' placeholder='GitHub' />
                            </div>
                            <div className='mt-3 mb-5'>
                                <input value={profile?.linkedIn} onChange={(e) => setData(e)} name='linkedIn' type='text' className='form-control' placeholder='LinkedIn' />
                            </div>

                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={(e) => handleUpdate(e)}>
                                Save Changes
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </Container>
            </Row>
            <ToastContainer />
        </div>
    )
}

export default Profile