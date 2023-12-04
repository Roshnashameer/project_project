import React from 'react'
import { Nav } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';


function Header({ dashboard }) {
    const navigate=useNavigate()
    const logOut=()=>{
        localStorage.removeItem("currentUser")
        localStorage.removeItem("currentId")
        localStorage.removeItem("token")
        navigate('/')
    }
    return (
        <div><Navbar className="bg-primary">
            <Container>

                

                <Navbar.Brand href="#home">
                    <img
                        alt=""
                        src="https://i.postimg.cc/wjY2nf1g/efe5cd5c172b4c6c70c2e19cc6a4c2f8-png-wh860-removebg-preview.png"
                        width="50"
                        height="50"
                        className="d-inline-block align-top"
                    />{' '}
                    <span id='he' className='fs-2 ms-3'>Project Master</span>
                    </Navbar.Brand>
                    {
                        dashboard &&
                        <Nav>
                            <Nav.Link href="#home" >
                                <p onClick={(e)=>logOut(e)} className='text-white fs-3'>Logout 
                                <i class="fa-solid fa-right-from-bracket text-white ms-3"></i></p>
                                
                            </Nav.Link>
                        </Nav>
                    }
                

            </Container>
        </Navbar></div>
    )
}

export default Header