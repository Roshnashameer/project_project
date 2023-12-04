import React from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import { Mail } from 'react-feather'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <div className='bg-primary text-white mt-5 p-5'>
        <Row>
            <Col>
            <h3 className='mb-4'>Project Master</h3>
            <p>Completely Free App to Manage All Software Projects</p>
            <p>For any Query<Mail className='ms-2 me-2'></Mail>
            contact@projectfair.com</p></Col>
            <Col>
            <div className='ms-5'>
                <h3>Links</h3>
                <Link style={{textDecoration:'none',color:'white'}}>Home</Link><br/>
                <Link style={{textDecoration:'none',color:'white'}} >Login</Link><br/>
                <Link style={{textDecoration:'none',color:'white'}}>Sign Up</Link><br/>
            </div>
            </Col>
            <Col>
            <div className='ms-5'>
            <h3>Guides</h3>
            <h5>React</h5>
            <h5>React Bootstrap</h5>
            <h5>Routing</h5>
            </div>
            </Col>
            <Col>
            <h3>Contact Us</h3>
            <input type='email' placeholder='Enter email' className='form-control mt-3' ></input>
            <div className='mt-3'>
                <Button className='btn btn-light '>Send</Button>
                <i class="fa-brands fa-github  ms-3"></i>
                <i class="fa-brands fa-linkedin  ms-3"></i>
                <i class="fa-brands fa-facebook  ms-3"></i>
                <i class="fa-brands fa-instagram  ms-3"></i>
                <i class="fa-brands fa-twitter ms-3"></i>
            </div>
            </Col>
        </Row>
    </div>
  )
}

export default Footer