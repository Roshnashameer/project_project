import React, { useContext, useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { addProjectApi } from '../service/allApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addResponseContext } from '../service/ContextShare';
function Myprojects() {
    const  {addUpdate,setAddUpdate}=useContext(addResponseContext)
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [preview,setPreview]=useState("")
    const [token,setToken]=useState("")
    const [projectInputs, setProjectInputs] = useState({
        title: "", languages: "", overView: "", gitHub: "", website: "", projectImage: ""
    })
    const setInputs = (e) => {
        const { value, name } = e.target;
        setProjectInputs({ ...projectInputs, [name]: value });
    };
    
    useEffect(()=>{
        if(projectInputs.projectImage){
            setPreview(URL.createObjectURL(projectInputs.projectImage))
        }
        else{
            setPreview("")
        }
    },[projectInputs.projectImage])
    useEffect(()=>{
        if(localStorage.getItem("token")){
            setToken(localStorage.getItem("token"))
        }
    },[])

    console.log(projectInputs);
    const handleAdd=async(e)=>{
        const {title, languages, overView, gitHub, website, projectImage}=projectInputs
        if(!title|| !languages|| !overView|| !gitHub|| !website|| !projectImage){
            alert("pls fill data")
        }
        else{
            const headerConfig={
                "Content-Type":"multipart/form-data",
                "access_token":`Bearer ${token}`
            }
            // token
            const reqBody=new FormData()
            reqBody.append("title",title)
            reqBody.append("overView",overView)
            reqBody.append("languages",languages)
            reqBody.append("gitHub",gitHub)
            reqBody.append("website",website)
            reqBody.append("projectImage",projectImage)
            const result=await addProjectApi(reqBody,headerConfig)
            if(result.status==200){
                // alert(`${result.data.title} added`)
                setAddUpdate(result.data)
                toast.info(`${result.data.title} added`, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                // reset form data
                setProjectInputs({...projectInputs,title:"", languages: "", overView: "", gitHub: "", website: "",projectImage:""})
                
                handleClose()
            }
            else{
                // alert(result.response.data)
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
            console.log(result);
        }
    }
    return (
        <div>
            <Row className='mt-5'>
                <hr className='text-primary' />
                <Col lg={9}><h5 className='mt-5'>My Projects</h5></Col>
                <Col lg={3}>
                    <Link className='btn btn-primary w-1oo rounded' onClick={handleShow}>Add Project</Link>
                </Col>
            </Row>
            <Modal show={show} onHide={handleClose}
                centered size='lg'>
                <Modal.Header closeButton>
                    <Modal.Title className='text-primary' >Add Project Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Row>
                        <Col>

                            <label htmlFor='img1' className='text-center'>
                                <input id="img1" onChange={(e)=>setProjectInputs({...projectInputs,["projectImage"]:e.target.files[0]})} style={{ display: 'none' }} type='file' />
                                <img className='w-100 mt-3 mb-3' src={preview?preview:"https://i.postimg.cc/q7dg17qB/placeholder-3.png"} alt="" />

                            </label>
                        </Col>
                        <Col>
                            <input value={projectInputs.title} name='title' onChange={(e) => setInputs(e)} type='text' 
                            placeholder='Project Name' className='form-control p-2 mt-3' style={{ border: 'none' }} />
                            <hr />
                            <input value={projectInputs.languages} name='languages' onChange={(e) => setInputs(e)} type='text'
                             placeholder='Language Used' className='form-control p-2 mt-3' style={{ border: 'none' }} />
                            <hr />
                            <input value={projectInputs.gitHub} name='gitHub' onChange={(e) => setInputs(e)} type='text'
                             placeholder='Github Link' className='form-control p-2 mt-3' style={{ border: 'none' }} />
                            <hr />
                            <input value={projectInputs.website} name='website' onChange={(e) => setInputs(e)} type='text'
                             placeholder='Website Link' className='form-control p-2 mt-3' style={{ border: 'none' }} />
                            <hr />
                        </Col>

                    </Row>
                    <Row>
                        <Col>
                            <textarea value={projectInputs.overView} name='overView' onChange={(e) => setInputs(e)} style={{ border: 'none' }} type='text' placeholder='Project Overview' className='form-control p-2 mt-3 mb-5' />
                            <hr />
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={(e)=>handleAdd(e)}>
                        Add
                    </Button>
                </Modal.Footer>
            </Modal>
            
            <ToastContainer />
        </div>
    )
}

export default Myprojects