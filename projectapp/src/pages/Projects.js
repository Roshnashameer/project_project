import React from 'react'
import Header from '../components/Header'
import { Col, Row } from 'react-bootstrap'
import ProjectCard from '../components/ProjectCard'

function Projects() {
  return (
    <div>
        <Header></Header>
       <div className='text-center p-5'> 
       <h1 className='mb-5' >Explore All Projects</h1>
       <div className='d-flex container rounded w-75'>
        <input type='text' className='form-control shadow'
        placeholder='Search Project By Technology Used'/>
        <i class="fa-solid text-primary fa-magnifying-glass fa-rotate-90 me-3 border p-3 shadow"></i>
       </div>
       </div>
   
    <div className='container p-5 my-5'>
        <Row>
            <Col>
            <ProjectCard></ProjectCard>
            </Col>
    
        </Row>
    </div>
    </div>
  )
}

export default Projects