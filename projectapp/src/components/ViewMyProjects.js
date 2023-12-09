import React, { useContext, useEffect, useState } from 'react'
import { Col,Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { deleteProjectApi, userProjectApi } from '../service/allApi'
import { addResponseContext, editResponseContext } from '../service/ContextShare'
import UpdateProject from './UpdateProject'


function ViewMyProjects() {
    const  {addUpdate}=useContext(addResponseContext)
    const {editUpdate}=useContext(editResponseContext)
    const [userProjects, setUserProjects] = useState([]);

  const getUserProjects = async () => {
    if (localStorage.getItem('currentId')) {
      const id = localStorage.getItem('currentId');
    //   console.log(id);
      const token = localStorage.getItem('token');    
        // header creation
        const reqHeader = {
            "Content-Type": "application/json", // Corrected the typo
            "access_token": `Bearer ${token}`
          };
          
        console.log(reqHeader);
        try
      {  const result=await userProjectApi(reqHeader,id)
        console.log(result);
        if(result.status==200){
            setUserProjects(result.data)
        }}
        catch(err) {
            console.error("Error fetching user projects:", err);
          }
    }
    }
    const handleDelete=async(e,id)=>{
        e.preventDefault()
        const token = localStorage.getItem('token');    
        // header creation
        const reqHeader = {
            "Content-Type": "application/json", // Corrected the typo
            "access_token": `Bearer ${token}`
          };
          const response=await deleteProjectApi(reqHeader,id)
          alert(response.data)
          getUserProjects()

    }
    useEffect(()=>{
        getUserProjects()
    },[addUpdate,editUpdate])
  return (
    <>
        {userProjects?.length>0?
        userProjects?.map(i=>(
            <div className='border mt-3 p-4 shadow'>
                <Row>
                    <Col lg={8}>
                        <p>{i?.title}</p>
                    </Col>
                    <Col lg={4} className='text-end'>
                        <UpdateProject project={i}></UpdateProject>
                        <Link to={`${i.gitHub}`} className='text-end px-3'><i class="fa-brands fa-github fa-2x"></i></Link>
                        <span onClick={(e)=>handleDelete(e,i._id)} className='text-end px-3'><i class="fa-solid fa-trash text-danger fa-2x"></i></span>
                    </Col>
                </Row>
               
        
            </div> )):
            <p className='text-primary mt-5 p-4'>No Projects Uploaded  !</p>
    }
    </>
  )
}

export default ViewMyProjects