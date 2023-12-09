import React, { useContext, useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import { BASE_URL } from '../service/baseUrl';
import { updateProjectApi } from '../service/allApi';
import { editResponseContext } from '../service/ContextShare';


function UpdateProject({ project }) {
    
    const {setEditUpdate}=useContext(editResponseContext)
    const [show, setShow] = useState(false);

    const handleClose = () => {setShow(false);
        setProjectInputs({...projectInputs,title:"", languages: "", overView: "", gitHub: "", website: "",projectImage:""})
    }
    const handleShow = () => setShow(true);

    const [preview, setPreview] = useState("")

    const [projectInputs, setProjectInputs] = useState({
        title: project.title, languages: project.languages, overView: project.overView,
        gitHub: project.gitHub, website: project.website, projectImage: ""
    })
    useEffect(() => {
        if (projectInputs.projectImage) {
            setPreview(URL.createObjectURL(projectInputs.projectImage))
        }
        else {
            setPreview("")
        }
    }, [projectInputs.projectImage])
    const handleUpdate = async (e) => {
        e.preventDefault()
        const { title, languages, overView, gitHub, website, projectImage } = projectInputs
        if (!title || !languages || !overView || !gitHub || !website) {
            alert("pls fill data")
        }
        else {
            // api call
            // body
            const reqBody = new FormData()
            reqBody.append("title", title)
            reqBody.append("overView", overView)
            reqBody.append("languages", languages)
            reqBody.append("gitHub", gitHub)
            reqBody.append("website", website)
            preview ? reqBody.append("projectImage", projectImage) :
                reqBody.append("projectImage", project.projectImage)
            //header
            const token = localStorage.getItem("token")
            var headerConfig = {}
            if (preview) {
                var headerConfig = {
                    "Content-Type": "multipart/form-data",
                    "access_token": `Bearer ${token}`
                }
            }
            else {
                var headerConfig = {
                    "Content-Type": "application/json",
                    "access_token": `Bearer ${token}`
                }
            }

            // project id
            const proId = project._id
            const result = await updateProjectApi(reqBody, headerConfig, proId)
            console.log(result);
            if(result.status==200){
                alert(`${result.data.title} Updated`)
                // update context
                setEditUpdate(result.data)
                handleClose()
            }
            else{
                alert(`${result.data.title} Failed`)
            }
        }
    }



    return (
        <>
            <span onClick={handleShow} className='text-end border-start border-end px-3'><i class="fa-solid fa-pen-to-square fa-2x"></i></span>
            <Modal show={show} onHide={handleClose}
                centered size='lg'>
                <Modal.Header closeButton>
                    <Modal.Title className='text-primary' >Update Project Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Row>
                        <Col>

                            <label htmlFor='img1' className='text-center'>
                                <input onChange={(e) => setProjectInputs({ ...projectInputs, ["projectImage"]: e.target.files[0] })} id="img1" style={{ display: 'none' }} type='file' />
                                <img className='w-100 mt-3 mb-3' src={preview ? preview : `${BASE_URL}/uploads/${project.projectImage}`} alt="" />

                            </label>
                        </Col>
                        <Col>
                            <input onChange={(e) => setProjectInputs({ ...projectInputs, ["title"]: e.target.value })}
                                value={projectInputs.title} type='text'
                                placeholder='Project Name' className='form-control p-2 mt-3' style={{ border: 'none' }} />
                            <hr />
                            <input onChange={(e) => setProjectInputs({ ...projectInputs, ["languages"]: e.target.value })} value={projectInputs.languages} type='text'
                                placeholder='Language Used' className='form-control p-2 mt-3' style={{ border: 'none' }} />
                            <hr />
                            <input onChange={(e) => setProjectInputs({ ...projectInputs, ["gitHub"]: e.target.value })} value={projectInputs.gitHub} type='text'
                                placeholder='Github Link' className='form-control p-2 mt-3' style={{ border: 'none' }} />
                            <hr />
                            <input onChange={(e) => setProjectInputs({ ...projectInputs, ["website"]: e.target.value })} value={projectInputs.website} type='text'
                                placeholder='Website Link' className='form-control p-2 mt-3' style={{ border: 'none' }} />
                            <hr />
                        </Col>

                    </Row>
                    <Row>
                        <Col>
                            <textarea onChange={(e) => setProjectInputs({ ...projectInputs, ["overView"]: e.target.value })} value={projectInputs.overView} style={{ border: 'none' }} type='text' placeholder='Project Overview' className='form-control p-2 mt-3 mb-5' />
                            <hr />
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={(e) => handleUpdate(e)}>
                        Update
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default UpdateProject