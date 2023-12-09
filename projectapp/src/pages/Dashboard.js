import React, { useEffect, useState } from 'react'
import { Col,  Row } from 'react-bootstrap'
import Profile from '../components/Profile'
import Myprojects from '../components/Myprojects'
import Header from '../components/Header'
import ViewMyProjects from '../components/ViewMyProjects'
import { useNavigate } from 'react-router-dom'

function Dashboard() {
    const [uname,setUname]=useState("")
    const navigate=useNavigate()
    // const capitalizedUserName = uname.charAt(0).toUpperCase() + uname.slice(1);
    useEffect(()=>{
        if(localStorage.getItem("currentUser")){
            setUname((JSON.parse(localStorage.getItem("currentUser"))).userName)
        }
        else{
            alert("Pls Login First")
            navigate("/")
        }
    },[])
    return (
        <div className='bg-light'>
            <Header dashboard></Header>
            {/* dashboard={true} */}
            <Row>
                <Col lg={8}>
                    <div className='py-3 px-3 mx-2 my-5 shadow bg-white'>
                        <h3>Welcome <span className='text-primary'>{uname}</span></h3>
                        <Myprojects></Myprojects>
                        <ViewMyProjects></ViewMyProjects>

                    </div>
                </Col>
                <Col lg={4}>
                    <div className='py-3 px-3 mx-2 my-5 shadow bg-white'>
                        <Profile ></Profile>

                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default Dashboard