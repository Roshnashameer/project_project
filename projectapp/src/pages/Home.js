import React, { useEffect, useState } from 'react'
import {  Col, Container, Row } from 'react-bootstrap'
import './Home.css'
import ProjectCard from '../components/ProjectCard'
import { Link } from 'react-router-dom'
import { homeProjectApi } from '../service/allApi'

function Home() {
  const [isLoggedIn,setLoggedIn]=useState(false)
  const [homeProjects,setHomeProjects]=useState([])

  const getHomeProjects=async()=>{
    try {
    const response = await homeProjectApi();
    setHomeProjects(response.data);
  } catch (error) {
    console.error('Error fetching home projects:', error);
    // Handle error if needed
  }
  }
  useEffect(()=>{
    getHomeProjects()
    if(localStorage.getItem("currentId")){
      setLoggedIn(true)
    }
  },[])
  // console.log(isLoggedIn);
  // console.log(homeProjects);
  return (
    <div id="sec1">
        <Row className='pt-5 pb-5'>
            <Col className='text-center p-5'>
            <h1 id="h" className='mt-5'>Project Master</h1>
            <p className='mt-3 w-5 container'>Its a platform designed to empower teams and individuals with the tools and resources essential for
                 orchestrating projects with precision and efficiency. From initiation to completion, our platform 
                 offers a user-friendly interface, collaborative features, and insightful analytics, facilitating the
                  optimization of workflows and fostering a culture of productivity.</p>

                  {isLoggedIn?
                    <Link to={'/dashboard'}
                  className='mt-5 btn btn-primary rounded-pill p-3 border border-dark' >
                  <i class="fa-solid fa-angles-left fa-flip"></i>
                    Explore
                    <i class="fa-solid fa-angles-right fa-flip"></i>
                    </Link>:
                    <Link to={'/login'}
                  className='mt-5 btn btn-primary rounded-pill p-3 border border-dark' >
                  <i class="fa-solid fa-angles-left fa-flip"></i>
                    Start 
                    <i class="fa-solid fa-angles-right fa-flip"></i>
                    </Link>}
            </Col>
            <Col className='d-flex justify-content-center align-items-center'>
            <img className='w-50 mt-5'
            src="https://i.postimg.cc/J037wWZj/dribbble-nyt.gif" alt="" srcset="" />
            </Col>
        </Row>
        <div id='sec2' className='m-2 p-5'>
            <h1 className='text-center'>Explore Projects</h1>
            
              <Container>
                   <marquee scrollAmount={25}>
                        <div className='d-flex justify-content-between'>
                           { homeProjects.length>0?homeProjects.map(i=>( 
                           <div><ProjectCard project={i}></ProjectCard></div>
                           )):<h1>No Projects Uploaded yet!</h1>
                          
                            
                           
                            }
                            
                        </div>
                   </marquee>
              </Container>
               
            <div className='text-center m-5'>
                <Link to={'/projects'} style={{textDecoration:'none'}}>
                    View MoreProjects<i class="fa-solid fa-angles-right fa-flip"></i>
                </Link>
            </div>
        </div>

    </div>
  )
}

export default Home