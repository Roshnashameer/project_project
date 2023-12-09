import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Col, Row } from 'react-bootstrap'
import ProjectCard from '../components/ProjectCard'
import { allProjectApi } from '../service/allApi'


function Projects({Projects}) {
  const [allProjects,setAllProjects]=useState([])
  const [searchData,setSearchData]=useState("")

  const getAllProjects=async()=>{
    try {
    const response = await allProjectApi([searchData]);
    setAllProjects(response.data);
  } catch (error) {
    console.error('Error fetching home projects:', error);
    // Handle error if needed
  }
  }
  useEffect(()=>{
    getAllProjects(searchData)
  },([searchData]))
  // console.log(allProjects);
  return (
    <div>
        <Header></Header>
       <div className='text-center p-5'> 
       <h1 className='mb-5' >Explore All Projects</h1>
       <div className='d-flex container rounded w-75'>
        <input onChange={(e)=>setSearchData(e.target.value)} id='s1' type='text' className='form-control shadow'
        placeholder='Search Project By Technology Used'/>
        <i class="fa-solid text-primary fa-magnifying-glass fa-rotate-90 me-3 border p-3 shadow"></i>
       </div>
       </div>
   
    <div className='container p-5 my-5'>
        <Row>
           
            {  allProjects.length>0?allProjects.map(i=>( 
              <Col className='m-2'>
                           <div><ProjectCard project={i}></ProjectCard></div>
                           </Col>
                           )):<h1>Loading......</h1>
                          
                            
                           
                            }
           
    
        </Row>
    </div>
    </div>
  )
}

export default Projects